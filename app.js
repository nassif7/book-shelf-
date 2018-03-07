class Book {
 constructor(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
 };

 addBookToList(book){
  const list = document.getElementById('book-list');
      const row = document.createElement('tr');

      row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = '#' class = 'delete'>X</a></td>
      `;

      list.appendChild(row);
 };

 clearFields(){
  document.getElementById('title').value = ''; 
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
 };

 showAlert(message, className){
  const errorMessage = document.createElement('div');
  errorMessage.className = className;
  errorMessage.innerHTML = message;
  const parentDiv = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  parentDiv.insertBefore(errorMessage, form);

  setTimeout(function(){
        errorMessage.remove();
  }, 3000);
 };

 deleteBook(target){
  if(target = document.querySelector('.delete')) {
   target.parentElement.parentElement.remove();
  };
 };
}


// Local Storage Class
class Store {
 static getBooks() {
   let books;
   if(localStorage.getItem('books') === null) {
     books = [];
   } else {
     books = JSON.parse(localStorage.getItem('books'));
   }

   return books;
 }

 static displayBooks() {
   const books = Store.getBooks();

   books.forEach(function(book){
     const myBook  = new Book;

     myBook.addBookToList(book);
   });
 }

 static addBook(book) {
   const books = Store.getBooks();

   books.push(book);

   localStorage.setItem('books', JSON.stringify(books));
 }

 static removeBook(isbn) {
   const books = Store.getBooks();

   books.forEach(function(book, index){
    if(book.isbn === isbn) {
     books.splice(index, 1);
    }
   });

   localStorage.setItem('books', JSON.stringify(books));
 }
}

// Eventlistners
document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById('book-form').addEventListener('submit', function(e){
 const title = document.getElementById('title').value,
       author = document.getElementById('author').value,
       isbn = document.getElementById('isbn').value
 const book = new Book(title, author, isbn);

 if(title === '' || author === '' || isbn === '') {
   book.showAlert('Please fill in all fields', 'error');
 } else {
   book.addBookToList(book);
   Store.addBook(book);
   book.showAlert('Book Added!', 'success');
   book.clearFields();
 }

 e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e){
 const book = new Book();

 book.deleteBook(e.target);
 Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
 book.showAlert('Book Removed!', 'success');

 e.preventDefault();
});