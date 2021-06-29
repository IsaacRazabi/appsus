// private function at the end

import {storageService } from './async-storage-service.js'
import {defaultBooks} from '../data/books.js'

export const bookService = {
  query,
  removeBook,
getBookById,
addReview,
removeReview,
getDeepCopy,
makeId,
getBookById,
getNextBookId,
lastBookId,
addBook
};

const BOOKS_KEY = 'booksData';
const gBooks = defaultBooks;

function query() {
  return storageService.query(BOOKS_KEY)
      .then(books => {
          if (!books.length) { //on first call or deleted all books the query function will contain empty arr.
              const initialBookList = defaultBooks;
              storageService.postMany(BOOKS_KEY, initialBookList) //push and save all new initial books we just added
              return initialBookList;
          }
          return books;
      })
}

function removeBook(bookId) {
  return storageService.remove(BOOKS_KEY, bookId);
}

// function getBookById(bookId) {
//   return storageService.get(BOOKS_KEY, bookId);
// }

function addReview(bookId, review) {
  review.id = utilitiesService.makeId();
  return getBookById(bookId).then(book => {
      if (!book.reviews) book.reviews = [];
      book.reviews.push(review);
      return storageService.put(BOOKS_KEY, book);
  })
}

function removeReview(bookId, reviewId) {
  return getBookById(bookId)
      .then(book => {
          const reviewIdx = book.reviews.findIndex(review => review.id === reviewId);
          if (reviewIdx === -1) return Promise.reject('Failed to find the review!');
          book.reviews.splice(reviewIdx, 1);
          return storageService.put(BOOKS_KEY, book);
      })
}


function getDeepCopy(obj) {
  var strObj = JSON.stringify(obj);
  return JSON.parse(strObj);
}

function makeId(length = 11) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getBookById(bookId) {
  return storageService.get(BOOKS_KEY, bookId);
}

function getNextBookId(bookId){
  return query()
  .then(books =>{
    const idx = books.findIndex(book=>book.id===bookId)
    return (idx === books.length-1)? books[0].id: books[idx+1].id
  })
}

function lastBookId (bookId){
  return query()
  .then(books=>{
    const idx = books.findIndex(book=>book.id===bookId)
    return (idx===0) ? books[books.length-1].id :books[idx-1].id
  })
}

function addBook(newBook){
  const bookToAdd = {
    title: newBook.volumeInfo.title,
    subtitle: !newBook.volumeInfo.subtitle ? 'new Book' :newBook.volumeInfo.subtitle,
    authors:  !newBook.volumeInfo. authors ? ['new Book'] : [newBook.volumeInfo. authors],
    publishedDate:  !newBook.volumeInfo. publishedDate ? 'new Book' : newBook.volumeInfo.publishedDate,
    description : !newBook.volumeInfo. description ? 'new Book' : newBook.volumeInfo.description,
    pageCount : !newBook.volumeInfo. pageCount ? 'new Book' : newBook.volumeInfo.pageCount,  
    categories: !newBook.volumeInfo. categories? ['new Book'] : [newBook.volumeInfo.categories],  
    thumbnail : !newBook.volumeInfo.imageLinks.smallThumbnail ? 'no photo yet' : newBook.volumeInfo.imageLinks.smallThumbnail,
    language :  !newBook.volumeInfo. language ? 'no photo yet' : newBook.volumeInfo.language,
    listPrice: {
          amount: 109,
          currencyCode: "EUR",
          isOnSale: false
      },
  }
  storageService.post(BOOKS_KEY, bookToAdd)
} 

