import { utilService } from './util-service.js';
// import { storageService } from '../services/async-storage-service';

const NOTE_KEY = 'Keep';
const gNote = creatNots();

export const keepService = {
    query,
    remove,
    save,
    getEmptyNote,
    getNoteById,
    creatNoteTXT,
    creatNoteIMG,
};


function query() {
    return gNote;
}


function remove(noteId) {
    const idx = gNote.findIndex(keep => keep.id === noteId);
    gNote.splice(idx, 1);
    utilService.saveToStorage(NOTE_KEY, gNote);
}


function save(note) {
    if (!note.txt) return console.log('The save process is not approved');
    note.id = utilService.makeId();
    gNote.unshift(note);
    utilService.saveToStorage(NOTE_KEY, gNote);
}

function creatNoteTXT(txt, title = '',) {
    const noteText = {
        id: utilService.makeId(),
        type: 'noteText',
        isPinned: false,
        title,
        txt,
    };
    return noteText;
}

function creatNoteIMG(url, title = '',) {
    const noteText = {
        id: utilService.makeId(),
        type: 'noteImage',
        isPinned: false,
        title,
        url,
    };
    return noteText;
}


function creatNots() {
    let notes = utilService.loadFromStorage(NOTE_KEY);
    if (!notes || !notes.length) {
        notes = [];
        notes.push(creatNoteTXT('Made glorious summer by this sun of York;', 'HELLO'));
        notes.push(creatNoteTXT('Now are our brows bound with victorious wreaths','new Title'));
        notes.push(creatNoteTXT('To the lascivious pleasing of a lute.', 'TESTING'));
        notes.push(creatNoteTXT('night and the castanets and the night we missed the boat '));
        notes.push(creatNoteIMG('https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg','my image'));
        notes.push(creatNoteTXT('To the lascivious pleasing of a lute.', 'LALAL'));
        notes.push(creatNoteTXT('night and the castanets and the night we missed the boat '));
        utilService.saveToStorage(NOTE_KEY, notes);
    }
    return notes;
}

function getEmptyNote() {
    return {
        id: utilService.makeId(),
        type: 'noteText',
        isPinned: false,
        title: '',
        txt: '',
    };
}

function getNoteById(noteId){
    return gNote.find(note => note.id === noteId);
}