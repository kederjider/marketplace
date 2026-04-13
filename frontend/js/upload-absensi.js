const state = { depan: null, belakang: null };

setupSlot("inputDepan", "dzDepan", "depan");
setupSlot("inputBelakang", "dzBelakang", "belakang");

function setupSlot(inputId, dzId, side) {
  const input = document.getElementById(inputId);
  const dz = document.getElementById(dzId);

  input.addEventListener("change", () => {
    if (input.files[0]) loadPhoto(input.files[0], side);
    input.value = "";
  });

  dz.addEventListener("dragover", (e) => {
    e.preventDefault();
    dz.classList.add("drag-over");
  });
  dz.addEventListener("dragleave", () => dz.classList.remove("drag-over"));
  dz.addEventListener("drop", (e) => {
    e.preventDefault();
    dz.classList.remove("drag-over");
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) loadPhoto(f, side);
  });
}

function loadPhoto(file, side) {
  const reader = new FileReader();
  reader.onload = (e) => {
    state[side] = e.target.result;
    renderPreview(side);
    document
      .getElementById(side === "depan" ? "errorDepan" : "errorBelakang")
      .classList.remove("show");
  };
  reader.readAsDataURL(file);
}

function renderPreview(side) {
  const isDepan = side === "depan";
  const dzId = isDepan ? "dzDepan" : "dzBelakang";
  const statusId = isDepan ? "statusDepan" : "statusBelakang";
  const inputId = isDepan ? "inputDepan" : "inputBelakang";
  const label = isDepan ? "Sisi Depan" : "Sisi Belakang";
  const pwId = "pw_" + side;

  const dz = document.getElementById(dzId);
  dz.outerHTML = `
    <div class="preview-wrap" id="${pwId}" onclick="openLightbox('${side}','${label}')">
      <img src="${state[side]}" alt="${label}"/>
      <div class="preview-overlay">
        <button class="preview-action-btn btn-ganti" onclick="event.stopPropagation();changePhoto('${side}')">🔄 Ganti</button>
        <button class="preview-action-btn btn-hapus" onclick="event.stopPropagation();removePhoto('${side}')">✕</button>
      </div>
    </div>`;

  const st = document.getElementById(statusId);
  st.className = "slot-status status-done";
  st.innerHTML = `<div class="status-dot"></div><span>Foto berhasil diunggah ✓</span>`;
}

function openLightbox(side, label) {
  document.getElementById("lightboxImg").src = state[side] || "";
  document.getElementById("lightboxLabel").textContent = label;
  document.getElementById("lightbox").classList.add("open");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

function changePhoto(side) {
  const tmp = document.createElement("input");
  tmp.type = "file";
  tmp.accept = "image/*";
  tmp.onchange = () => {
    if (tmp.files[0]) loadPhoto(tmp.files[0], side);
  };
  tmp.click();
}

function removePhoto(side) {
  state[side] = null;
  const isDepan = side === "depan";
  const pwId = "pw_" + side;
  const dzId = isDepan ? "dzDepan" : "dzBelakang";
  const statusId = isDepan ? "statusDepan" : "statusBelakang";
  const inputId = isDepan ? "inputDepan" : "inputBelakang";
  const dzClass = isDepan ? "depan-zone" : "belakang-zone";
  const icon = isDepan ? "🪪" : "🔄";
  const label = isDepan ? "Sisi Depan" : "Sisi Belakang";

  document.getElementById(pwId).outerHTML = `
    <div class="drop-zone ${dzClass}" id="${dzId}">
      <input type="file" id="${inputId}" accept="image/*"/>
      <div class="dz-inner">
        <div class="dz-icon">${icon}</div>
        <h4>${label}</h4>
        <p>Tap untuk buka galeri</p>
      </div>
    </div>`;

  setupSlot(inputId, dzId, side);

  const st = document.getElementById(statusId);
  st.className = "slot-status status-empty";
  st.innerHTML = `<div class="status-dot"></div><span>Belum diunggah</span>`;
}

const ketEl = document.getElementById("keterangan");
const ccEl = document.getElementById("charCount");
ketEl.addEventListener("input", () => {
  const len = ketEl.value.length;
  ccEl.textContent = `${len} / 500`;
  ccEl.className =
    "char-count" + (len >= 500 ? " full" : len > 440 ? " near" : "");
  if (ketEl.value.trim()) {
    hideErr("keteranganError");
    setValid(ketEl);
  }
});

listen("namaKaryawan", "namaError");

function listen(id, errId) {
  document.getElementById(id).addEventListener("input", function () {
    if (this.value.trim()) {
      hideErr(errId);
      setValid(this);
    }
  });
}

function listenDate(id, errId) {
  document.getElementById(id).addEventListener("change", function () {
    if (this.value) {
      hideErr(errId);
      setValid(this);
    }
  });
}

function hideErr(id) {
  document.getElementById(id).classList.remove("show");
}
function showErr(id, el) {
  document.getElementById(id).classList.add("show");
  if (el) el.classList.add("error");
}
function setValid(el) {
  el.classList.remove("error");
  el.classList.add("valid");
}

function showToast(msg, type) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = `toast ${type || ""}`;
  void t.offsetWidth;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
}

function dataUrlToFile(dataUrl, filename) {
  const [meta, payload] = dataUrl.split(",");
  const mime = (meta.match(/data:(.*?);base64/) || [])[1] || "image/jpeg";
  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new File([bytes], filename, { type: mime });
}

async function handleSubmit() {
  let ok = true;

  if (!state.depan) {
    document.getElementById("errorDepan").classList.add("show");
    ok = false;
  }
  if (!state.belakang) {
    document.getElementById("errorBelakang").classList.add("show");
    ok = false;
  }

  const nama = document.getElementById("namaKaryawan");
  const ket = document.getElementById("keterangan");

  if (!nama.value.trim()) {
    showErr("namaError", nama);
    ok = false;
  }
  if (!ket.value.trim()) {
    showErr("keteranganError", ket);
    ok = false;
  }

  if (!ok) {
    showToast("⚠ Lengkapi semua field dan foto terlebih dahulu.", "err");
    return;
  }

  const btn = document.getElementById("submitBtn");
  const pb = document.getElementById("progressBar");
  const pf = document.getElementById("progressFill");

  btn.disabled = true;
  btn.innerHTML = "<span>⏳</span><span>Mengirim...</span>";
  pb.classList.add("show");

  let prog = 0;
  const iv = setInterval(() => {
    prog += Math.random() * 15 + 8;
    if (prog >= 100) {
      prog = 100;
      clearInterval(iv);
    }
    pf.style.width = prog + "%";
  }, 200);

  try {
    const formData = new FormData();
    formData.append("namaKaryawan", nama.value.trim());
    formData.append("keterangan", ket.value.trim());
    formData.append("depan", dataUrlToFile(state.depan, "depan.jpg"));
    formData.append("belakang", dataUrlToFile(state.belakang, "belakang.jpg"));

    const response = await fetch("/api/upload-absensi", {
      method: "POST",
      body: formData,
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.message || "Gagal upload absensi.");
    }

    clearInterval(iv);
    pf.style.width = "100%";

    document.getElementById("sName").textContent = nama.value.trim();
    document.getElementById("sNote").textContent = ket.value.trim();
    document.getElementById("sThumbs").innerHTML = `
      <div class="success-thumb">
        <img src="${state.depan}" alt="depan"/>
        <span>Depan</span>
      </div>
      <div class="success-thumb">
        <img src="${state.belakang}" alt="belakang"/>
        <span>Belakang</span>
      </div>`;

    document.getElementById("successOverlay").classList.add("open");
    showToast("✅ Absensi berhasil dikirim.");
  } catch (error) {
    clearInterval(iv);
    showToast(`❌ ${error.message || "Terjadi kesalahan saat upload."}`, "err");
  } finally {
    btn.disabled = false;
    btn.innerHTML = "<span>📤</span><span>Kirim Absensi</span>";
    pb.classList.remove("show");
    pf.style.width = "0%";
  }
}

function resetAll() {
  ["depan", "belakang"].forEach((side) => {
    if (state[side]) removePhoto(side);
  });
  ["namaKaryawan", "keterangan"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  ccEl.textContent = "0 / 500";
  document
    .querySelectorAll(".field-error,.photo-field-error")
    .forEach((e) => e.classList.remove("show"));
  document
    .querySelectorAll("input,textarea")
    .forEach((e) => e.classList.remove("error", "valid"));
  document.getElementById("successOverlay").classList.remove("open");
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changePhoto = changePhoto;
window.removePhoto = removePhoto;
window.handleSubmit = handleSubmit;
window.resetAll = resetAll;
