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
    const designWrapper =
    document.getElementById("designWrapper");    
        const designLayer =
    document.getElementById("designLayer");
    const designBox =
    document.getElementById("designBox");

const resizeHandle =
    document.getElementById("resizeHandle");

    designLayer.draggable = false;

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

    designX: 0,

    designY: 0,

    scale: 1,

    rotation: 0,

    dragging: false,

    resizing: false,

    dragStartX: 0,

    dragStartY: 0

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

    function updateDesignTransform() {

    designWrapper.style.transform = `
    translate(
        calc(-50% + ${editorState.designX}px),
        calc(-50% + ${editorState.designY}px)
    )
`;

designLayer.style.transform = `
    scale(${editorState.scale})
    rotate(${editorState.rotation}deg)
`;

}


    function updateMockup() {

    shirtMockup.src =
        mockups[editorState.color][editorState.view];
    
    const previewStage =
    document.querySelector(".preview-stage");

if (editorState.color === "black") {

    previewStage.style.background = "#F3F2EF";

    previewStage.style.boxShadow =
        "0 20px 60px rgba(0,0,0,.12)";

} else {

    previewStage.style.background = "transparent";

    previewStage.style.boxShadow = "none";

}

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



designLayer.style.cursor = "grab";
designLayer.addEventListener("pointerdown", (e) => {

    e.preventDefault();
    e.stopPropagation();

    editorState.dragging = true;

    startX = e.clientX;
    startY = e.clientY;

    designLayer.style.cursor = "grabbing";

});

    designUpload.addEventListener("change", (event) => {

    console.log("1 - Change detectado");

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

    designLayer.src = e.target.result;

designWrapper.style.display = "block";
designLayer.style.display = "block";
designBox.style.display = "block";

    editorState.designX = 0;
    editorState.designY = 0;
    editorState.scale = 1;
    editorState.rotation = 0;

    designLayer.style.left = "50%";
    designLayer.style.top = "44%";

    updateDesignTransform();

};

reader.readAsDataURL(file);

});

// ============================
// ARRASTRAR DISEÑO
// ============================

window.addEventListener("pointermove", (e) => {

    if (!editorState.dragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    editorState.designX += dx;
    editorState.designY += dy;

    startX = e.clientX;
    startY = e.clientY;

    updateDesignTransform();

});

window.addEventListener("pointerup", () => {

    editorState.dragging = false;

    designLayer.style.cursor = "grab";

});

}

window.addEventListener("load", initCustomizer);