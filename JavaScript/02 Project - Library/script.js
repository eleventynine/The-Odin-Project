//const tableBooks = document.getElementById("table-books");
const tableBody = document.getElementById("table-body");
const newBookBtn = document.getElementById("new-book-btn");

const formContainer = document.getElementById("form-container");
const addBookBtn = document.querySelector("#book-form button[type=submit]");
const cancelBookBtn = document.querySelector("#book-form button[type=cancel]");
const bookForm = document.getElementById("book-form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

const myLibrary = [
  new Book("Harry Potter and the Deathly Hallows", "J.K. Rowling", 759, false),
  new Book("Project Hail Marry", "Andy Weir", 496, true),
  new Book("The Hobbit", "J.R.R. Tolkien", 295, true),
];

function Book(title, author, pages, read) {
  if (!new.target) {
    assert("You need to new operator to instantiate the object.");
  }

  this.uuid = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function clearLibraryTable() {
  while (tableBody.firstElementChild) {
    tableBody.removeChild(tableBody.firstElementChild);
  }
}

function displayBooks() {
  myLibrary.forEach(({ uuid, title, author, pages, read }) => {
    tableBody.innerHTML += `
    <tr id="${uuid}">
      <td>${title}</td>
      <td>${author}</td>
      <td>${pages}</td>
      <td>${read}</td>
      <td>
        <button onclick="toggleRead(this)" data-uuid="${uuid}">Toggle Read</button>
      </td>
      <td>
        <button onclick="removeBook(this)" data-uuid="${uuid}">Remove</button>
      </td>

    </tr>
    `;
  });
}

displayBooks();

const removeBook = (el) => {
  // remove from html table
  const bookRow = document.getElementById(`${el.dataset.uuid}`);
  tableBody.removeChild(bookRow);

  // remove from array
  let index = 0;
  for (; index < myLibrary.length; index++) {
    if (myLibrary[index].uuid === el.dataset.uuid) {
      break;
    }
  }
  myLibrary.splice(index, 1);
};

const toggleRead = (el) => {
  // Update the array
  const book = myLibrary.find((item) => {
    return item.uuid === el.dataset.uuid;
  });

  book.toggleRead();

  // Update the HTML table
  clearLibraryTable();
  displayBooks();
};

newBookBtn.addEventListener("click", (event) => {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.value = "";
  formContainer.showModal();
});

addBookBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (!bookForm.checkValidity()) {
    bookForm.reportValidity();
    return;
  }

  addBookToLibrary(title.value, author.value, pages.value, read.value);
  clearLibraryTable();
  displayBooks();
  formContainer.close();
});

cancelBookBtn.addEventListener("click", (event) => {
  event.preventDefault();
  formContainer.close();
});
