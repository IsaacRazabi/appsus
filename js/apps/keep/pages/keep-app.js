import { keepService } from '../services/keep-service.js';
import keepList from '../cmps/keep-list.js';
import keepFilter from '../cmps/keep-filter.js';
import keepEdit from '../cmps/keep-edit.js';
import keepAdd from '../cmps/keep-add.js';
// import carDetails from '../pages/keep-details.js';

export default {
    template: `
        <section class="keep-app">
            <keep-filter @filtered="setFilter" /><br/>
            <keep-add v-if="!toEdit"/>
            <keep-edit v-else :editNote="toEdit" @reset="toReset"/>
            <keep-List 
            :note="notesToShow" 
            @remove="removeNote" 
            @toEditNote2="editNote" 
            @tpin="toPin"/>
            <!-- <pre>{{note}}</pre> -->
        </section>
    `,
    data() {
        return {
            note: keepService.query(),
            selectedNote: null,
            filterBy: null,
            toEdit: null,
            isEditing: false,
        };
    },
    methods: {
        removeNote(id) {
            console.log(id, 'Delited');
            keepService.remove(id);
        },
        selectNote(note) {
            this.selectedNote = note;
        },
        closeDetails() {
            this.selectedNote = null;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        editNote(noteId) {
            console.log('noteId:', noteId);
            this.toEdit = keepService.getNoteById(noteId);
            console.log('this.toEdit:', this.toEdit);
            this.isEditing = true;
            //GET THE NOTE BY ID AND MOVE TO EDIT
        },
        toReset() {
            this.toEdit = null;
            this.isEditing = false;
            console.log('toReset:', this.toEdit);

        },
        toPin(noteId){
            
        },
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.note;
            const searchStr = this.filterBy.txt.toLowerCase();
            const notesToShow = this.note.filter(note => {
                return note.txt.toLowerCase().includes(searchStr);
            });
            return notesToShow;
        }
    },
    components: {
        keepList,
        keepFilter,
        keepEdit,
        keepAdd,
    }
};
