const API = window.API_ENDPOINTS;

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalQuantity = cart.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);

  const badge = document.getElementById("cart-count");

  if (!badge) return;

  if (totalQuantity > 0) {
    badge.style.display = "inline-block";
    badge.textContent = totalQuantity;
  } else {
    badge.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {

  fetch("/html/header.html")
    .then(res => res.text())
    .then(html => {

      const headerPlaceholder =
        document.getElementById("header-placeholder");
      if (!headerPlaceholder) return;

      headerPlaceholder.innerHTML = html;

      updateCartCount();

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

      if (categoryMenu) {
        fetch(API.CATEGORIES)
          .then(res => res.json())
          .then(categories => {
            categoryMenu.innerHTML = "";

            categories.forEach(cat => {
              const a = document.createElement("a");
              a.href =
                `/html/category.html?cat=${encodeURIComponent(cat)}`;
              a.textContent = cat.toUpperCase();
              categoryMenu.appendChild(a);
            });
          })
          .catch(err =>
            console.error("❌ Category fetch failed:", err)
          );
      }

      window.addEventListener("scroll", () => {
        if (!header) return;

        if (window.scrollY > 8) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });

    })
    .catch(err =>
      console.error("❌ Header fetch failed:", err)
    );
});