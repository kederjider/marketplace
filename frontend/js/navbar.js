(function () {
  const currentPage = (
    window.location.pathname.split("/").pop() || ""
  ).toLowerCase();
  const navLinks = document.querySelectorAll(".app-nav-link");
  const menuToggle = document.getElementById("appMenuToggle");
  const menuClose = document.getElementById("appMenuClose");
  const navWrapper = document.getElementById("appNavWrapper");
  const navOverlay = document.getElementById("appNavOverlay");

  document.body.classList.add("has-app-navbar");

  function closeMobileMenu() {
    if (!menuToggle || !navWrapper || !navOverlay) return;
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    navWrapper.classList.remove("is-open");
    navOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openMobileMenu() {
    if (!menuToggle || !navWrapper || !navOverlay) return;
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    navWrapper.classList.add("is-open");
    navOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  if (menuToggle && navWrapper && navOverlay) {
    menuToggle.addEventListener("click", function () {
      if (navWrapper.classList.contains("is-open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    navOverlay.addEventListener("click", closeMobileMenu);
    if (menuClose) menuClose.addEventListener("click", closeMobileMenu);

    window.addEventListener("resize", function () {
      if (window.innerWidth > 920) closeMobileMenu();
    });
  }

  navLinks.forEach((link) => {
    const target = (link.getAttribute("data-page") || "").toLowerCase();
    if (target && currentPage === target) {
      link.classList.add("active");
    }

    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  const aboutBtn = document.getElementById("navAboutBtn");
  if (aboutBtn) {
    aboutBtn.addEventListener("click", function (event) {
      event.preventDefault();
      closeMobileMenu();
      window.location.href = "/about";
    });
  }
})();
