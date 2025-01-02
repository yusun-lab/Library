const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

function toggleBookReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    render();
}

function render() {
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = ""; // clear the existing books
    for (let i=0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookEl = document.createElement("div");
        bookEl.setAttribute("class", "book-card");
        bookEl.innerHTML = `
            <div class="card-header">
                <h3 class="title">${book.title}</h3>
                <h5 class="author">by ${book.author}</h5>
            <div>
            <div class="card-body">
                <p>${book.pages} pages</p>
                <p class="read-status">${book.read ? "Read" : "Not Read Yet"}</p>
                <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
                <button class="toggle" onclick="toggleBookReadStatus(${i})">Toggle Read</button>
            </div>
        `;
        libraryEl.appendChild(bookEl);
    }
}

function removeBook(index) {    
    myLibrary.splice(index, 1);
    render();
}

function addBookToLibrary() {
  // do stuff here
  let title = document.querySelector("#title").value;
  let author = document.getElementById("author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.getElementById("read").checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  render();
}

let newBookBtn = document.querySelector("#new-book-btn");
newBookBtn.addEventListener("click", function() {
    let newBookForm = document.querySelector("#new-book-form");    
    newBookForm.style.display = "block";
})

document.querySelector("#new-book-form").addEventListener("submit", function(e) {
    e.preventDefault(); // submit by default tries to submit to the backend, since we haven't a backend yet
    addBookToLibrary();
})