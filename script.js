let notesTitles = [];
let notes = [];

let archiveNotesTitles = [];
let archiveNotes = [];

let trashNotesTitles = [];
let trashNotes = [];

function init(  ) {
    renderNotes();
    renderTrashNotes();
    renderArchiveNotes();
}

function renderNotes(indexNote) {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function renderArchiveNotes(indexArchiveNotes) {
    let archiveContentRef = document.getElementById('archive_content')
    archiveContentRef.innerHTML = "";

    for (let indexArchiveNote = 0; indexArchiveNote < archiveNotes.length; indexArchiveNote++) {
        archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
    }
}

function renderTrashNotes(indexTrashNote) {
    let trashContentRef = document.getElementById('trash_content')
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

function saveTitle(indexNote, newTitle) {
    notesTitles[indexNote] = String(newTitle || "").trim();
    renderNotes();
}

function getNoteTemplate(indexNote) {
    return `
    <div class="content_item">
        <div id="content_item_the_text">
            <div class="item-header">
                <span class="item-title" contenteditable="true"
                    onblur="saveTitle(${indexNote}, this.innerText)">
                  ${notesTitles[indexNote] || 'Titel...'}
                </span>
            </div>
            <p>${notes[indexNote]}</p>
        </div>
        <button onclick="noteToArchive(${indexNote})">🗂️</button>
        <button onclick="noteFromNotesToTrash(${indexNote})">❌ -> 🗑️</button>
    </div>`;
}

// {/* <button onclick="noteToArchive(${indexNote})">🗂️</button> */}

function getArchiveNoteTemplate(indexArchiveNote) {
    return `
    <div class="content_item">
        <div id="archive_content_item_the_text">
            <div class="item-header">
                <span class="item-title" contenteditable="true"
                    onblur="saveTitle(${indexArchiveNote}, this.innerText) ">
                  ${ archiveNotesTitles[indexArchiveNote] || 'Titel...' }
                </span >
            </div >
    <p>${archiveNotes[indexArchiveNote]}</p>
        </div >
        <button onclick="pushNoteFromArchiveBackToTheAnotherNotes(${indexArchiveNote})">↩️</button>
        <button onclick="noteFromArchiveToTrash(${indexArchiveNote})">❌ -> 🗑️</button>
    </div > `;
}

function getTrashNoteTemplate(indexTrashNote) {
    return `
    <div class="content_item">
        <div id="trash_content_item_the_text">
            <div class="item-header">
                <span class="item-title" contenteditable="true"
                    onblur="saveTitle(${indexTrashNote}, this.innerText)">
                  ${trashNotesTitles[indexTrashNote] || 'Titel...'}
                </span>
            </div>
            <p>${trashNotes[indexTrashNote]}</p>
        </div>
        <button onclick="pushNoteFromTrashBackToTheAnotherNotes(${indexTrashNote})">↩️</button>
        <button onclick="deleteTrashNote(${indexTrashNote})">🗑️</button>
    </div > `;
}

function addNote() {
    let noteInputRef = document.getElementById('new_note_or_task');
    let noteInput = noteInputRef ? noteInputRef.value : "";
    if (noteInput.trim() !== '') {
        notes.push(noteInput.trim());
        notesTitles.push('');
        renderNotes();
        noteInputRef.value = "";
    } else {
        alert("Please enter a note or task before adding.");
    }
}

function noteToArchive(indexNote, newTitle) {
    let toArchiveNote = notes.splice(indexNote, 1)[0];
    archiveNotes.push(toArchiveNote);
    renderNotes();
    renderArchiveNotes();
}

function pushNoteFromArchiveBackToTheAnotherNotes(indexArchiveNote) {
    let sendNoteBackToTheAnotherNotes = archiveNotes.splice(indexArchiveNote, 1)[0];
    notes.push(sendNoteBackToTheAnotherNotes);
    renderNotes();
    renderArchiveNotes();
}

function pushNoteFromTrashBackToTheAnotherNotes(indexTrashNote) {
    let restoreNotetoTrash = trashNotes.splice(indexTrashNote, 1)[0];
    notes.push(restoreNotetoTrash);
    renderNotes();
    renderTrashNotes();
}

function noteFromArchiveToTrash(indexArchiveNote) {
    let trashNoteFromArchive = archiveNotes.splice(indexArchiveNote, 1)[0];
    trashNotes.push(trashNoteFromArchive);
    renderArchiveNotes();
    renderTrashNotes();
}

function noteFromNotesToTrash(indexNote) {
    let trashNoteFromNotes = notes.splice(indexNote, 1)[0];
    trashNotes.push(trashNoteFromNotes);
    renderNotes();
    renderTrashNotes();
}

function deleteTrashNote(indexTrashNote) {
    indexNote = indexTrashNote;
    trashNotesTitles.splice(indexTrashNote, 1);
    trashNotes.splice(indexTrashNote, 1);
    renderTrashNotes();
}

// Tile from the Notes:

// function deleteNote(indexNote) {
//     notes.splice(indexNote, 1);
//     notesTitles.splice(indexNote, 1);
//     renderNotes();
//     renderTrashNotes();
// }