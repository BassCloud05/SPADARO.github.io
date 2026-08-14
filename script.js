const products = [
  {
    id: "lux",
    name: "LUX",
    price: 69900,
    image: "assets/MOCKUPS CAMISAS/LUX/BACK WHITE.jpg",
blackImage: "assets/MOCKUPS CAMISAS/LUX/BACK BLACK.jpg",
frontImage: "assets/MOCKUPS CAMISAS/LUX/FRONT WHITE.jpg",
blackFrontImage: "assets/MOCKUPS CAMISAS/LUX/FRONT BLACK.jpg",
    description: "El primer destello que rompio la oscuridad e inicio toda la creacion.",
    colors: ["Blanco", "Negro"],
    dualColor: true,
  },
  {
    id: "firmamentum",
    name: "FIRMAMENTUM",
    price: 69900,
    image: "assets/MOCKUPS CAMISAS/FIRMAMENTUM/BACK WHITE.jpg",
blackImage: "assets/MOCKUPS CAMISAS/FIRMAMENTUM/BACK BLACK.jpg",
frontImage: "assets/MOCKUPS CAMISAS/FIRMAMENTUM/FRONT WHITE.jpg",
blackFrontImage: "assets/MOCKUPS CAMISAS/FIRMAMENTUM/FRONT BLACK.jpg",
    description: "La inmensidad del cielo donde el universo comenzo a tomar forma.",
    colors: ["Blanco", "Negro"],
    dualColor: true,
  },
  {
    id: "principium",
    name: "PRINCIPIUM",
    price: 69900,
    image: "assets/MOCKUPS CAMISAS/PRINCIPIUM/BACK WHITE.jpg",
blackImage: "assets/MOCKUPS CAMISAS/PRINCIPIUM/BACK BLACK.jpg",
frontImage: "assets/MOCKUPS CAMISAS/PRINCIPIUM/FRONT WHITE.jpg",
blackFrontImage: "assets/MOCKUPS CAMISAS/PRINCIPIUM/FRONT BLACK.jpg",
    description: "El instante en que el caos encontro orden, equilibrio y proposito.",
    colors: ["Blanco", "Negro"],
    dualColor: true,
  },
  {
    id: "astra",
    name: "ASTRA",
    price: 69900,
    image: "assets/MOCKUPS CAMISAS/ASTRA/BACK WHITE.jpg",
blackImage: "assets/MOCKUPS CAMISAS/ASTRA/BACK BLACK.jpg",
frontImage: "assets/MOCKUPS CAMISAS/ASTRA/FRONT WHITE.jpg",
blackFrontImage: "assets/MOCKUPS CAMISAS/ASTRA/FRONT BLACK.jpg",
    description: "Los astros que marcaron el tiempo y guiaron la historia de la humanidad.",
    colors: ["Blanco", "Negro"],
    dualColor: true,
  },
 {
    id: "vita",
    name: "VITA",
    price: 69900,

    image: "assets/MOCKUPS CAMISAS/VITA/BACK WHITE.jpg",

    frontImage: "assets/MOCKUPS CAMISAS/VITA/FRONT WHITE.jpg",

    description: "La naturaleza florece y la creacion encuentra su primera respiracion.",

    colors: ["Blanco"],
},
  {
    id: "imago-dei",
    name: "IMAGO DEI",
    price: 69900,
    image: "assets/MOCKUPS CAMISAS/IMAGO DEI/BACK WHITE.jpg",
frontImage: "assets/MOCKUPS CAMISAS/IMAGO DEI/FRONT WHITE.jpg",
    description: "El ser humano como sintesis de arte, conocimiento y creacion.",
    colors: ["Blanco"],
  },
  {
    id: "requies",
    name: "REQUIES",
    price: 69900,
    image: "assets/MOCKUPS CAMISAS/REQUIES/BACK WHITE.jpg",
frontImage: "assets/MOCKUPS CAMISAS/REQUIES/FRONT WHITE.jpg",
    description: "El silencio que contempla una obra completa y eterna.",
    colors: ["Blanco"],
  },
];

const sizes = ["S", "M", "L", "XL"];
const cart = [];

const productGrid = document.querySelector("[data-products]");
const cartPanel = document.querySelector("[data-cart-panel]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const whatsapp = document.querySelector("[data-whatsapp]");
const overlay = document.querySelector("[data-overlay]");
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");

const money = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function setTheme() {
    document.body.classList.add("theme-dark");
}

function getProductImage(product, color, view) {
  if (view === "front") {
    return color === "Negro" && product.blackFrontImage ? product.blackFrontImage : product.frontImage;
  }

  return color === "Negro" && product.blackImage ? product.blackImage : product.image;
}

function getViewLabel(view) {
  return view === "front" ? "Vista frontal" : "Vista trasera";
}

function updateProductVisual(productId) {
  const product = products.find((item) => item.id === productId);
  const image = document.querySelector(`[data-product-image="${productId}"]`);
  const label = document.querySelector(`[data-view-label="${productId}"]`);
  const color = document.querySelector(`[data-color="${productId}"]`).value;
  const view = image.dataset.view || "back";

  image.src = getProductImage(product, color, view);
  label.textContent = getViewLabel(view);
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => {

    const initialImage =
        product.id === "firmamentum" ||
        product.id === "principium"
            ? product.blackImage
            : product.image;

    return `
        <article class="product-card">
          <div class="product-visual">
            <img data-product-image="${product.id}" data-view="back" src="${initialImage}" alt="Camisa ${product.name} de ARCHIVIO 01: CREAZIONE" loading="lazy" />
            <span class="view-label" data-view-label="${product.id}">Vista trasera</span>
           ${product.dualColor ? `
    <span class="color-label">
        BLANCO • NEGRO
    </span>
` : ""}
            <div class="slide-controls" aria-label="Cambiar vista de ${product.name}">
              <button class="slide-button" type="button" aria-label="Ver imagen anterior" data-slide="${product.id}" data-direction="-1">&lsaquo;</button>
              <button class="slide-button" type="button" aria-label="Ver imagen siguiente" data-slide="${product.id}" data-direction="1">&rsaquo;</button>
            </div>
          </div>
          <div class="product-info">
            <div class="product-title-row">
              <div>
                <h3>${product.name}</h3>

<div class="product-status" data-status="${product.id}"></div>

<p>${product.description}</p>
              </div>
              <span class="price">${money.format(product.price)}</span>
            </div>
            <div class="product-options">
              <label>
                Color
                <select data-color="${product.id}">
    ${product.colors.map((color) => `
        <option
            ${(
                (product.id === "firmamentum" || product.id === "principium") &&
                color === "Negro"
            ) || (
                product.id !== "firmamentum" &&
                product.id !== "principium" &&
                color === "Blanco"
            )
                ? "selected"
                : ""}
        >
            ${color}
        </option>
    `).join("")}
</select>
              </label>
              <label>
                Talla
                <select data-size="${product.id}">
                  ${sizes.map((size) => `<option>${size}</option>`).join("")}
                </select>
              </label>
            </div>
            <button class="button primary" type="button" data-add="${product.id}">Agregar al carrito</button>
          </div>
        </article>
            `;
      })
    .join("");
}

function renderCart() {
  cartCount.textContent = cart.length;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Tu carrito esta listo para la primera camisa.</p>';
  } else {
    cartItems.innerHTML = cart
      .map(
        (item, index) => `
          <div class="cart-item">
            <div>
              <strong>${item.name}</strong>
              <span>${item.color} | Talla ${item.size}</span>
              <span>${money.format(item.price)}</span>
            </div>
            <button class="remove-item" type="button" data-remove="${index}">Quitar</button>
          </div>
        `,
      )
      .join("");
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = money.format(total);

  const orderText = cart.length
    ? cart.map((item) => `${item.name} (${item.color}, talla ${item.size})`).join("%0A")
    : "Hola SPADARO, quiero conocer la coleccion ARCHIVIO 01: CREAZIONE.";

  whatsapp.href = `https://wa.me/573104906037?text=${encodeURIComponent(`Hola SPADARO, quiero hacer este pedido:\n${decodeURIComponent(orderText)}\nTotal estimado: ${money.format(total)}`)}`;
}

function openCart() {
  document.body.classList.add("cart-open");
  cartPanel.classList.add("open");
  overlay.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}
function animateProductToCart(button) {

    const productCard = button.closest(".product-card");

const image =
    productCard.querySelector(".product-visual img");

const cart =
    document.querySelector("[data-cart-open]");

const buttonRect =
    button.getBoundingClientRect();

    if (!image || !cart) return;

    const imageRect = {

    left: buttonRect.left,

    top: buttonRect.top,

    width: buttonRect.width,

    height: buttonRect.height

};
    const cartRect = cart.getBoundingClientRect();

    const clone = image.cloneNode(true);

    clone.classList.add("flying-product");

    clone.style.left = imageRect.left + "px";
    clone.style.top = imageRect.top + "px";
   const startSize = Math.min(imageRect.width * 0.45, 180);

clone.style.width = startSize + "px";
clone.style.height = startSize + "px";

clone.style.left =
    imageRect.left + imageRect.width / 2 - startSize / 2 + "px";

clone.style.top =
    imageRect.top + imageRect.height / 2 - startSize / 2 + "px";

    document.body.appendChild(clone);
clone.style.transform = "scale(.95)";
  const startX = imageRect.left + imageRect.width / 2;
const startY = imageRect.top + imageRect.height / 2;

const endX = cartRect.left + cartRect.width / 2;
const endY = cartRect.top + cartRect.height / 2;

// Punto de control para crear el arco
const controlX = startX + (endX - startX) * 0.5;
const controlY = Math.min(startY, endY) - 180;

const duration = 700;
const startTime = performance.now();

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function animate(now) {

    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    const p = easeOutCubic(t);

    const x =
        (1 - p) * (1 - p) * startX +
        2 * (1 - p) * p * controlX +
        p * p * endX;

    const y =
        (1 - p) * (1 - p) * startY +
        2 * (1 - p) * p * controlY +
        p * p * endY;

    clone.style.left = x + "px";
    clone.style.top = y + "px";
    const scale = 1 - (p * 0.88);
const rotate = -18 * p;

clone.style.transform =
    `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`;

clone.style.opacity = 1 - p;

   if (t < 1) {

    requestAnimationFrame(animate);

} else {

    clone.remove();

    cart.classList.remove("cart-bounce");
    cart.classList.remove("cart-flash");

    void cart.offsetWidth;

    cart.classList.add("cart-bounce");
    cart.classList.add("cart-flash");

    const count =
        document.querySelector("[data-cart-count]");

    count.classList.remove("count-pop");
    void count.offsetWidth;
    count.classList.add("count-pop");

}
}

requestAnimationFrame(animate);

}
function closeCart() {
  document.body.classList.remove("cart-open");
  cartPanel.classList.remove("open");
  overlay.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

function updateProductStatus() {

  console.log("updateProductStatus ejecutándose");

    document.querySelectorAll(".product-status").forEach(status => {

        console.log(status);
console.log(status.dataset);

const productId = status.dataset.status;

        console.log("productId:", productId);
console.log("cart:", cart);

const quantity = cart.filter(item => item.id === productId).length;

console.log("quantity:", quantity);

        if (quantity > 0) {

            status.textContent = `✓ En carrito · ${quantity}`;

            status.classList.add("active");

        } else {

            status.textContent = "";

            status.classList.remove("active");

        }

    });

}

document.addEventListener("click", (event) => {

  const addButton = event.target.closest("[data-add]");
  const removeButton = event.target.closest("[data-remove]");
  const slideButton = event.target.closest("[data-slide]");

  if (slideButton) {
    const image = document.querySelector(`[data-product-image="${slideButton.dataset.slide}"]`);
    image.dataset.view = image.dataset.view === "front" ? "back" : "front";
    updateProductVisual(slideButton.dataset.slide);
  }

  if (addButton) {
    const product = products.find((item) => item.id === addButton.dataset.add);
    const color = document.querySelector(`[data-color="${product.id}"]`).value;
    const size = document.querySelector(`[data-size="${product.id}"]`).value;

    cart.push({ ...product, color, size });
console.log(cart);
renderCart();
updateProductStatus();

animateProductToCart(addButton);
}

  if (removeButton) {
    cart.splice(Number(removeButton.dataset.remove), 1);

renderCart();
updateProductStatus();
  }
});

document.addEventListener("change", (event) => {
  const colorSelect = event.target.closest("[data-color]");

  if (!colorSelect) {
    return;
  }

  const product = products.find((item) => item.id === colorSelect.dataset.color);
  updateProductVisual(product.id);
});

document.querySelectorAll("[data-cart-open]").forEach((button) => {
  button.addEventListener("click", openCart);
});

document.querySelector("[data-cart-close]").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);


window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 16);
});

setTheme();
renderProducts();
renderCart();
updateProductStatus();
document.querySelectorAll(".product-visual img").forEach((img) => {

    img.addEventListener("mousemove", (e) => {

        const rect = img.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = "scale(1.35)";
    });

    img.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
        img.style.transformOrigin = "center center";
    });

});
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

document.addEventListener("click", (event) => {

    const image = event.target.closest("[data-product-image]");

    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("open");
  

openLightbox();
gyroButton.addEventListener("click", async () => {

    try {

        if (
            typeof window.DeviceOrientationEvent !== "undefined" &&
            typeof window.DeviceOrientationEvent.requestPermission === "function"
        ) {

            const permission =
                await window.DeviceOrientationEvent.requestPermission();

            if (permission === "granted") {

                enableGyroscope();

                localStorage.setItem("spadaro-gyro", "true");

                setTimeout(() => {

                    gyroIntro.classList.remove("show");

                }, 250);

            }

        } else {

            enableGyroscope();

localStorage.setItem("spadaro-gyro", "true");

setTimeout(() => {

    gyroIntro.classList.remove("show");

}, 250);

        }

    } catch (error) {

        console.error(error);

setTimeout(() => {

    gyroIntro.classList.remove("show");

}, 250);

    }

});

});

lightboxClose.addEventListener("click", () => {

    lightbox.classList.remove("open");

    disableGyroscope();

});

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("open");
        disableGyroscope();
    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        lightbox.classList.remove("open");
        disableGyroscope();

    }

});
const lightboxContent = document.querySelector(".lightbox-content");
const lightboxImg = document.querySelector(".lightbox-content img");

let targetX = 0;
let targetY = 0;

function animateTilt() {

   targetX += (mouseX - targetX) * 0.9;
targetY += (mouseY - targetY) * 0.9;

   const moveX = targetX * 12;
const moveY = targetY * 12;

lightboxImg.style.transform = `
translateX(${moveX}px)
translateY(${moveY}px)
scale(1.03)
perspective(1000px)
rotateX(${targetY * 2.2}deg)
rotateY(${targetX * 2.2}deg)
`;

    requestAnimationFrame(animateTilt);

}

let mouseX = 0;
let mouseY = 0;
let startBeta = null;
let startGamma = null;

lightboxContent.addEventListener("mousemove", (e) => {

    const rect = lightboxContent.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX = (x - 0.5) * 18;
mouseY = -(y - 0.5) * 18;

});

lightboxContent.addEventListener("mouseleave", () => {

    mouseX = 0;
    mouseY = 0;

});

animateTilt();
// ===== GYROSCOPE =====

let gyroEnabled = false;

function enableGyroscope() {

    if (gyroEnabled) return;

    gyroEnabled = true;

    window.addEventListener("deviceorientation", handleOrientation);

}

function disableGyroscope() {

    if (!gyroEnabled) return;

    gyroEnabled = false;

    window.removeEventListener("deviceorientation", handleOrientation);

}

function handleOrientation(event) {

    if (event.beta == null || event.gamma == null) return;

    // Calibración automática en la primera lectura
    if (startBeta === null || startGamma === null) {
        startBeta = event.beta;
        startGamma = event.gamma;
    }

    mouseX = (event.gamma - startGamma) / 3;
    mouseY = -(event.beta - startBeta) / 4.2;
    if (Math.abs(mouseX) < 0.4) mouseX = 0;
if (Math.abs(mouseY) < 0.4) mouseY = 0;

}


const gyroIntro = document.querySelector("[data-gyro-intro]");
const gyroButton = document.querySelector("[data-enable-gyro]");

const isiPhone =
    /iPhone|iPad|iPod/i.test(navigator.userAgent);

function openLightbox() {
  startBeta = null;
startGamma = null;

    // Solo para esta prueba
    localStorage.removeItem("spadaro-gyro");



    

    if (
        isiPhone &&
        !localStorage.getItem("spadaro-gyro")
    ) {

        gyroIntro.classList.add("show");
        return;

    }

    enableGyroscope();

}