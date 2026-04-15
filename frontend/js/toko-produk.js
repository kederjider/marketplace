const DEFAULT_WA_NUMBER = "628123456789";

let products = [
  {
    id: 1,
    name: "Jual HP Redmi 12c 6GB/128GB",
    category: "aksesoris",
    price: 270,
    originalPrice: 450,
    discount: 40,
    rating: 4.9,
    sold: 0,
    location: "parasmark",
    waNumber: "60137009088",
    isNew: false,
    isPromo: true,
    images: [
      "jual/ai redmi 12c dpn.png",
      "jual/ai redmi 12c blg.png",
      "jual/redmi 12c dpn.jpg",
      "jual/redmi 12c blg.jpg",
    ],
    specs: [
      ["kelengkapan", "hanya hp saja"],
      ["kondisi", "bekas, mulus, no minus"],
      ["prosesor", "mediatek helio g85 octa-core 2.0ghz"],
      ["RAM", "6GB"],
      ["Penyimpanan", "128GB"],
      ["Kamera", "50MP + 8MP + 2MP"],
      ["Baterai", "5000mAh"],
    ],
    desc: "Jual HP Redmi 12c 6GB/128GB - Kondisi: Bekas, Mulus, No Minus - Harga: RM 270 (Nego) - kelengkapan: HANYA HP tanpa box dan charger - Spesifikasi: Prosesor mediatek helio g85 octa-core 2.0ghz, RAM 6GB, Penyimpanan 128GB, Kamera 50MP + 8MP + 2MP, Baterai 5000mAh - Cocok untuk penggunaan sehari-hari, gaming ringan, dan fotografi. - Hubungi kami untuk info lebih lanjut atau nego harga!",
  },
  {
    id: 2,
    name: "Jual Hp Vivo Y11 3GB/32GB",
    category: "aksesoris",
    price: 100,
    originalPrice: 150,
    discount: 33,
    rating: 4.9,
    sold: 0,
    location: "parasmark",
    waNumber: "601137009088",
    isNew: false,
    isPromo: true,
    images: [
      "jual/ai vivo y11 blg.png",
      "jual/ai vivo y11 dpn.png",
      "jual/vivo y11 blg.jpg",
      "jual/vivo y11 dpn.jpg",
    ],
    specs: [
      ["Kelengkapan", "hanya hp saja"],
      ["Kondisi", "bekas, mulus, no minus"],
      ["Prosesor", "Qualcomm Snapdragon 439 octa-core 2.0GHz"],
      ["Baterai", "5000mAh"],
      ["Penyimpanan", "32GB"],
      ["RAM", "3GB"],
    ],
    desc: "jual hp vivo y11 3gb/32gb - Kondisi: Bekas, Mulus, No Minus - Harga: RM 100 next - kelengkapan: HANYA HP tanpa box dan charger - Spesifikasi: Prosesor Qualcomm Snapdragon 439 octa-core 2.0GHz, Baterai 5000mAh, Penyimpanan 32GB, RAM 3GB - Cocok untuk penggunaan sehari-hari.",
  },
  {
    id: 3,
    name: "XL DATA ULTRA 100GB NASIONAL 28 HARI",
    category: "gpu",
    price: 30,
    originalPrice: null,
    discount: null,
    rating: 5.0,
    sold: 5,
    location: "parasmark",
    waNumber: "60137009088",
    isNew: false,
    isPromo: false,
    images: ["jual/paket data xl 100gb.png"],
    specs: [
      ["PAKET DATA", "XL DATA ULTRA 100GB NASIONAL 28 HARI"],
      ["QUOTA", "100GB 24 Jam (Nasional)"],
      ["MASA AKTIF", "28 Hari"],
      ["DIGUNAKAN", "Semua nomor XL Prabayar/Prepaid"],
      [
        "BERLAKU",
        "12 negara: Indonesia, Malaysia, Singapura, Kamboja, Hongkong, Macau, Taiwan, Bangladesh, Sri Lanka, Nepal",
      ],
    ],
    desc: "XL DATA ULTRA 100GB NASIONAL 28 HARI - Hanya dapat digunakan untuk semua nomor XL Prabayar/Prepaid. - Kuota akan terakumulasi jika melakukan pembelian ulang varian yang sama atau lebih tinggi. - Dapat digunakan di jaringan 4G & 5G. - Selain di Indonesia, kuota dapat digunakan juga di negara lainnya: Malaysia, Singapura, Kamboja, Hongkong, Macau, Taiwan, Bangladesh, Sri Lanka, dan Nepal. - Kuota yang akan didapat: Kuota Utama 100GB 24 Jam (Nasional) - Tidak ada bonus redeem. - Masa aktif 28 hari",
  },
  {
    id: 4,
    name: "Indosat Freedom Internet Sensasi 100GB GB 28 Hari",
    category: "gpu",
    price: 30,
    originalPrice: null,
    discount: null,
    rating: 5.0,
    sold: 11,
    location: "parasmark",
    waNumber: "60137009088",
    isNew: true,
    isPromo: true,
    images: ["jual/paket data indosat.png"],
    specs: [
      ["PAKET DATA", "Indosat Freedom Internet Sensasi"],
      ["QUOTA", "100GB GB Reguler 24 Jam"],
      ["MASA AKTIF", "28 Hari"],
      ["DIGUNAKAN", "Semua nomor INDOSAT"],
    ],
    desc: "- RESMI dan tidak perlu login OTP. - Kuota 100GB full reguler tanpa pembagian. TIDAK ADA BATAS LIMIT/FUP HARIAN. - Bisa untuk semua nomor INDOSAT asalkan masih aktif. - Masa aktif 28 hari.",
  },
  {
    id: 5,
    name: "TRI Data Happy Ramadan 65GB 28 Hari",
    category: "gpu",
    price: 25,
    originalPrice: 30,
    discount: 3,
    rating: 4.9,
    sold: 1,
    location: "parasmark",
    waNumber: "60137009088",
    isNew: true,
    isPromo: true,
    images: ["jual/TRI Data Happy Ramadan 65GB 28 Hari.png"],
    specs: [
      ["PAKET DATA", "TRI Data Happy Ramadan"],
      ["QUOTA", "65GB GB Reguler 24 Jam"],
      ["MASA AKTIF", "28 Hari"],
      ["DIGUNAKAN", "Semua nomor TRI"],
    ],
    desc: "TRI Data Happy Ramadan 65GB 28 Hari (Tanpa Limit Harian) - RESMI dan tidak perlu login OTP. - Kuota 65GB full reguler tanpa pembagian. - Bisa untuk semua nomor TRI asalkan masih aktif. - Masa aktif 28 hari.",
  },
  {
    id: 6,
    name: "TOP UP PULSA MALAYSIA MURAH & CEPAT!",
    category: "gpu",
    price: 11,
    originalPrice: null,
    discount: null,
    rating: 4.9,
    sold: 6,
    location: "parasmark",
    waNumber: "60137009088",
    isNew: false,
    isPromo: true,
    images: ["jual/jasa top up pulsa malaysia.png"],
    specs: [
      ["Proses", "⚡ Proses cepat & otomatis"],
      ["Keamanan", "🔒 Aman & terpercaya"],
      ["Support", "📱 Support semua nomor aktif"],
    ],
    desc: "Melayani isi ulang pulsa untuk semua operator Malaysia: Digi, Celcom, Maxis, Tune Talk, U Mobile, dan banyak lagi! Proses cepat, harga kompetitif, dan layanan terpercaya. Cocok untuk kebutuhan pribadi atau bisnis. Hubungi kami sekarang untuk top up pulsa Malaysia dengan mudah dan aman!",
  },
  {
    id: 7,
    name: "JASA TOP UP E-WALLET INDONESIA",
    category: "ram",
    price: 5,
    originalPrice: null,
    discount: null,
    rating: 5.0,
    sold: 8,
    location: "parasmark",
    waNumber: "60137009088",
    isNew: false,
    isPromo: true,
    images: ["jual/topup ewallet.png"],
    specs: [
      ["Keunggulan layanan", "Proses cepat & real-time"],
      ["Aman dan terpercaya", "Support berbagai nominal"],
      ["Tanpa ribet, langsung masuk", "Biaya admin hanya 5 ringgit"],
    ],
    desc: "💸 JASA TOP UP E-WALLET INDONESIA TERMURAH! 💸, Butuh isi saldo DANA, OVO, GoPay, atau ShopeePay?, ✨ Proses cepat & aman, ✨ Tanpa ribet, langsung masuk, ✨ Support semua nominal, 💰 Biaya admin cuma 5 ringgit! ⚡ Cocok buat transfer, belanja, top up game, dl, 📩 Langsung chat sekarang sebelum antrian ramai!",
  },
  {
    id: 8,
    name: "Jual Akun Game Moblie Legends",
    category: "gpu",
    price: 95,
    originalPrice: 120,
    discount: 19,
    rating: 5.0,
    sold: 3,
    location: "Parasmark",
    waNumber: "60137009088",
    isNew: true,
    isPromo: true,
    images: ["jual/GRANGER PRIME.png", "jual/GRANGER PRIME SKIN.png"],
    specs: [
      ["Nama", "GRANGER PRIME"],
      ["Skin", "228"],
      ["Hero", "117"],
      ["Ex", "72 Glory"],
      ["Spek Setara Dengan", "15988 Diamond"],
    ],
    desc: "🔥 PROMO SPESIAL AKUN MOBILE LEGENDS MURAH! 🔥 Dijual akun Mobile Legends dengan spek tinggi dan koleksi skin keren! Cocok buat push rank atau kolektor skin.  ✨ Detail Akun:  Rank tinggi + Mythic Glory 🏆  Banyak skin keren (Epic, Luckybox, dll)  Skin PRIME & kolektor langka  Emote dan item lengkap  Total skin banyak (siap dipakai tanpa grind lagi)  💰 Harga Promo: 95 Ringgit  120 Ringgit ❌ (harga normal) 🎯 Hemat besar! Langsung pakai tanpa ribet build dari awal  📩 Minat? Langsung chat sebelum keambil!",
  },
  {
    id: 9,
    name: "YU ZHONG PRIME",
    category: "gpu",
    price: 200,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    sold: 1,
    location: "parasmark",
    waNumber: "60137009088",
    isNew: false,
    isPromo: true,
    images: ["jual/YU ZHONG PRIME.png", "jual/YU ZHONG PRIME SKIN.png"],
    specs: [
      ["Nama", "YU ZHONG PRIME"],
      ["Skin", "356"],
      ["Hero", "132"],
      ["Ex", "61 Glory"],
      ["Spek Setara Dengan", "14397 Diamond"],
    ],
    desc: "🔥 PROMO SPESIAL AKUN MOBILE LEGENDS MURAH! 🔥 Dijual akun Mobile Legends dengan spek tinggi dan koleksi skin keren! Cocok buat push rank atau kolektor skin.  ✨ Detail Akun:  Rank tinggi + Mythic Glory 🏆  Banyak skin keren (Epic, Luckybox, dll)  Skin PRIME & kolektor langka  Emote dan item lengkap  Total skin banyak (siap dipakai tanpa grind lagi)  💰 Harga Promo: 95 Ringgit  120 Ringgit ❌ (harga normal) 🎯 Hemat besar! Langsung pakai tanpa ribet build dari awal  📩 Minat? Langsung chat sebelum keambil!",
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
    waNumber: "628123450010",
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
    waNumber: "628123450011",
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
    name: "Jasa Permak Levis atau jasa jahit",
    category: "ram",
    price: 15,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    sold: 5,
    location: "parasmark",
    waNumber: "628123450012",
    isNew: false,
    isPromo: true,
    images: ["jual/permak levis.png"],
    specs: [
      ["Ukuran", "Sampai lingkar pinggang 40 inci"],
      ["Warna", "pilihan benang warna-warni"],
    ],
    desc: "Jasa permak Levis atau jasa jahit dengan kualitas terbaik dan harga terjangkau.",
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
    gpu: "Produk Digital/Elektronik",
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

  const waNumber = String(p.waNumber || DEFAULT_WA_NUMBER).replace(/\D/g, "");

  document.getElementById("btnBeli").href =
    `https://wa.me/${waNumber}?text=${msgBeli}`;
  document.getElementById("btnTanya").href =
    `https://wa.me/${waNumber}?text=${msgTanya}`;

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

function normalizeTextKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[\-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getImageIdentityKeys(imageUrl, fileName) {
  const keys = [];

  const rawUrl = String(imageUrl || "").trim();
  const rawName = String(fileName || "").trim();

  if (rawUrl) {
    let decodedUrl = rawUrl;
    try {
      decodedUrl = decodeURIComponent(rawUrl);
    } catch (_) {
      decodedUrl = rawUrl;
    }

    const cleanUrl = decodedUrl
      .split(/[?#]/)[0]
      .replace(/\\/g, "/")
      .toLowerCase();

    if (cleanUrl) keys.push(cleanUrl);

    const baseFromUrl = cleanUrl.split("/").pop() || "";
    if (baseFromUrl) keys.push(baseFromUrl);
  }

  if (rawName) {
    let decodedName = rawName;
    try {
      decodedName = decodeURIComponent(rawName);
    } catch (_) {
      decodedName = rawName;
    }

    const cleanName = decodedName
      .replace(/\\/g, "/")
      .toLowerCase()
      .split("/")
      .pop();

    if (cleanName) keys.push(cleanName);
  }

  return keys.filter(Boolean);
}

function buildAutoProductFromImage(fileName, imageUrl, id) {
  const cleanName = normalizeTextKey(fileName);
  return {
    id,
    name: cleanName || `Produk ${id}`,
    category: "aksesoris",
    price: 0,
    originalPrice: null,
    discount: null,
    rating: 5.0,
    sold: 0,
    location: "parasmark",
    waNumber: DEFAULT_WA_NUMBER,
    isNew: true,
    isPromo: false,
    images: [imageUrl],
    specs: [["Sumber", "Folder jual"]],
    desc: "Produk otomatis dari folder jual. Silakan hubungi penjual untuk detail harga dan stok.",
  };
}

async function loadProductsFromJualDirectory() {
  try {
    const resp = await fetch("/api/jual-images");
    if (!resp.ok) return;

    const data = await resp.json();
    const images = Array.isArray(data.images) ? data.images : [];

    const existingImageKeys = new Set();
    const existingNameKeys = new Set(
      products.map((p) => normalizeTextKey(p.name)).filter(Boolean),
    );

    for (const p of products) {
      for (const img of p.images || []) {
        for (const key of getImageIdentityKeys(img, "")) {
          existingImageKeys.add(key);
        }
      }
    }

    let nextId = products.reduce((max, p) => Math.max(max, p.id || 0), 0) + 1;

    for (const item of images) {
      const imageUrl = String(item.url || "").trim();
      const fileName = String(item.name || "").trim();
      if (!imageUrl || !fileName) continue;

      const imageKeys = getImageIdentityKeys(imageUrl, fileName);
      const isDuplicateImage = imageKeys.some((key) =>
        existingImageKeys.has(key),
      );
      if (isDuplicateImage) continue;

      const autoName = normalizeTextKey(fileName);
      if (autoName && existingNameKeys.has(autoName)) continue;

      products.push(buildAutoProductFromImage(fileName, imageUrl, nextId));

      imageKeys.forEach((key) => existingImageKeys.add(key));
      if (autoName) existingNameKeys.add(autoName);
      nextId += 1;
    }

    filterProducts();
  } catch (_) {
    // Keep static product list when API is unavailable.
  }
}

document
  .getElementById("productCarousel")
  .addEventListener("slid.bs.carousel", (e) => {
    const thumbs = document.querySelectorAll(".thumb-list img");
    thumbs.forEach((t, i) => t.classList.toggle("active", i === e.to));
  });

renderAll(products);
loadProductsFromJualDirectory();

window.openModal = openModal;
window.goSlide = goSlide;
