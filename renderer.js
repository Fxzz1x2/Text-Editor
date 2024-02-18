const { ipcRenderer } = require("electron");
const path = require("path");

window.addEventListener("DOMContentLoaded", () => {

    // adding all elements 
   
    const el = {
        createDocumentBtn: document.getElementById("create-document"),
        openDocumentBtn: document.getElementById("open-document"),
        documentName: document.getElementById("document-name"),
        documentTextArea: document.getElementById("document-textarea"),
        saveButton: document.getElementById("save-button"),
        saveConfirmBox: document.getElementById("file-saved-text")
    };

    // setting initial file content state

    let initialContent = ""; 

    el.documentTextArea.value = initialContent;

    /**
     *
     * @param {filePath} string Files current file path
     * @param {content} string Content of the file
     *
     */

    const handleDocumentChange = (filePath, content = "") => {
        el.documentName.innerHTML = path.parse(filePath).base;

        el.documentTextArea.removeAttribute("disabled");
        el.documentTextArea.value = content;
        el.documentTextArea.focus()
    }

    // create logic

    el.createDocumentBtn.addEventListener("click", () => {
        ipcRenderer.send("create-document");
    });

    ipcRenderer.on('document-created', (_, filePath) => {
        handleDocumentChange(filePath)
    })


    // open logic

    ipcRenderer.on('document-opened', (_, {filePath, content}) => {
        handleDocumentChange(filePath, content)
    })

    el.openDocumentBtn.addEventListener("click", () => {
        ipcRenderer.send("open-document")
    })

    // update content logic

    el.documentTextArea.addEventListener("input" , (e) => {
        initialContent = e.target.value
    })


    // save file logic

    el.saveButton.addEventListener("click", () => {
        ipcRenderer.send("save-document", initialContent);

        el.saveConfirmBox.style.display = "block";

        setTimeout(() => {
            el.saveConfirmBox.style.display = "none";
        }, 3000);

    }) 

})
