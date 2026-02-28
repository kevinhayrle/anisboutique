const COLOR_PALETTE = {
White: [
    { name: "Ivory", hex: "#FFFFF0" },
    { name: "Off White", hex: "#FAF9F6" },
    { name: "Cream", hex: "#FFFDD0" },
    { name: "Linen", hex: "#EAE6DA" }
  ],

  Black: [
    { name: "Jet Black", hex: "#000000" },
    { name: "Charcoal", hex: "#36454F" },
    { name: "Midnight", hex: "#1C1C1C" }
  ],

  Red: [
    { name: "Cherry", hex: "#C0392B" },
    { name: "Crimson", hex: "#9B1B30" },
    { name: "Wine", hex: "#722F37" },
    { name: "Maroon", hex: "#800000" }
  ],

  Blue: [
    { name: "Baby Blue", hex: "#BFE6FF" },
    { name: "Sky Blue", hex: "#87CEEB" },
    { name: "Royal Blue", hex: "#4169E1" },
    { name: "Navy", hex: "#0A1A3F" },
    { name: "Denim", hex: "#2C3E50" }
  ],

  Green: [
    { name: "Mint", hex: "#98FF98" },
    { name: "Sage", hex: "#B2AC88" },
    { name: "Olive", hex: "#808000" },
    { name: "Emerald", hex: "#2ECC71" },
    { name: "Bottle Green", hex: "#006A4E" }
  ],

  Yellow: [
    { name: "Butter", hex: "#FFF1A8" },
    { name: "Lemon", hex: "#F1C40F" },
    { name: "Mustard", hex: "#D4AC0D" }
  ],

  Pink: [
    { name: "Baby Pink", hex: "#FADADD" },
    { name: "Blush", hex: "#F4C2C2" },
    { name: "Rose", hex: "#E91E63" },
    { name: "Raspberry", hex: "#8B1C62" }
  ],

  Purple: [
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "Lilac", hex: "#C8A2C8" },
    { name: "Plum", hex: "#673147" },
    { name: "Amethyst", hex: "#9B59B6" }
  ],

  Brown: [
    { name: "Tan", hex: "#D2B48C" },
    { name: "Camel", hex: "#C19A6B" },
    { name: "Mocha", hex: "#6F4E37" },
    { name: "Chocolate", hex: "#4E342E" }
  ],

  Grey: [
    { name: "Light Grey", hex: "#D3D3D3" },
    { name: "Slate", hex: "#708090" },
    { name: "Charcoal Grey", hex: "#2F4F4F" }
  ]
};

const LINING_QUALITIES = ["Rs.35", "Rs.45", "Rs.55", "Rs.65"];

let selectedColor = null;
let selectedQuality = null;
let selectedQuantity = 1;
let currentPrice = 0;
let discountedPrice = null;

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`${window.BASE_API}/products/${productId}`)
  .then(res => res.json())
  .then(product => renderProduct(product));
function renderProduct(product) {

  document.getElementById("productName").textContent = product.name;

  const productTitle = `${product.name} | Anis Boutique Chennai`;

  const productDescription =
    product.description
      ? `${product.description} Available at Anis Boutique Chennai.`
      : `Buy ${product.name} at Anis Boutique Chennai. Premium quality fabrics available now.`;

  document.title = productTitle;

  document.querySelector('meta[name="description"]')
    ?.setAttribute("content", productDescription);

  document.getElementById("ogTitle")
    ?.setAttribute("content", productTitle);

  document.getElementById("ogDescription")
    ?.setAttribute("content", productDescription);

  document.getElementById("twitterTitle")
    ?.setAttribute("content", productTitle);

  document.getElementById("twitterDescription")
    ?.setAttribute("content", productDescription);

  document.getElementById("canonicalTag")
    ?.setAttribute(
      "href",
      `https://anisboutique.in/html/product.html?id=${product.id}`
    );

  if (product.image_url) {
    document.getElementById("ogImage")
      ?.setAttribute("content", product.image_url);

    document.getElementById("twitterImage")
      ?.setAttribute("content", product.image_url);
  }

  document.getElementById("productDescription").textContent =
    product.description || "";

  currentPrice = product.price;
  discountedPrice = product.discounted_price || null;

  updatePriceUI(currentPrice, discountedPrice);

  const mainImage = document.getElementById("mainImage");
  mainImage.src = product.image_url;

  mainImage.onclick = () => {
    const overlay = document.createElement("div");
    overlay.className = "image-zoom-overlay";

    const zoomedImg = document.createElement("img");
    zoomedImg.src = mainImage.src;

    overlay.appendChild(zoomedImg);
    document.body.appendChild(overlay);

    overlay.onclick = () => overlay.remove();
  };

  const extraImages = document.getElementById("extraImages");
  extraImages.innerHTML = "";

  (product.extra_images || []).forEach(url => {
    const img = document.createElement("img");
    img.src = url;

    img.addEventListener("click", () => {
      mainImage.src = url;
    });

    extraImages.appendChild(img);
  });
  
const category = product.category?.trim().toLowerCase();

const categoriesWithColors = [
  "lining",
  "two by two",
  "silk cotton",
  "plain net",
  "poplin",
  "suncrepe",
  "falls",
  "satin"
];

if (categoriesWithColors.includes(category)) {
  renderColorPalette();
} else {
  document.getElementById("colorSection").style.display = "none";
  selectedColor = null;
}

  if (product.category === "Lining") {
    renderQualityOptions(product);
  } else {
    document.getElementById("qualitySection").style.display = "none";
  }

  renderQuantity(product.quantity_unit);

  document.getElementById("addToCartBtn").onclick =
    () => addToCart(product);
}

function updatePriceUI(price, discounted) {
  const priceEl = document.getElementById("productPrice");

  if (discounted) {
    priceEl.innerHTML = `
      <span class="old-price">₹${price}</span>
      <span class="new-price">₹${discounted}</span>
    `;
  } else {
    priceEl.innerHTML = `<span class="new-price">₹${price}</span>`;
  }
}

function addToCart(product) {

  if (product.category === "Lining" && !selectedQuality) {
    alert("Please select lining quality");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    product_id: product.id,
    name: product.name,
    category: product.category,
    image: product.image_url,
    color: selectedColor || null,
    quality: selectedQuality || null,
    quantity: selectedQuantity,
    unit: product.quantity_unit,
    price: discountedPrice || currentPrice,
    base_price: currentPrice,
    discounted_price: discountedPrice
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  showCartPopup();        
  updateCartCount();        
}

function showCartPopup() {

  const popup = document.createElement("div");
  popup.className = "cart-popup";
  popup.innerHTML = `
    <div class="cart-popup-content">
      <i class="fa-solid fa-circle-check"></i>
      <span>Product added to cart</span>
    </div>
  `;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show");
  }, 10);

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 2000);
}

function renderQuantity(unit) {
  const container = document.getElementById("quantityControl");
  container.innerHTML = "";

  if (unit === "unit") {
    const wrap = document.createElement("div");
    wrap.className = "quantity-buttons";

    const minus = document.createElement("button");
    minus.textContent = "−";

    const plus = document.createElement("button");
    plus.textContent = "+";

    const label = document.createElement("span");
    label.textContent = "1";

    minus.onclick = () => {
      if (selectedQuantity > 1) {
        selectedQuantity--;
        label.textContent = selectedQuantity;
      }
    };

    plus.onclick = () => {
      selectedQuantity++;
      label.textContent = selectedQuantity;
    };

    wrap.append(minus, label, plus);
    container.appendChild(wrap);
  } else {
    const wrap = document.createElement("div");
    wrap.className = "quantity-input";

    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.value = 1;

    input.oninput = () => {
      selectedQuantity = Number(input.value || 1);
    };

    const unitLabel = document.createElement("span");
    unitLabel.className = "unit-label";
    unitLabel.textContent = unit;

    wrap.append(input, unitLabel);
    container.appendChild(wrap);
  }
}

function renderColorPalette() {
  const palette = document.getElementById("colorPalette");
  palette.innerHTML = "";

  Object.values(COLOR_PALETTE).flat().forEach(color => {
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.background = color.hex;
    swatch.title = color.name;

    swatch.onclick = () => {
      document.querySelectorAll(".color-swatch")
        .forEach(s => s.classList.remove("active"));

      swatch.classList.add("active");
      selectedColor = color;
    };

    palette.appendChild(swatch);
  });
}

function renderQualityOptions(product) {
  const container = document.getElementById("qualityOptions");
  container.innerHTML = "";

  LINING_QUALITIES.forEach(q => {
    const box = document.createElement("div");
    box.className = "quality-box";
    box.textContent = q;

    box.onclick = () => {
      document.querySelectorAll(".quality-box")
        .forEach(b => b.classList.remove("active"));

      box.classList.add("active");
      selectedQuality = q;
      currentPrice = Number(q.replace("Rs.", ""));
      discountedPrice = null;

      updatePriceUI(currentPrice, null);
    };

    container.appendChild(box);
  });
}
