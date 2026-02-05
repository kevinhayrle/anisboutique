const PRODUCTS_API = `${window.BASE_API}/products`;

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const openCameraBtn = document.getElementById("openCameraBtn");
const switchCameraIcon = document.getElementById("switchCameraIcon");
const captureBtn = document.getElementById("captureBtn");
const searchBtn = document.getElementById("searchBtn");
const colorResult = document.getElementById("colorResult");
const productsContainer = document.getElementById("productsContainer");

let stream = null;
let facingMode = "environment";

async function startCamera() {
  if (stream) stream.getTracks().forEach(t => t.stop());

  const oldImg = document.querySelector(".lens-wrapper img");
  if (oldImg) oldImg.remove();

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode }
  });

  video.srcObject = stream;
  await video.play();

  searchBtn.disabled = true;
  colorResult.textContent = "";
  productsContainer.innerHTML = "";
}

function switchCamera() {
  facingMode = facingMode === "environment" ? "user" : "environment";
  startCamera();
}

function captureImage() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  stream.getTracks().forEach(t => t.stop());
  video.srcObject = null;

  const img = document.createElement("img");
  img.src = canvas.toDataURL("image/png");
  document.querySelector(".lens-wrapper").prepend(img);

  searchBtn.disabled = false;
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  const d = max - min;
  let h = 0;

  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : d / max;
  const v = max;

  return { h, s, v };
}

function getColorName(r, g, b) {
  const { h, s, v } = rgbToHsv(r, g, b);

  if (v < 0.2) return "black";
  if (v > 0.9 && s < 0.25) return "white";

  if (s < 0.25) {
    if (v < 0.6) return "brown";
    return "white";
  }

  if (b > r * 1.1 && b > g * 1.05) return "blue";
  if (h >= 35 && h <= 65) return "yellow";
  if (h > 65 && h <= 160) return "green";
  if (h > 160 && h <= 260) return "blue";
  if (h > 260 && h <= 320) return "purple";
  if ((h < 20 || h > 340) && v > 0.65) return "pink";
  if (h < 20 || h > 340) return "red";

  return "brown";
}

function detectColor() {
  const data = ctx.getImageData(
    canvas.width * 0.3,
    canvas.height * 0.3,
    canvas.width * 0.4,
    canvas.height * 0.4
  ).data;

  let r = 0, g = 0, b = 0, c = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    c++;
  }

  r = Math.round(r / c);
  g = Math.round(g / c);
  b = Math.round(b / c);

  const color = getColorName(r, g, b);

  colorResult.innerHTML = "";
  fetchProducts(color);
}

async function fetchProducts(color) {
  productsContainer.innerHTML = "";

const res = await fetch(`${PRODUCTS_API}?color=${color}`);
  const products = await res.json();

  if (!products.length) {
    productsContainer.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image_url}">
      <h4>${p.name}</h4>
      <span>₹${p.discounted_price || p.price}</span>
    `;
    card.onclick = () => location.href = `product.html?id=${p.id}`;
    productsContainer.appendChild(card);
  });
}

openCameraBtn.onclick = startCamera;
switchCameraIcon.onclick = switchCamera;
captureBtn.onclick = captureImage;
searchBtn.onclick = detectColor;
