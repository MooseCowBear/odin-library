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

for(let i = 0; i < library.length; i++) {
  const book = library[i];
  addBookToDom(book, i, booksDiv);
}

//set up with seed data done

const addBookButton = document.getElementById("add");
addBookButton.addEventListener("click", () => {
  const newBookForm = document.querySelector("form");
  newBookForm.classList.add("show"); 
});

const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", () => {
  const newBookForm = document.querySelector("form");
  newBookForm.classList.remove("show"); 

  const titleErr = document.getElementById("title_error");
  const authorErr = document.getElementById("author_error");
  titleErr.classList.remove("show");
  authorErr.classList.remove("show");
});

//adding a new book. need to add validation!
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", (event) => { 
  event.preventDefault();
  const newBookTitle = document.getElementById("title");
  const newBookAuthor = document.getElementById("author");
  const newBookRead = document.getElementById("read");

  const titleErr = document.getElementById("title_error");
  const authorErr = document.getElementById("author_error");

  if (newBookTitle.value.trim() === "" || newBookAuthor.value.trim() === "") {
    if (newBookTitle.value.trim() === "") {
      titleErr.classList.add("show");
    }
    if (newBookAuthor.value.trim() === "") {
      authorErr.classList.add("show");
    }
    return;
  }

  const newBook = new Book(newBookTitle.value, newBookAuthor.value, newBookRead.checked);

  addBookToDom(newBook, library.length, booksDiv);
  library.push(newBook);

  //reset the form
  newBookTitle.value = "";
  newBookAuthor.value = "";
  newBookRead.checked = false;
  titleErr.classList.remove("show");
  authorErr.classList.remove("show");

  //need to set display back to none
  const newBookForm = document.querySelector("form");
  newBookForm.classList.remove("show");
});

//need event listeners for remove button, mark read/unread button
booksDiv.addEventListener("click", (event) => {
  if (event.target.tagName.toLowerCase() === "button") {
    updateBook(event.target, library);
    removeBook(event.target, library);
  }
});

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
  buttonDiv.classList.add("button_wrapper");

  const readBtn = document.createElement("button");
  readBtn.innerText = book.read ? "mark unread" : "mark read";

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove from library";

  buttonDiv.appendChild(readBtn);
  buttonDiv.appendChild(removeBtn);

  newBookDiv.appendChild(buttonDiv);

  attachTo.appendChild(newBookDiv); //add to the books div
}

function removeBook(target, library) {
  if (target.innerText.toLowerCase().includes("remove") ) {
    const [booKCard, index] = getBookCardAndIndex(target);

    booKCard.remove();
    removeBookFromLibrary(library, index);
  }
}

function updateBook(target, library) {
  if (target.innerText.toLowerCase().includes("mark")) {
    const [ , index] = getBookCardAndIndex(target);
    library[index].updateRead();

    //then change in the inner text of the button
    target.innerText = library[index].read ? "mark unread" : "mark read";
  }
}

function getBookCardAndIndex(target) {
  const booKCard = target.closest(".book_card");
  return [booKCard, booKCard.dataset.id];
}

function removeBookFromLibrary(library, index) {
  library.splice(index, 1);
}