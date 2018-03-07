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

UI.prototype.clearFields = function() {
      document.getElementById('title').value = ''; 
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
};

UI.prototype.showAlert = function(message, className) {
      const errorMessage = document.createElement('div');
      errorMessage.className = className;
      errorMessage.innerHTML = message;
      const parentDiv = document.querySelector('.container');
      const form = document.querySelector('#book-form');

      parentDiv.insertBefore(errorMessage, form);

      setTimeout(function(){
            errorMessage.remove();
      }, 3000);

      // document.getElementsByTagName('body').appendChild(errorMessage);
};

UI.prototype.deleteBook = function(target) {
      if(target = document.querySelector('.delete')) {
            target.parentElement.parentElement.remove();
      }
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

      if(title === '' || author === '' || isbn === ''){
            ui.showAlert('Please fill all fields','error')
      } else {
            ui.addBookToList(book);
            ui.clearFields();
            ui.showAlert('Book Added','success');
      }

      console.log(ui);
      console.log(book);
      e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e){
      ui = new UI();

      ui.deleteBook(e.target);
      ui.showAlert('Book Removed', 'success');
      e.preventDefault();
});