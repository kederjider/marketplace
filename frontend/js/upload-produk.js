const photoInput = document.getElementById("photoInput");
const dropZone = document.getElementById("dropZone");
const previewGrid = document.getElementById("previewGrid");
const photoCount = document.getElementById("photoCount");

let uploadedFiles = [];

// ---- Drag & Drop ----
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragging");
});

dropZone.addEventListener("dragleave", () =>
  dropZone.classList.remove("dragging"),
);

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragging");
  handleFiles(Array.from(e.dataTransfer.files));
});

photoInput.addEventListener("change", () => {
  handleFiles(Array.from(photoInput.files));
});

function handleFiles(files) {
  const imageFiles = files.filter((f) => f.type.startsWith("image/"));
  const remaining = 10 - uploadedFiles.length;
  const toAdd = imageFiles.slice(0, remaining);

  if (imageFiles.length > remaining) {
    showToast(
      `⚠ Maksimal 10 foto. ${imageFiles.length - remaining} foto diabaikan.`,
      "error-toast",
    );
  }

  toAdd.forEach((file) => {
    uploadedFiles.push(file);
    const reader = new FileReader();
    reader.onload = (e) =>
      addPreview(e.target.result, uploadedFiles.length - 1);
    reader.readAsDataURL(file);
  });

  updatePhotoCount();
  hideError("photoError");
  photoInput.value = "";
}

function addPreview(src, index) {
  const item = document.createElement("div");
  item.className = "preview-item";
  item.dataset.index = index;
  item.innerHTML = `
    <img src="${src}" alt="foto ${index + 1}"/>
    <button class="remove-btn" onclick="removePhoto(${index})">✕</button>
  `;
  previewGrid.appendChild(item);
}

function removePhoto(index) {
  uploadedFiles.splice(index, 1);
  previewGrid.innerHTML = "";
  uploadedFiles.forEach((file, i) => {
    const reader = new FileReader();
    reader.onload = (e) => addPreview(e.target.result, i);
    reader.readAsDataURL(file);
  });
  updatePhotoCount();
}

function updatePhotoCount() {
  if (uploadedFiles.length > 0) {
    photoCount.textContent = `${uploadedFiles.length}/10 foto dipilih`;
  } else {
    photoCount.textContent = "";
  }
}

const hargaInput = document.getElementById("hargaProduk");
hargaInput.addEventListener("input", () => {
  let val = hargaInput.value.replace(/\D/g, "");
  hargaInput.value = val ? parseInt(val).toLocaleString("id-ID") : "";
  if (val) {
    hideError("hargaError");
    setValid(hargaInput);
  }
});

const waInput = document.getElementById("nomorWA");
waInput.addEventListener("input", () => {
  waInput.value = waInput.value.replace(/\D/g, "");
  if (waInput.value.length >= 9) {
    hideError("waError");
    setValid(waInput);
  }
});

document.getElementById("namaProduk").addEventListener("input", function () {
  if (this.value.trim()) {
    hideError("namaError");
    setValid(this);
  }
});

document
  .getElementById("keteranganProduk")
  .addEventListener("input", function () {
    if (this.value.trim()) {
      hideError("keteranganError");
      setValid(this);
    }
  });

function showError(id, inputEl) {
  const err = document.getElementById(id);
  err.classList.add("show");
  if (inputEl) inputEl.classList.add("error");
}

function hideError(id) {
  document.getElementById(id).classList.remove("show");
}

function setValid(el) {
  el.classList.remove("error");
  el.classList.add("valid");
}

function showToast(msg, type = "success") {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = `toast ${type}`;
  void t.offsetWidth;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
}

async function submitForm() {
  let valid = true;

  if (uploadedFiles.length === 0) {
    showError("photoError", null);
    valid = false;
  }

  const nama = document.getElementById("namaProduk");
  if (!nama.value.trim()) {
    showError("namaError", nama);
    valid = false;
  }

  const ket = document.getElementById("keteranganProduk");
  if (!ket.value.trim()) {
    showError("keteranganError", ket);
    valid = false;
  }

  const hargaRaw = hargaInput.value.replace(/\D/g, "");
  if (!hargaRaw) {
    showError("hargaError", hargaInput);
    valid = false;
  }

  const wa = waInput.value.trim();
  const waRegex = /^\d{9,15}$/;
  if (!waRegex.test(wa)) {
    showError("waError", waInput);
    valid = false;
  }

  if (!valid) {
    showToast("⚠ Mohon lengkapi semua field yang wajib diisi.", "error-toast");
    return;
  }

  const btn = document.getElementById("submitBtn");
  btn.innerHTML =
    '<div class="btn-inner"><span>⏳</span><span>Mengupload...</span></div>';
  btn.disabled = true;

  try {
    const formData = new FormData();
    formData.append("namaProduk", nama.value.trim());
    formData.append("keteranganProduk", ket.value.trim());
    formData.append("hargaProduk", hargaRaw);
    formData.append("nomorWA", wa);
    uploadedFiles.forEach((file) => formData.append("photos", file));

    const response = await fetch("/api/upload-produk", {
      method: "POST",
      body: formData,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.message || "Gagal upload produk.");
    }

    btn.innerHTML =
      '<div class="btn-inner"><span>🚀</span><span>Upload Produk</span></div>';
    btn.disabled = false;

    const hargaFormatted = "RM " + parseInt(hargaRaw).toLocaleString("en-MY");
    document.getElementById("successDetail").textContent =
      `"${nama.value.trim()}" — ${hargaFormatted} | WA: ${wa}`;
    document.getElementById("successOverlay").classList.add("show");
    showToast("✅ Produk berhasil dikirim ke server.");
  } catch (error) {
    btn.innerHTML =
      '<div class="btn-inner"><span>🚀</span><span>Upload Produk</span></div>';
    btn.disabled = false;
    showToast(
      `❌ ${error.message || "Terjadi kesalahan saat upload."}`,
      "error-toast",
    );
  }
}

function resetForm() {
  uploadedFiles = [];
  previewGrid.innerHTML = "";
  photoCount.textContent = "";
  document.getElementById("namaProduk").value = "";
  document.getElementById("keteranganProduk").value = "";
  hargaInput.value = "";
  waInput.value = "";
  document
    .querySelectorAll(".field-error")
    .forEach((e) => e.classList.remove("show"));
  document
    .querySelectorAll("input, textarea")
    .forEach((e) => e.classList.remove("error", "valid"));
  document.getElementById("successOverlay").classList.remove("show");
}

window.removePhoto = removePhoto;
window.submitForm = submitForm;
window.resetForm = resetForm;
