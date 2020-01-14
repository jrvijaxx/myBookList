// Book CLass: Respresent a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handles UI Tasks
class UI {
    static displayBooks() {


        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));


    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const conatiner = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        conatiner.insertBefore(div, form);

        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFeilds() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: Handle Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBooks(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                book.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify('books'));

    }
}

// Event: Display Book

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book 

document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Preevent actual submit 
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in the feild', 'danger');
    } else {
        // Instatiate book
        const book = new Book(title, author, isbn);

        //Add a Book to UI
        UI.addBookToList(book);

        //Add a Book to store
        Store.addBooks(book);

        //Show success message 
        UI.showAlert('Book Added', 'success');

        //Clear feilds
        UI.clearFeilds();

    }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    //Remove book from Store
    Store.removeBook
        (e.target.parentElement.previousElementSibling.textContent);

    //Show success message 
    UI.showAlert('Book ', 'success');
});