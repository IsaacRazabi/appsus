export const googleBooks = {
  getBook,
};
const newBook = "";
function getBook(bookName) {
    const API_KEY = "AIzaSyAVwqgcW7zByOElAs7-WMk5urhodR9srjQ";
    const url =` https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`

    return axios.get(url)
        .then(res=>{
            return res.data
        })
  // fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}+inauthor:${authorName}=${API_KEY}`)
  // fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`)
  // .then(books=>newBook=books)
  // .catch(err=>console.log('err',err))
}
