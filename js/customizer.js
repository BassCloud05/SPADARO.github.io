/* ==========================================
   SPADARO CUSTOMIZER v0.1
========================================== */

async function initCustomizer() {

    const container =
        document.getElementById("customizer-container");

    const response =
        await fetch("components/customizer.html");

    const html =
        await response.text();

    container.innerHTML = html;

    const customizer =
        document.getElementById("customizer");

    const openButton =
        document.getElementById("openCustomizer");

    const closeButton =
        document.getElementById("closeCustomizer");

    openButton.addEventListener("click", () => {

        customizer.classList.add("active");

        document.body.style.overflow = "hidden";

    });

    closeButton.addEventListener("click", () => {

        customizer.classList.remove("active");

        document.body.style.overflow = "";

    });

}

window.addEventListener("load", initCustomizer);