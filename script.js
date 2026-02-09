// JS Old Version with Objects

// Exkurs: Notizblock verbessern mit Objekten / Excursus: Improving the notepad with objects

let allNotes = {
    'notes': [],
    'archivNotes': [],
    'trashNotes': [],
};

function moveNote(indexNote, startKey, destinationKey) {
    let note = allNotes[startKey].splice(indexNote, 1);
    allNotes[destinationKey].push(note[0]);

    renderAllNotes();
};

function renderAllNotes() {
    renderNotes();
    renderArchivNotes();
    renderTrashNotes();
};

// DIALOGE

const dlg = document.querySelector(".myDialog");
const archivDialog = document.querySelector(".myArchivDialog");
const trashDialog = document.querySelector(".myTrashDialog");

// LOCAL STORAGE

function saveToLocalStorage() {
    localStorage.setItem("content", JSON.stringify(allNotes.notes));
    localStorage.setItem("archivDialog", JSON.stringify(allNotes.archivNotes));
    localStorage.setItem("trashDialog", JSON.stringify(allNotes.trashNotes));
};

function getFromLocalStorage() {
    let notesLS = localStorage.getItem("content");
    let archivLS = localStorage.getItem("archivDialog");
    let trashLS = localStorage.getItem("trashDialog");

    if (notesLS) {
        allNotes.notes = JSON.parse(notesLS);
    }

    if (archivLS) {
        allNotes.archivNotes = JSON.parse(archivLS);
    }

    if (trashLS) {
        allNotes.trashNotes = JSON.parse(trashLS);
    }
};

// INIT

function init() {
    getFromLocalStorage();
    renderAllNotes();
};

// RENDER

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < allNotes.notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
};

function renderArchivNotes() {
    let archivContentRef = document.getElementById('archiv_content')
    archivContentRef.innerHTML = "";

    for (let indexArchivNote = 0; indexArchivNote < allNotes.archivNotes.length; indexArchivNote++) {
        archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
    };
};

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content')
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < allNotes.trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
};

// TEMPLATES

function getNoteTemplate(indexNote) {
    return `
    <div class="content_item">
        <h3>${allNotes.notes[indexNote].title}</h3>
        <p>${allNotes.notes[indexNote].text}</p>
        <button onclick="moveNote(${indexNote},'notes', 'archivNotes')">🗂️</button>
        <button onclick="moveNote(${indexNote},'notes', 'trashNotes')">❌ -> 🗑️</button>
    </div>`;
};

function getArchivNoteTemplate(indexArchivNote) {
    return `
    <div class="content_item">
        <div id="archiv_content_item_the_text">
            <h3>${allNotes.archivNotes[indexArchivNote].title}</h3>
            <p>${allNotes.archivNotes[indexArchivNote].text}</p>
        </div >
        <button onclick="moveNote(${indexArchivNote},'archivNotes', 'notes')">↩️</button>
        <button onclick="moveNote(${indexArchivNote},'archivNotes', 'trashNotes')">❌ -> 🗑️</button>
    </div > `;
};

function getTrashNoteTemplate(indexTrashNote) {
    return `
    <div class="content_item">
        <div id="trash_content_item_the_text">
            <p>${allNotes.trashNotes[indexTrashNote].title}</p>
            <p>${allNotes.trashNotes[indexTrashNote].text}</p>
        </div>
        <button onclick="moveNote(${indexTrashNote},'trashNotes', 'notes')">↩️</button>
        <button onclick="moveNote(${indexTrashNote},'trashNotes', 'archivNotes')">🗑️</button>
    </div > `;
};

// ADD NOTE

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
            return; // User will Titel schreiben -> abbrechen   
        }
    }

    // Ist die Function zu lang bzw. Bis 14 Zeilen!?!?

    allNotes.notes.push({
        title: title,
        text: text
    });

    let inputTitelRef = document.getElementById('new_title_for_the_note_or_task');
    let inputTextRef = document.getElementById('new_note_or_task');

    saveToLocalStorage();
    renderNotes();
    titleRef.value = ""
    textRef.value = ""
};

// DIALOG CONTROL

function showDialog() {
    if (!dlg) {
        console.error("Dialog element not found!");
        return;
    }
    dlg.showModal();
};

function closeDialog() {
    if (!dlg) {
        console.error("Dialog element not found!");
        return;
    }
    dlg.close();
};

function closeArchivDialog() {
    if (!archivDialog) {
        console.error("Dialog element not found!");
        return;
    }
    archivDialog.close();
};

function showArchivDialog() {
    if (!archivDialog) {
        console.error("Dialog element not found!");
        return;
    }
    archivDialog.showModal();
};

function closeTrashDialog() {
    if (!trashDialog) {
        console.error("Dialog element not found!");
        return;
    }
    trashDialog.close();
};

function showTrashDialog() {
    if (!trashDialog) {
        console.error("Dialog element not found!");
        return;
    }
    trashDialog.showModal();
};