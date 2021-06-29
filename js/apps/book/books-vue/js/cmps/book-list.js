import bookPreview from './book-preview.js';
// responsible for delivering a list book


export default {
    props: ['books'],
    template: `
    <ul class="book-list">
    <li v-for="book in books" :key="book.id" class="book-preview-container">
            <router-link :to="'/book/'+book.id">
        <button @click.prevent="remove(book.id)">✖</button>
        <book-preview :book="book"  />
    </router-link>
</li>
    </ul>
    `,
    methods: {
        remove(bookId) {

            this.$emit('remove', bookId);
        },
        select(book) {
            this.$emit('selected', book);
        },
    },
    components: {
        bookPreview
    }

};

