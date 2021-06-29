import {keepService} from '../services/keep-service.js';

export default{
    props: ['editNote'],
    template: `<section class="keep-edit">
                    <!-- <p>Keep edit</p> -->
                    <!-- {{this.note}}***{{noteToChange}} -->
                    <span>Keep Edit:</span>
                    <form @submit.prevent="save">
                        <label for="focus-title-edit">Title:</label>
                        <input v-model="noteToEdit.title" id="focus-title-edit" type="text">
                        <label for="focus-text-edit">Text:</label>
                        <input v-model="noteToEdit.txt" id="focus-text-edit" type="text">
                        <label for="type">Choose a type:</label>
                            <select name="type-nots">
                                <option value="text">Text</option>
                                <option value="img">Images</option>
                            </select>
                        <button>✔</button>
                        <!-- <pre>{{noteToEdit}}</pre> -->
                    </form>
                </section>`,

    data(){
        return{
            noteToEdit: null,
            // noteToChange: get,
            // noteToEdit: null,
        }
    },
    created(){
        this.noteToEdit=this.editNote;
        console.log('this.noteToEdit:',this.noteToEdit);
    },
    destroyed(){
        this.noteToEdit=null;
        console.log('this.noteToEdit:',this.noteToEdit);
    },
    methods: {
        save(){
            keepService.getNoteById()
            keepService.save(this.noteToEdit);
            if (!this.noteToEdit.txt) return console.log('Missing text content!')
            this.noteToEdit = keepService.getEmptyNote();
            console.log('A confirmation has been made, the note is created and saved');
            this.$emit('reset');
        },
        edit(){
            if (!note) this.noteToEdit= keepService.getEmptyNote();
            else this.noteToEdit=editNote;
        }
    },
    computed:{

    },
}