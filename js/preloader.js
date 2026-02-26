document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("preloader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }, 1200);
});