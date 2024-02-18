const { ipcRenderer } = require("electron");
const path = require("path");

window.addEventListener("DOMContentLoaded", () => {
    const el = {
        createDocumentBtn: document.getElementById("create-document"),
        documentName: document.getElementById("documentName"),
        documentTextArea: document.getElementById("documentTextArea")
    };

    el.createDocumentBtn.addEventListener("click", () => {
        ipcRenderer.send("create-document");
    });

    ipcRenderer.on('document-created', (_, filePath) => {
        el.documentName.innerHTML = path.parse(filePath).base;

        el.documentTextArea.removeAttribute("disabled");
        el.documentTextArea.value = "";
        el.documentTextArea.focus()
    })
})
