const MATERIAL_CATEGORIES = [
  "Lining",
  "Two by Two",
  "Silk Cotton",
  "Plain Net",
  "Poplin",
  "Suncrepe",
  "Inskirts",
  "Falls",
  "Satin"
];

const MATERIAL_IMAGES = {
  "Lining": "/assets/lining.jpeg",
  "Two by Two": "/assets/2by2.png",
  "Silk Cotton": "/assets/silkcotton.png",
  "Plain Net": "/assets/plainnet.png",
  "Poplin": "/assets/poplin.jpeg",
  "Suncrepe": "/assets/suncrepe.webp",
  "Inskirts": "/assets/inskirt.png",
  "Falls": "/assets/falls.png",
  "Satin": "/assets/satin.jpeg"
};

const OTHER_MATERIAL_IMAGES = {
  "Aari Materials": "/assets/aari.jpeg",
  "Stitching Items": "/assets/stitchingitems.jpeg",
  "Laces": "/assets/laces.WEBP",
  "Knots": "/assets/hangingknot.WEBP",
  "Others": "/assets/others.WEBP"
};

async function loadCategories() {
  try {
    const res = await fetch(API_ENDPOINTS.CATEGORIES);
    const categories = await res.json();

    const materialsGrid = document.getElementById("materialsGrid");
    const otherMaterials = document.getElementById("otherMaterials");

    materialsGrid.innerHTML = "";
    otherMaterials.innerHTML = "";

    categories.forEach(category => {
      const categoryUrl =
        `/html/category.html?cat=${encodeURIComponent(category)}`;

      if (MATERIAL_CATEGORIES.includes(category)) {
        const card = document.createElement("a");
        card.href = categoryUrl;
        card.className = "material-card";

        card.innerHTML = `
          <img src="${MATERIAL_IMAGES[category]}" alt="${category}">
          <p>${category}</p>
        `;

        materialsGrid.appendChild(card);
      } else if (OTHER_MATERIAL_IMAGES[category]) {
        const card = document.createElement("a");
        card.href = categoryUrl;
        card.className = "material-card";

        card.innerHTML = `
          <img src="${OTHER_MATERIAL_IMAGES[category]}" alt="${category}">
          <p>${category}</p>
        `;

        otherMaterials.appendChild(card);
      }
    });
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {

  loadCategories();

  const homeSearch = document.getElementById("homeSearch");
  if (homeSearch) {
    homeSearch.addEventListener("focus", () => {
      window.location.href = "/html/search.html";
    });
  }

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
