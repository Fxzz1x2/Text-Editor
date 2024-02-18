const { ipcRenderer } = require("electron");
const path = require("path");

window.addEventListener("DOMContentLoaded", () => {
    const el = {
        createDocumentBtn: document.getElementById("create-document"),
        openDocumentBtn: document.getElementById("open-document"),
        documentName: document.getElementById("documentName"),
        documentTextArea: document.getElementById("documentTextArea")
    };

    const handleDocumentChange = (filePath, content = "") => {
        el.documentName.innerHTML = path.parse(filePath).base;

        el.documentTextArea.removeAttribute("disabled");
        el.documentTextArea.value = content;
        el.documentTextArea.focus()
    }

    el.createDocumentBtn.addEventListener("click", () => {
        ipcRenderer.send("create-document");
    });

    el.openDocumentBtn.addEventListener("click", () => {
        ipcRenderer.send("open-document")
    })

    ipcRenderer.on('document-created', (_, filePath) => {
        handleDocumentChange(filePath)
    })

    ipcRenderer.on('document-opened', (_, {filePath, content}) => {
        handleDocumentChange(filePath, content)
    })

})
