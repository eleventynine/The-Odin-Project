function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You need to new operator to instantiate the object.");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead ? "finished reading" : "not read yet"}`;
  };
}

Book.prototype.getPages = function () {
  return this.pages;
};

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

console.log(theHobbit.info());
console.log(theHobbit.getPages());

console.log(
  "Object.getPrototypeOf(theHobbit)",
  Object.getPrototypeOf(theHobbit)
);
console.log(
  "Object.getPrototypeOf(theHobbit) === Book.prototype",
  Object.getPrototypeOf(theHobbit) === Book.prototype
);
console.log("Object.getPrototypeOf(Book)", Object.getPrototypeOf(Book));
console.log(
  "Object.getPrototypeOf(Book.prototype)",
  Object.getPrototypeOf(Book.prototype)
);
console.log(
  "Object.getPrototypeOf(Book.prototype) === Object.prototype",
  Object.getPrototypeOf(Book.prototype) === Object.prototype
);
console.log(
  "Object.getPrototypeOf(Object.prototype)",
  Object.getPrototypeOf(Object.prototype)
);

console.log("theHobbit.valueOf()", theHobbit.valueOf());

console.log(
  'theHobbit.hasOwnProperty("info")',
  theHobbit.hasOwnProperty("info")
);
console.log('Book.hasOwnProperty("info")', Book.hasOwnProperty("info"));
console.log(
  `Book.prototype.hasOwnProperty("getPages")`,
  Book.prototype.hasOwnProperty("getPages")
);
