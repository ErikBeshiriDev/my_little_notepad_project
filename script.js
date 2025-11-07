let notesTitles = [];
let notes = [];

let trashNotesTitles = [];
let trashNotes = [];


function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content')
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

function getNoteTemplate(indexNote) {
    return `<p>+ <title: ${notesTitles[indexNote]}
    <button onclick="noteToTrash(${indexNote})"> 🗑️ Paper Bin
    ${notes[indexNote]} X</button>
    </p>`;  
}

function getTrashNoteTemplate(indexTrashNote) {
    return `<p>+ title: ${trashNotesTitles[indexTrashNote]}
    <button onclick="deleteTrashNote(${indexTrashNote})">
    ${indexTrashNote} x</button>
    </p>`
}

function addNote() {
    let noteInputRef = document.getElementById('new_note_or_task');
    let noteInput = noteInputRef.value;
    if (noteInput.trim() !== '') {
        notes.push(noteInput);
        renderNotes();
        noteInputRef.value = "";
    } else {
        alert("Please enter a note or task before adding.");
    }
}

function deleteTrashNote(indexTrashNote) {
    trashNotesTitles.splice(indexTrashNote, 1);
    trashNotes.splice(indexTrashNote, 1);
    renderTrashNotes();
}

function noteToTrash(indexNote) {
    let trashNote = notes.splice(indexNote, 1)[0];
    trashNotes.push(trashNote);
    renderNotes();
    renderTrashNotes();
}

function deleteNote(indexNote) {
    let trashNote = notes.splice(indexNote, 1);
    renderNotes();
    renderTrashNotes();
}