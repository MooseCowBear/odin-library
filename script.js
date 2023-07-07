const library = [];

class Book {
  constructor(title, author, read = false) {
    this.title = title;
    this.author = author;
    this.read = read;
  }

  updateRead() {
    this.read = !this.read;
  }
}

const seeds = [{title: "The Broom in the System", author: "David Foster Wallace", read: true}, 
              {title: "The Girls", author: "Emma Cline", read: true}, 
              {title: "Luster", author: "Raven Leilani", read: true}, 
              {title: "Loner", author: "Teddy Wayne", read: true},
              {title: "Animal Farm", author: "George Orwell", read: true},
              {title: "Leviathan", author: "Thomas Hobbes", read: true},
              {title: "A Brief History of Western Philosophy", author: "Bertrand Russell", read: true },
              {title: "Gold Diggers", author: "Sanjena Sathian", read: true}, 
              {title: "Convention", author: "David Lewis", read: true} ]


seeds.forEach((item) => {
  const book = new Book(item.title, item.author, item.read);
  library.push(book);
});

console.log("library: ", library);

const booksDiv = document.getElementById("books");

//want to iterate over library array, creating a book div that contains 
//book info displayed somehow and buttons to update read property and a remove button for book

for(let i = 0; i < library.length; i++) {
  const book = library[i];
  addBookToDom(book, i, booksDiv);
}

//set up with seed data done

const addBookButton = document.getElementById("add");
addBookButton.addEventListener("click", () => {
  const newBookForm = document.getElementById("form");
  newBookForm.display = "block"; //could be flex. need to build this.
});

//adding a new book. currently letting html take care of validation
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", (event) => { 
  event.preventDefault();
  const newBookTitle = document.getElementById("title");
  const newBookAuthor = document.getElementById("author");
  const newBookRead = document.getElementById("read");

  const newBook = new Book(newBookTitle.value, newBookAuthor.value, newBookRead.checked);

  addBookToDom(newBook, library.length, booksDiv);

  //reset the form
  newBookTitle.value = "";
  newBookAuthor.value = "";
  newBookRead.checked = false;
});

//need event listeners for remove button, mark read/unread button


function addBookToDom(book, index, attachTo) {
  const newBookDiv = document.createElement("div");
  newBookDiv.dataset.id = index; 
  newBookDiv.classList.add("book_card");

  const bookInfoDiv = document.createElement("div");
  bookInfoDiv.classList.add("book_info"); //bc will want to style

  const bookTitle = document.createElement("h3");
  bookTitle.innerText = book.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = `by: ${book.author}`;

  bookInfoDiv.appendChild(bookTitle);
  bookInfoDiv.appendChild(bookAuthor);

  newBookDiv.appendChild(bookInfoDiv);

  const buttonDiv = document.createElement("div");

  const readBtn = document.createElement("button");
  readBtn.innerText = book.read ? "mark unread" : "mark read";
  readBtn.classList.add(book.read ? "read" : "not_read");

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove from library";

  buttonDiv.appendChild(readBtn);
  buttonDiv.appendChild(removeBtn);

  newBookDiv.appendChild(buttonDiv);

  attachTo.appendChild(newBookDiv); //add to the books div
}

function removeBookFromLibrary(libary, index) {
  library.splice(index, 1);
}