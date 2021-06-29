import { eventBus } from "../services/event-bus-service.js";

export default {
  props: ['newBooks'],
  template: `
    <section class="searchGoogle">
    <label for=""> search and add new books </label>
    
 <input v-model="bookName" type="text"/> 
<p  v-for="book in newBooks.items" :key="book.id" > {{book.volumeInfo.title}} <button v-on:click="addBook(book)">+</button> </p>
 <button v-on:click="search">search </button>

</section>
    `,
  data() {
    return {
      bookName: "",
    };
  },
  methods: {
    search() {
      this.$emit("getNewBook", this.bookName);
    },
    addBook(book){
      this.$emit('addBook', book)
    }
  },
  components: {},
};
