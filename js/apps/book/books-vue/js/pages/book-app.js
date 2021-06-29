import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.js';
import bookFilter from '../cmps/book-filter.js'
import searchBook from '../cmps/search-book.js'
import {googleBooks} from '../services/google-api.js'


export default {
    template: `
                <section class="book-app app-main">
                <search-book @getNewBook="setNewBooks" @addBook="addNewBook" :newBooks="newBooks"></search-book>
                <book-filter @filtered="setFilter"> </book-filter>
                 <book-list  :books="booksToShow" @remove="removeBook"></book-list>
                </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
            newBooks:[],
        }
    },
    created() {
        this.loadBooks();
    },
    methods: {
        loadBooks() {
           bookService.query()
                .then(books => this.books = books);
        }, 
        removeBook(bookId) {
           bookService.removeBook(bookId)
                .then(() => this.loadBooks())
        },
        setFilter(filterBy) {
            this.filterBy =filterBy
        },
        isFilterEmpty() {
            return !this.filterBy || (!this.filterBy.title && !this.filterBy.minPrice && this.filterBy.maxPrice === Infinity);
        },
        setNewBooks(bookName){
           googleBooks.getBook(bookName)
            .then(books=>{
                this.newBooks = books
            })
        },
        addNewBook(book){
            bookService.addBook(book);
            this.loadBooks()
        }
    },
    computed: {
        booksToShow() {
            if (this.isFilterEmpty()) return this.books;
            const searchStr = this.filterBy.title.toLowerCase();
            const booksToShow = this.books.filter(book => {
                var bookPrice = book.listPrice.amount;
                return book.title.toLowerCase().includes(searchStr) &&
                    bookPrice >= this.filterBy.minPrice &&
                    bookPrice <= this.filterBy.maxPrice;
            });
            return booksToShow;
        }
    },
    components: {
        bookList,
        bookFilter,
        searchBook
    },
    // watch: {
    //     '$route.params.BookId' : {
    //         immediate: true,
    //         handler() {
    //             const { carId } = this.$route.params;
    //             carService.getById(carId)
    //                 .then(car => this.car = car);
    //             carService.getNextCarId(carId)
    //                 .then(carId => this.nextCarId = carId);
    //         },


    //     }
    // },
    
};