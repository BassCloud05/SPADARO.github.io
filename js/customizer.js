/* ==========================================
   SPADARO CUSTOMIZER v0.2
========================================== */

async function initCustomizer() {

    const container =
        document.getElementById("customizer-container");

    const response =
        await fetch("components/customizer.html");

    const html =
        await response.text();

    container.innerHTML = html;

    /* ===========================
       ELEMENTOS
    =========================== */

    const customizer =
        document.getElementById("customizer");

    const shirtMockup =
        document.getElementById("shirtMockup");
        const designLayer =
    document.getElementById("designLayer");

const designUpload =
    document.getElementById("designUpload");

    const openButton =
        document.getElementById("openCustomizer");

    const closeButton =
        document.getElementById("closeCustomizer");

    const whiteBtn =
        document.getElementById("whiteBtn");

    const blackBtn =
        document.getElementById("blackBtn");

    const frontBtn =
        document.getElementById("frontBtn");

    const backBtn =
        document.getElementById("backBtn");

    /* ===========================
       ESTADO DEL EDITOR
    =========================== */

    const editorState = {

    color: "white",

    view: "front",

    designX: 50,

    designY: 44,

    dragging: false

};

    /* ===========================
       MOCKUPS
    =========================== */

    const mockups = {

        white: {

            front: "assets/MOCKUP SUETER BLANCO FRONTAL.png",

            back: "assets/MOCKUP SUETER BLANCO TRASERO.png"

        },

        black: {

            front: "assets/MOCKUP SUETER NEGRO FRONTAL.png",

            back: "assets/MOCKUP SUETER NEGRO TRASERO.png"

        }

    };

    function updateMockup() {

    shirtMockup.src =
        mockups[editorState.color][editorState.view];

    whiteBtn.classList.toggle(
        "active",
        editorState.color === "white"
    );

    blackBtn.classList.toggle(
        "active",
        editorState.color === "black"
    );

    frontBtn.classList.toggle(
        "active",
        editorState.view === "front"
    );

    backBtn.classList.toggle(
        "active",
        editorState.view === "back"
    );

}

    /* ===========================
       ABRIR / CERRAR
    =========================== */

    openButton.addEventListener("click", () => {

        customizer.classList.add("active");

        document.body.style.overflow = "hidden";

    });

    closeButton.addEventListener("click", () => {

        customizer.classList.remove("active");

        document.body.style.overflow = "";

    });

    /* ===========================
       COLOR
    =========================== */

    whiteBtn.addEventListener("click", () => {

        editorState.color = "white";

        updateMockup();
       

    });

    blackBtn.addEventListener("click", () => {

        editorState.color = "black";

        updateMockup();

    });

    /* ===========================
       VISTA
    =========================== */

    frontBtn.addEventListener("click", () => {

        editorState.view = "front";

        updateMockup();

    });

    backBtn.addEventListener("click", () => {

        editorState.view = "back";

        updateMockup();

    });

    updateMockup();
let startX = 0;

let startY = 0;

designLayer.addEventListener("mousedown", (event) => {

    editorState.dragging = true;

    designLayer.style.cursor = "grabbing";

    startX = event.clientX;

    startY = event.clientY;

});

document.addEventListener("mouseup", () => {

    editorState.dragging = false;

    designLayer.style.cursor = "grab";

});

document.addEventListener("mousemove", (event) => {

    if (!editorState.dragging) return;

    const moveX =
        event.clientX - startX;

    const moveY =
        event.clientY - startY;

    editorState.designX += moveX;

    editorState.designY += moveY;

    designLayer.style.left =
        editorState.designX + "px";

    designLayer.style.top =
        editorState.designY + "px";

    startX = event.clientX;

    startY = event.clientY;

});
    designUpload.addEventListener("change", (event) => {

    console.log("1 - Change detectado");

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

        console.log("2 - Reader terminado");

        designLayer.src = e.target.result;

        designLayer.style.display = "block";

        console.log(designLayer.src);

    };

    reader.readAsDataURL(file);

});


}

window.addEventListener("load", initCustomizer);