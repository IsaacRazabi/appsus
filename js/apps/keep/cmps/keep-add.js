import {keepService} from '../services/keep-service.js';

export default{
    template: `<section class="keep-edit">
                    <span>Keep add:</span>
                    <form @submit.prevent="save">
                        <label for="focus-title-add">Title:</label>
                        <input v-model="noteToAdd.title" id="focus-title-add" type="text">
                        <label for="focus-text-add">Text:</label>
                        <input v-model="noteToAdd.txt" id="focus-text-add" type="text">
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
            noteToAdd: keepService.creatNoteTXT(),
            
        }
    },
    methods: {
        save(){
            keepService.save(this.noteToAdd);
            if (!this.noteToAdd.txt) return console.log('Missing text content!')
            this.noteToAdd = keepService.creatNoteTXT();
            console.log('A confirmation has been made, the note is created and saved');
        },
    },
        
}