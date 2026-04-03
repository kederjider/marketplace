const WA_NUMBER = "628123456789";

const products = [
  {
    id: 1,
    name: "VGA PNY GeForce RTX 5070 ARGB EPIC-X 12GB GDDR7",
    category: "gpu",
    price: 12200000,
    originalPrice: 15000000,
    discount: 19,
    rating: 5.0,
    sold: 3,
    location: "Bandung",
    isNew: true,
    isPromo: true,
    images: [
      "https://picsum.photos/seed/rtx5070a/600/500",
      "https://picsum.photos/seed/rtx5070b/600/500",
      "https://picsum.photos/seed/rtx5070c/600/500",
    ],
    specs: [
      ["GPU", "NVIDIA RTX 5070"],
      ["VRAM", "12GB GDDR7"],
      ["Bus Width", "192-bit"],
      ["Boost Clock", "2.61 GHz"],
      ["TDP", "200W"],
      ["Output", "3x DP 2.1 · 1x HDMI 2.1"],
    ],
    desc: "PNY GeForce RTX 5070 ARGB EPIC-X hadir dengan desain triple fan, pendingin superior, dan lampu ARGB yang bisa dikustomisasi. Cocok untuk gaming 4K dan content creation profesional.",
  },
  {
    id: 2,
    name: "VGA CARD RTX 2060 Super MSI 8GB 256BIT VENTUS 2X OC",
    category: "gpu",
    price: 2500000,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    sold: 569,
    location: "Cimahi",
    isNew: false,
    isPromo: true,
    images: [
      "https://picsum.photos/seed/rtx2060a/600/500",
      "https://picsum.photos/seed/rtx2060b/600/500",
    ],
    specs: [
      ["GPU", "NVIDIA RTX 2060 Super"],
      ["VRAM", "8GB GDDR6"],
      ["Bus Width", "256-bit"],
      ["Boost Clock", "1.65 GHz"],
      ["TDP", "175W"],
    ],
    desc: "MSI RTX 2060 Super VENTUS 2X OC adalah pilihan terbaik untuk gaming 1080p hingga 1440p. Dilengkapi dual fan Torx dan heatsink yang efisien.",
  },
  {
    id: 3,
    name: "VGA MSI GeForce RTX 4060 Ventus 2X Black 8GB 128BIT OC",
    category: "gpu",
    price: 5995000,
    originalPrice: null,
    discount: null,
    rating: 5.0,
    sold: 154,
    location: "Jakarta Pusat",
    isNew: false,
    isPromo: false,
    images: [
      "https://picsum.photos/seed/rtx4060a/600/500",
      "https://picsum.photos/seed/rtx4060b/600/500",
      "https://picsum.photos/seed/rtx4060c/600/500",
    ],
    specs: [
      ["GPU", "NVIDIA RTX 4060"],
      ["VRAM", "8GB GDDR6"],
      ["Bus Width", "128-bit"],
      ["Boost Clock", "2.46 GHz"],
      ["TDP", "115W"],
    ],
    desc: "RTX 4060 Ventus 2X Black hadir dengan desain sleek dual-fan dan performa DLSS 3 yang luar biasa. Solusi gaming terbaik di kelas mid-range.",
  },
  {
    id: 4,
    name: "VGA ZOTAC GAMING GeForce RTX 5060 Twin Edge 8GB GDDR7",
    category: "gpu",
    price: 6399003,
    originalPrice: null,
    discount: null,
    rating: 5.0,
    sold: 91,
    location: "Surabaya",
    isNew: true,
    isPromo: true,
    images: [
      "https://picsum.photos/seed/rtx5060a/600/500",
      "https://picsum.photos/seed/rtx5060b/600/500",
    ],
    specs: [
      ["GPU", "NVIDIA RTX 5060"],
      ["VRAM", "8GB GDDR7"],
      ["Bus Width", "128-bit"],
      ["Boost Clock", "2.50 GHz"],
      ["TDP", "115W"],
    ],
    desc: "ZOTAC RTX 5060 Twin Edge hadir dengan desain kompak dan performa next-gen. DLSS 4 dan ray tracing generasi terbaru untuk gaming 1080p ultra.",
  },
  {
    id: 5,
    name: "COLORFUL iGame GeForce RTX 5060 Ultra W OC 8GB GDDR7",
    category: "gpu",
    price: 6750000,
    originalPrice: 6959000,
    discount: 3,
    rating: 4.9,
    sold: 47,
    location: "Bekasi",
    isNew: true,
    isPromo: true,
    images: [
      "https://picsum.photos/seed/igame5060a/600/500",
      "https://picsum.photos/seed/igame5060b/600/500",
      "https://picsum.photos/seed/igame5060c/600/500",
    ],
    specs: [
      ["GPU", "NVIDIA RTX 5060"],
      ["VRAM", "8GB GDDR7"],
      ["Bus Width", "128-bit"],
      ["Boost Clock", "2.52 GHz"],
      ["Cooling", "Triple Fan"],
    ],
    desc: "COLORFUL iGame RTX 5060 Ultra W OC menghadirkan triple fan cooling, RGB premium, dan performa OC factory yang siap untuk semua tantangan gaming.",
  },
  {
    id: 6,
    name: "GIGABYTE GeForce RTX 3050 Eagle OC 8GB GDDR6 128BIT",
    category: "gpu",
    price: 4050000,
    originalPrice: null,
    discount: null,
    rating: 4.9,
    sold: 36,
    location: "Yogyakarta",
    isNew: false,
    isPromo: true,
    images: [
      "https://picsum.photos/seed/rtx3050a/600/500",
      "https://picsum.photos/seed/rtx3050b/600/500",
    ],
    specs: [
      ["GPU", "NVIDIA RTX 3050"],
      ["VRAM", "8GB GDDR6"],
      ["Bus Width", "128-bit"],
      ["Boost Clock", "1.78 GHz"],
      ["TDP", "90W"],
    ],
    desc: "GIGABYTE RTX 3050 Eagle OC adalah entry-level GPU dengan ray tracing dan DLSS. Ideal untuk PC gaming budget dengan performa yang tidak mengecewakan.",
  },
  {
    id: 7,
    name: "VGA GPU Support Anti Sag Adjustable Cocok Buat Semua VGA",
    category: "aksesoris",
    price: 15000,
    originalPrice: null,
    discount: null,
    rating: 5.0,
    sold: 118,
    location: "Yogyakarta",
    isNew: false,
    isPromo: true,
    images: [
      "https://picsum.photos/seed/gpusupport/600/500",
      "https://picsum.photos/seed/gpusupport2/600/500",
    ],
    specs: [
      ["Material", "Aluminium & ABS"],
      ["Panjang", "Adjustable"],
      ["Kompatibel", "Semua GPU"],
      ["Warna", "Putih / Hitam"],
    ],
    desc: "Penyangga GPU anti sag yang bisa disesuaikan tingginya. Mencegah GPU melengkung akibat bobot yang berat. Cocok untuk semua brand dan model GPU.",
  },
  {
    id: 8,
    name: "RAM DDR5 32GB 6400MHz Kingston Fury Beast RGB",
    category: "ram",
    price: 1850000,
    originalPrice: 2100000,
    discount: 12,
    rating: 4.9,
    sold: 210,
    location: "Jakarta Barat",
    isNew: false,
    isPromo: true,
    images: [
      "https://picsum.photos/seed/ramddr5a/600/500",
      "https://picsum.photos/seed/ramddr5b/600/500",
    ],
    specs: [
      ["Kapasitas", "32GB (2x16GB)"],
      ["Tipe", "DDR5"],
      ["Kecepatan", "6400 MHz"],
      ["Latensi", "CL32"],
      ["RGB", "Ya"],
    ],
    desc: "Kingston Fury Beast DDR5 RGB memberikan performa tinggi dengan efisiensi daya yang lebih baik. Lighting RGB yang cantik dan kompatibel dengan platform Intel & AMD terbaru.",
  },
  {
    id: 9,
    name: "SSD NVMe M.2 Samsung 990 Pro 1TB PCIe 4.0",
    category: "storage",
    price: 1350000,
    originalPrice: 1600000,
    discount: 16,
    rating: 4.9,
    sold: 402,
    location: "Tangerang",
    isNew: false,
    isPromo: true,
    images: [
      "https://picsum.photos/seed/ssd990proa/600/500",
      "https://picsum.photos/seed/ssd990prob/600/500",
    ],
    specs: [
      ["Kapasitas", "1TB"],
      ["Interface", "PCIe 4.0 x4"],
      ["Baca Seq.", "7450 MB/s"],
      ["Tulis Seq.", "6900 MB/s"],
      ["Faktor Bentuk", "M.2 2280"],
    ],
    desc: "Samsung 990 Pro adalah SSD NVMe terkencang untuk PC gaming dan workstation. Kecepatan baca hingga 7450 MB/s dengan daya tahan premium.",
  },
  {
    id: 10,
    name: "Thermal Paste Noctua NT-H1 3.5g High Performance",
    category: "aksesoris",
    price: 85000,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    sold: 735,
    location: "Depok",
    isNew: false,
    isPromo: false,
    images: ["https://picsum.photos/seed/thermalpaste/600/500"],
    specs: [
      ["Berat", "3.5g"],
      ["Konduktivitas", "8.9 W/mK"],
      ["Tipe", "Non-electrically conductive"],
      ["Ketahanan", "5 tahun"],
    ],
    desc: "Noctua NT-H1 adalah thermal paste premium yang dikenal dengan kualitas dan konsistensinya. Mudah diaplikasikan dan tidak menyebabkan korosi pada komponen.",
  },
  {
    id: 11,
    name: "RDP Baremetal GPU Ryzen 9 24CPU 128GB RAM 1000GB SSD",
    category: "aksesoris",
    price: 100000,
    originalPrice: 125000,
    discount: 20,
    rating: 4.5,
    sold: 157,
    location: "Jakarta Pusat",
    isNew: false,
    isPromo: true,
    images: [
      "https://picsum.photos/seed/rdpa/600/500",
      "https://picsum.photos/seed/rdpb/600/500",
    ],
    specs: [
      ["CPU", "Ryzen 9 — 24 Thread @ 5.4GHz"],
      ["RAM", "128GB"],
      ["Storage", "1000GB NVMe SSD"],
      ["GPU", "RTX 3050"],
      ["OS", "Windows Server"],
    ],
    desc: "Sewa RDP (Remote Desktop) performa tinggi dengan GPU RTX 3050 untuk kebutuhan komputasi berat, rendering, AI training, dan gaming cloud.",
  },
  {
    id: 12,
    name: "RAM DDR4 16GB 3600MHz Corsair Vengeance LPX",
    category: "ram",
    price: 620000,
    originalPrice: 750000,
    discount: 17,
    rating: 4.8,
    sold: 521,
    location: "Semarang",
    isNew: false,
    isPromo: true,
    images: [
      "https://picsum.photos/seed/corsairrama/600/500",
      "https://picsum.photos/seed/corsairramb/600/500",
    ],
    specs: [
      ["Kapasitas", "16GB (2x8GB)"],
      ["Tipe", "DDR4"],
      ["Kecepatan", "3600 MHz"],
      ["Latensi", "CL18"],
      ["Profil XMP", "2.0"],
    ],
    desc: "Corsair Vengeance LPX DDR4 hadir dengan profil rendah yang cocok untuk case dengan cooler besar. Performa stabil dan kompatibilitas tinggi.",
  },
];

function formatRupiah(n) {
  return "RM " + n.toLocaleString("en-MY");
}

function starHtml(rating) {
  let html = "";
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < full; i++) html += '<i class="bi bi-star-fill"></i>';
  if (half) html += '<i class="bi bi-star-half"></i>';
  return html;
}

function buildCard(p) {
  const priceDiscount = p.discount
    ? `<span class="price-original">${formatRupiah(p.originalPrice)}</span>
       <span class="discount-badge">-${p.discount}%</span>`
    : "";

  return `
    <div class="col-6 col-md-4 col-lg-3 product-col" data-category="${p.category}" data-name="${p.name.toLowerCase()}">
      <div class="product-card" onclick="openModal(${p.id})">
        <div class="card-img-wrap">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy"/>
          ${p.isPromo ? '<span class="badge-promo">PROMO</span>' : ""}
          ${p.isNew ? '<span class="badge-new">BARU</span>' : ""}
        </div>
        <div class="card-body-custom">
          <div class="card-title-prod">${p.name}</div>
          <div class="card-price">
            ${formatRupiah(p.price)}${priceDiscount}
          </div>
          <div class="card-meta">
            <div>
              <span class="stars">${starHtml(p.rating)}</span>
              <span style="font-size:.78rem; margin-left:.2rem;">${p.rating}</span>
            </div>
            <span>${p.sold.toLocaleString("id-ID")} terjual</span>
          </div>
          <div class="card-location mt-1">
            <i class="bi bi-geo-alt-fill text-danger" style="font-size:.72rem;"></i>
            <small class="text-muted">${p.location}</small>
          </div>
        </div>
      </div>
    </div>`;
}

function renderAll(list) {
  const grid = document.getElementById("productGrid");
  const noRes = document.getElementById("noResults");
  if (list.length === 0) {
    grid.innerHTML = "";
    noRes.style.display = "block";
  } else {
    noRes.style.display = "none";
    grid.innerHTML = list.map(buildCard).join("");
  }
}

function filterProducts() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  const activeCat = document.querySelector(".cat-pill.active").dataset.cat;
  const filtered = products.filter((p) => {
    const matchQ = q === "" || p.name.toLowerCase().includes(q);
    const matchCat = activeCat === "semua" || p.category === activeCat;
    return matchQ && matchCat;
  });
  renderAll(filtered);
}

document
  .getElementById("searchInput")
  .addEventListener("input", filterProducts);

document.querySelectorAll(".cat-pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".cat-pill")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterProducts();
  });
});

function openModal(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;

  document.getElementById("modalTitle").textContent = p.name;
  document.getElementById("modalProductName").textContent = p.name;

  const catMap = {
    gpu: "GPU / VGA",
    aksesoris: "Aksesoris",
    ram: "RAM",
    storage: "Storage",
  };
  document.getElementById("modalCategory").textContent =
    catMap[p.category] || p.category;

  document.getElementById("modalBadgeNew").style.display = p.isNew
    ? "inline"
    : "none";

  document.getElementById("modalStars").innerHTML =
    starHtml(p.rating) +
    ` <span style="color:#666; font-size:.8rem;">${p.rating}</span>`;
  document.getElementById("modalSold").textContent =
    `${p.sold.toLocaleString("id-ID")} terjual`;
  document.getElementById("modalLocation").textContent = "📍 " + p.location;

  document.getElementById("modalPrice").textContent = formatRupiah(p.price);
  document.getElementById("modalOriginalPrice").textContent = p.originalPrice
    ? formatRupiah(p.originalPrice)
    : "";
  document.getElementById("modalDiscount").textContent = p.discount
    ? `-${p.discount}%`
    : "";
  document.getElementById("modalDiscount").style.display = p.discount
    ? "inline-block"
    : "none";

  const tbody = document.getElementById("modalSpecs");
  tbody.innerHTML = p.specs
    .map(([k, v]) => `<tr><td>${k}</td><td><strong>${v}</strong></td></tr>`)
    .join("");

  document.getElementById("modalDesc").textContent = p.desc;

  const inner = document.getElementById("carouselInner");
  const indicators = document.getElementById("carouselIndicators");
  const thumbList = document.getElementById("thumbList");

  inner.innerHTML = p.images
    .map(
      (src, i) => `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <img src="${src}" alt="${p.name} foto ${i + 1}"/>
    </div>
  `,
    )
    .join("");

  indicators.innerHTML = p.images
    .map(
      (_, i) => `
    <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${i}"
      ${i === 0 ? 'class="active"' : ""}></button>
  `,
    )
    .join("");

  thumbList.innerHTML = p.images
    .map(
      (src, i) => `
    <img src="${src}" class="${i === 0 ? "active" : ""}" onclick="goSlide(${i}, this)"/>
  `,
    )
    .join("");

  const msgBeli = encodeURIComponent(
    `Halo, saya ingin membeli:\n*${p.name}*\nHarga: ${formatRupiah(p.price)}\n\nMohon info ketersediaan dan pembayaran, terima kasih!`,
  );
  const msgTanya = encodeURIComponent(
    `Halo, saya ingin bertanya tentang produk:\n*${p.name}*\n\nBoleh minta informasi lebih lanjut?`,
  );

  document.getElementById("btnBeli").href =
    `https://wa.me/${WA_NUMBER}?text=${msgBeli}`;
  document.getElementById("btnTanya").href =
    `https://wa.me/${WA_NUMBER}?text=${msgTanya}`;

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
}

function goSlide(index, el) {
  const carousel = bootstrap.Carousel.getOrCreateInstance(
    document.getElementById("productCarousel"),
  );
  carousel.to(index);
  document
    .querySelectorAll(".thumb-list img")
    .forEach((img) => img.classList.remove("active"));
  el.classList.add("active");
}

document
  .getElementById("productCarousel")
  .addEventListener("slid.bs.carousel", (e) => {
    const thumbs = document.querySelectorAll(".thumb-list img");
    thumbs.forEach((t, i) => t.classList.toggle("active", i === e.to));
  });

renderAll(products);

window.openModal = openModal;
window.goSlide = goSlide;
