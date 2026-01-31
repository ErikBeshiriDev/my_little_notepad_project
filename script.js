let notes = [];
let archiveNotes = [];
let trashNotes = [];

const dlg = document.querySelector(".myDialog");
const archiveDialog = document.querySelector(".myArchiveDialog");
const trashDialog = document.querySelector(".myTrashDialog");

let myCat = Mumpi

// ------------------------------------------------------------------------------------------------
function saveData() {
    let inputRef = document.getElementById('data_input');

    if (inputRef.value != "") {
        myData.push(inputRef.value);
    }

    saveToLocalStorage();

    render();
    inputRef.value = "";
}


function saveToLocalStorage() {
    localStorage.setItem("content", JSON.stringify(notes));
    localStorage.setItem("myArchiveDialog", JSON.stringify(archiveNotes));
    localStorage.setItem("myTrashDialog", JSON.stringify(trashNotes));
}


// function getFromLocalStorage() {
//     let cat = localStorage.getItem("myData");
//     let obj = JSON.parse(cat);
//     console.log(obj);
// }


function getFromLocalStorage() {
    let cat = localStorage.getItem("myData");
    let obj = JSON.parse(cat);
    console.log(obj);
}


function render() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let index = 0; index < myData.length; index++) {
        contentRef.innerHTML += `<p>${myData[index]}</p>`
    }
}
// ------------------------------------------------------------------------------------------------

function init() {
    // localStorage.setItem("myCat", "Waldemar");

    console.log(myData);
    console.log(JSON.stringify(myData));    
    saveToLocalStorage();   
    getFromLocalStorange();
    renderNotes();
    renderTrashNotes();
    renderArchiveNotes();
}

function renderNotes() {
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

function getNoteTemplate(indexNote) {
    return `
    <div class="content_item">
        <h3>${notes[indexNote].title}</h3>
        <p>${notes[indexNote].text}</p>
        <button onclick="noteToArchive(${indexNote})">🗂️</button>
        <button onclick="noteFromNotesToTrash(${indexNote})">❌ -> 🗑️</button>
    </div>`;
}

// {/* <button onclick="noteToArchive(${indexNote})">🗂️</button> */}

function getArchiveNoteTemplate(indexArchiveNote) {
    return `
    <div class="content_item">
        <div id="archive_content_item_the_text">
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
            <p>${trashNotes[indexTrashNote]}</p>
        </div>
        <button onclick="pushNoteFromTrashBackToTheAnotherNotes(${indexTrashNote})">↩️</button>
        <button onclick="deleteTrashNote(${indexTrashNote})">🗑️</button>
    </div > `;
}

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

    notes.push({
        title: title,
        text: text
    });

    renderNotes();
    titleRef.value = ""
    textRef.value = ""
}



function noteToArchive(indexNote) {
    let toArchiveNote = notes.splice(indexNote, 1)[0];
    archiveNotes.push(toArchiveNote);
    renderNotes();
    console.log("Fehler 1 ist unten");
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
    console.log("Fehler 2 ist unten");
    renderTrashNotes();
}

function deleteTrashNote(indexTrashNote) {
    indexNote = indexTrashNote;
    trashNotes.splice(indexTrashNote, 1);
    renderTrashNotes();
}

// function toggleOverlay() {
//     let refOverlay = document.getElementById('myOverlayDialog');
//     init();

//     refOverlay.classList.toggle('dialog_hidden');
// }

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

function closeArchiveDialog() {
    if (!archiveDialog) {
        console.error("Dialog element not found!");
        return;
    }
    archiveDialog.close();
}

function showArchiveDialog() {
    if (!archiveDialog) {
        console.error("Dialog element not found!");
        return;
    }
    archiveDialog.showModal();
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





