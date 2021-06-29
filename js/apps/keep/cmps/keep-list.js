import keepPreview from './keep-preview.js';

export default {
    props: ['note','isEditing'],
    template: `<ul class="keep-list">
                <li v-for="note in note" :key="note.id" class="keep-preview-container">
                    <keep-preview :note="note"/>
                    <div class="actions">
                    <button @click="pinned(note.id)">📌</button>
                    <button @click="edit(note.id)">🖌</button>
                    <button>📧</button>
                    <button @click="remove(note.id)">❌</button>
                    </div>
                </li>
            </ul>`,
    methods: {
        remove(noteId) {
            console.log('delete in process..');
            this.$emit('remove', noteId);
        },
        select(note) {
            this.$emit('selected', note);
        },
        log(noteId) {
            console.log('logging the id', noteId);
        },
        edit(noteId){
            // if (!this.isEditing) return console.log('editing in process...',this.isEditing);
            console.log('to edit..');
            this.$emit('toEditNote2', noteId);
            console.log('delete in process..');
            this.$emit('remove', noteId);
        },
        pinned(noteId){
            console.log('pinned..');
            this.$emit('pin', noteId);
        },
    },
    components: {
        keepPreview
    }

};