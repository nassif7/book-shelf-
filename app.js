// Book constructor

function Book(title, author, isbn) {
this.title = title;
this.author = author;
this.isbn = isbn;
}


// UI constructor

function UI() {

}

UI.prototype.addBookToList = function(book) {
 console.log(book);
}


// Event listeners 
document.getElementById('book-form').addEventListener('submit',
function(e){
 // Form values 
 const title = document.getElementById('title').value, 
       author = document.getElementById('author').value,
       isbn = document.getElementById('isbn').value;

  
  const book = new Book(title, author, isbn);

  const ui = new UI();

 e.preventDefault();
})