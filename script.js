let notes = [];

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function getNoteTemplate(indexNote) {
    // return `<p>+ <title: ${notes[indexNote]}
    return `<p>
    <button onclick="deleteNote(${indexNote})">
    ${notes[indexNote]} X</button>
    </p>`;  
}

function addNote() {
    let noteInputRef = document.getElementById('new_note_or_task');
    let noteInput = noteInputRef.value;

    notes.push(noteInput);

    renderNotes();

    noteInputRef.value = "";
}

function deleteNote(indexNote) {
    let trashNote = notes.splice(indexNote, 1);
    renderNotes();
}