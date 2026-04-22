const myLibrary = [];

function Book(title, author, pages) {
  if (!new.target) {
    assert("You need to new operator to instantiate the object.");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
  myLibrary.push(new Book(title, author, pages));
}
