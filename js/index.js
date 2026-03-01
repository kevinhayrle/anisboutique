/* =========================================
   MATERIAL DEFINITIONS
========================================= */

const MATERIAL_CATEGORIES = [
  "Lining",
  "Two by Two",
  "Silk Cotton",
  "Plain Net",
  "Poplin",
  "Suncrepe",
  "Falls",
  "Satin"
];

const MATERIAL_IMAGES = {
  "Lining": "/assets/lining.webp",
  "Two by Two": "/assets/2by2.webp",
  "Silk Cotton": "/assets/silkcotton.webp",
  "Plain Net": "/assets/plainnet.webp",
  "Poplin": "/assets/poplin.webp",
  "Suncrepe": "/assets/suncrepe.webp",
  "Falls": "/assets/falls.webp",
  "Satin": "/assets/satin.webp"
};

const OTHER_MATERIAL_IMAGES = {
  "Inskirts": "/assets/inskirt.webp",
  "Aari Materials": "/assets/aari.webp",
  "Stitching Items": "/assets/stitchingitems.webp",
  "Laces": "/assets/lace.webp",
  "Knots": "/assets/knot.webp",
  "Others": "/assets/other.webp"
};

/* =========================================
   LOAD CATEGORIES
========================================= */

async function loadCategories() {
  try {
    const res = await fetch(API_ENDPOINTS.CATEGORIES);
    const categories = await res.json();

    const materialsGrid = document.getElementById("materialsGrid");
    const otherMaterials = document.getElementById("otherMaterials");

    materialsGrid.innerHTML = "";
    otherMaterials.innerHTML = "";

    /* ================================
       MATERIALS (FIXED ORDER)
    ================================= */

    MATERIAL_CATEGORIES.forEach(category => {
      if (categories.includes(category)) {

        const materialUrl =
          `/html/product.html?material=${encodeURIComponent(category)}`;

        const card = document.createElement("a");
        card.href = materialUrl;
        card.className = "material-card";

        card.innerHTML = `
          <img src="${MATERIAL_IMAGES[category]}" alt="${category}">
          <p>${category}</p>
        `;

        materialsGrid.appendChild(card);
      }
    });

    /* ================================
       OTHER MATERIALS (SORTED)
       "Others" ALWAYS LAST
    ================================= */

    const otherCategories = categories
      .filter(cat => OTHER_MATERIAL_IMAGES[cat])
      .sort((a, b) => {

        if (a === "Others") return 1;
        if (b === "Others") return -1;

        return a.localeCompare(b);
      });

    otherCategories.forEach(category => {

      const categoryUrl =
        `/html/category.html?cat=${encodeURIComponent(category)}`;

      const card = document.createElement("a");
      card.href = categoryUrl;
      card.className = "material-card";

      card.innerHTML = `
        <img src="${OTHER_MATERIAL_IMAGES[category]}" alt="${category}">
        <p>${category}</p>
      `;

      otherMaterials.appendChild(card);
    });

  } catch (error) {
    console.error("Failed to load categories:", error);
  }
}

/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  loadCategories();

  /* ================================
     HOME SEARCH REDIRECT
  ================================= */

  const homeSearch = document.getElementById("homeSearch");

  if (homeSearch) {
    homeSearch.addEventListener("mousedown", e => {
      e.preventDefault();
      window.location.href = "/html/search.html";
    });

    homeSearch.addEventListener("touchstart", e => {
      e.preventDefault();
      window.location.href = "/html/search.html";
    });
  }

  /* ================================
     SLIDER LOGIC
  ================================= */

  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".nav.prev");
  const nextBtn = document.querySelector(".nav.next");

  if (!slides.length || !prevBtn || !nextBtn) return;

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);

});