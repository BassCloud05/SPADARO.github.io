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

        view: "front"

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