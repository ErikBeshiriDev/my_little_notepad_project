// JS Old Version without Objects

// STATE

let notes = [];
let archivNotes = [];
let trashNotes = [];

// DIALOGE

const dlg = document.querySelector(".myDialog");
const archivDialog = document.querySelector(".myArchivDialog");
const trashDialog = document.querySelector(".myTrashDialog");

// LOCAL STORAGE

function saveToLocalStorage() {
    localStorage.setItem("content", JSON.stringify(notes));
    localStorage.setItem("archivDialog", JSON.stringify(archivNotes));
    localStorage.setItem("trashDialog", JSON.stringify(trashNotes));
}

function getFromLocalStorage() {
    let notesLS = localStorange.getItem("content");
    let archivLS = localStorange.getItem("archivDialog");
    let trashLS = localStorange.getItem("trashDialog");

    if (notesLS) {
        notes = JSON.parse(notesLS);
    }

    if (archivLS) {
        archivNotes = JSON.parse(archivLS);
    }

    if (trashLS) {
        trashNotes = JSON.parse(trashLS);
    }
}

// INIT

function init() {
    getFromLocalStorage();
    renderNotes();
    renderArchivNotes();
    renderTrashNotes();
}

// RENDER

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function renderArchivNotes(indexArchivNotes) {
    let archivContentRef = document.getElementById('archiv_content')
    archivContentRef.innerHTML = "";

    for (let indexArchivNote = 0; indexArchivNote < archivNotes.length; indexArchivNote++) {
        archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
    }
}

function renderTrashNotes(indexTrashNote) {
    let trashContentRef = document.getElementById('trash_content')
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

// TEMPLATES

function getNoteTemplate(indexNote) {
    return `
    <div class="content_item">
        <h3>${notes[indexNote].title}</h3>
        <p>${notes[indexNote].text}</p>
        <button onclick="noteToArchiv(${indexNote})">🗂️</button>
        <button onclick="noteFromNotesToTrash(${indexNote})">❌ -> 🗑️</button>
    </div>`;
}

function getArchivNoteTemplate(indexArchivNote) {
    return `
    <div class="content_item">
        <div id="archiv_content_item_the_text">
            <h3>${archivNotes[indexArchivNote].title}</h3>
            <p>${archivNotes[indexArchivNote].text}</p>
        </div >
        <button onclick="pushNoteFromArchivBackToTheAnotherNotes(${indexArchivNote})">↩️</button>
        <button onclick="noteFromArchivToTrash(${indexArchivNote})">❌ -> 🗑️</button>
    </div > `;
}

function getTrashNoteTemplate(indexTrashNote) {
    return `
    <div class="content_item">
        <div id="trash_content_item_the_text">
            <p>${trashNotes[indexTrashNote].title}</p>
            <p>${trashNotes[indexTrashNote].text}</p>
        </div>
        <button onclick="pushNoteFromTrashBackToTheAnotherNotes(${indexTrashNote})">↩️</button>
        <button onclick="deleteTrashNote(${indexTrashNote})">🗑️</button>
    </div > `;
}

// ADD NOTE

// Ist die Funktion unten namens addNote zu lang bzw. Bis 14 Zeilen!?!?

function addNote() {

    let titleRef = document.getElementById('new_title_for_the_note_or_task');
    let textRef = document.getElementById('new_note_or_task');

    let title = titleRef.value.trim();
    let text = textRef.value.trim();

    if (text === "") {
        alert("Bitte Text eingeben");
        return;
    }

    if (title === "") {
        let wantsTitle = confirm("KeinTitel eingegeben. Willst du einen Titel schreiben?");
        if (!wantsTitle) {
            title = text.length > 10
                ? text.slice(0, 10) + "..."
                : text;
        } else {
            return;  
        }
    }

    notes.push({
        title: title,
        text: text
    });

    let inputTitelRef = document.getElementById('new_title_for_the_note_or_task');
    let inputTextRef = document.getElementById('new_note_or_task');

    saveToLocalStorage();
    renderNotes();
    titleRef.value = ""
    textRef.value = ""
}

// MOVE FUNCTIONS

function noteToArchiv(indexNote) {
    let toArchivNote = notes.splice(indexNote, 1)[0];
    archivNotes.push(toArchivNote);
    saveToLocalStorage();
    renderNotes();
    renderArchivNotes();
}

function pushNoteFromArchivBackToTheAnotherNotes(indexArchivNote) {
    let sendNoteBackToTheAnotherNotes = archivNotes.splice(indexArchivNote, 1)[0];
    notes.push(sendNoteBackToTheAnotherNotes);
    renderNotes();
    renderArchivNotes();
    saveToLocalStorage();
}

function pushNoteFromTrashBackToTheAnotherNotes(indexTrashNote) {
    let restoreNotetoTrash = trashNotes.splice(indexTrashNote, 1)[0];
    notes.push(restoreNotetoTrash);
    renderNotes();
    renderTrashNotes();
    saveToLocalStorage();
}

function noteFromArchivToTrash(indexArchivNote) {
    let trashNoteFromArchiv = archivNotes.splice(indexArchivNote, 1)[0];
    trashNotes.push(trashNoteFromArchiv);
    renderArchivNotes();
    renderTrashNotes();
    saveToLocalStorage();
}

function noteFromNotesToTrash(indexNote) {
    let trashNoteFromNotes = notes.splice(indexNote, 1)[0];
    trashNotes.push(trashNoteFromNotes);
    renderNotes();
    renderTrashNotes();
    saveToLocalStorage();
}

function deleteTrashNote(indexTrashNote) {
    trashNotes.splice(indexTrashNote, 1);
    renderTrashNotes();
    saveToLocalStorage();
}

function toggleOverlay() {
    let refOverlay = document.getElementById('myOverlayDialog');
    init();

    refOverlay.classList.toggle('dialog_hidden');
}

// DIALOG CONTROL

function showDialog() {
    if (!dlg) {
        console.error("Dialog element not found!");
        return;
    }
    dlg.showModal();
}

function closeDialog() {
    if (!dlg) {
        console.error("Dialog element not found!");
        return;
    }
    dlg.close();
}

function closeArchivDialog() {
    if (!archivDialog) {
        console.error("Dialog element not found!");
        return;
    }
    archivDialog.close();
}

function showArchivDialog() {
    if (!archivDialog) {
        console.error("Dialog element not found!");
        return;
    }
    archivDialog.showModal();
}

function closeTrashDialog() {
    if (!trashDialog) {
        console.error("Dialog element not found!");
        return;
    }
    trashDialog.close();
}

function showTrashDialog() {
    if (!trashDialog) {
        console.error("Dialog element not found!");
        return;
    }
    trashDialog.showModal();
}





