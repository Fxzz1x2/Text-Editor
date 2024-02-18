const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    const el = {
        createDocumentBtn: document.getElementById("create-document")
    };

    el.createDocumentBtn.addEventListener("click", () => {
        ipcRenderer.send("create-document");
    })
})
