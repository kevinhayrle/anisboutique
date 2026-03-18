window.updateCartCount = function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.querySelector("#cart-count");
  if (!badge) return;
  if (cart.length > 0) {
    badge.style.display = "inline-block";
    badge.textContent = cart.length;
  } else {
    badge.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {

  const API = window.API_ENDPOINTS;

  const MATERIAL_CATEGORIES = [
    "Lining",
    "Two by Two",
    "Silk Cotton",
    "Plain Net",
    "Suncrepe",
    "Falls",
    "Satin"
  ];

  const EXCLUDED_CATEGORIES = ["Poplin", "Inskirts"];

  fetch("/html/header.html")
    .then(res => res.text())
    .then(html => {

      const headerPlaceholder = document.getElementById("header-placeholder");
      if (!headerPlaceholder) return;

      headerPlaceholder.innerHTML = html;

      window.updateCartCount();

      /* ===== SIDEBAR / HAMBURGER ===== */

      const sidebar = document.getElementById("sidebar");
      const hamburger = document.getElementById("hamburger-icon");
      const categoryMenu = document.getElementById("category-menu");
      const header = document.querySelector("header.header-left");

      if (hamburger && sidebar) {
        hamburger.addEventListener("click", () => {
          sidebar.classList.toggle("active");
        });
      }

      if (sidebar) {
        sidebar.querySelectorAll("a").forEach(link => {
          link.addEventListener("click", () => {
            sidebar.classList.remove("active");
          });
        });
      }

      /* ===== LOAD CATEGORIES INTO SIDEBAR ===== */

      if (categoryMenu && API?.CATEGORIES) {

        fetch(API.CATEGORIES)
          .then(res => res.json())
          .then(categories => {

            categoryMenu.innerHTML = "";

            categories
              .filter(cat => !EXCLUDED_CATEGORIES.includes(cat))
              .forEach(cat => {

                const a = document.createElement("a");

                if (MATERIAL_CATEGORIES.includes(cat)) {
                  a.href = `/html/product.html?material=${encodeURIComponent(cat)}`;
                } else {
                  a.href = `/html/category.html?cat=${encodeURIComponent(cat)}`;
                }

                a.textContent = cat.toUpperCase();
                categoryMenu.appendChild(a);
              });
          })
          .catch(err => console.error("❌ Category fetch failed:", err));
      }

      /* ===== HEADER SCROLL EFFECT ===== */

      window.addEventListener("scroll", () => {
        if (!header) return;
        if (window.scrollY > 8) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });

    })
    .catch(err => console.error("❌ Header fetch failed:", err));
});