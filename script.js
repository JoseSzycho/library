let myLibrary = []; //Array to store books
//Book constructor
function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id=title+author+pages;
}

//Adding event listener to "add book button"
const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", showPopupWindow);
//Adding event listener to submit new book button
const newBookForm = document.getElementById("newBookForm");
newBookForm.addEventListener("submit", submitNewBook);

var bodyOverlayElement = document.getElementById("bodyOverlay"); 
var newBookWindowElement = document.getElementById("newBookWindow");
var bookContainerElement = document.querySelector(".books-container");

//Adding new Book functions
function showPopupWindow(){
    //Bringing up popup window
    newBookWindowElement.classList.remove("not-active");
    newBookWindowElement.classList.add("active");
    //Bringing up overlay background
    bodyOverlayElement.classList.remove("off");
    bodyOverlayElement.classList.add("on");
}

function addBookToLibrary(){
    //Getting values from form
    let bookTitle = document.getElementById("title").value;
    let bookAuthor = document.getElementById("author").value;
    let bookPagesNumber = document.getElementById("pages-number").value;
    var bookIsRead = document.getElementById("read-status").checked;
    //Creatting new book
    const book = new Book(bookTitle, bookAuthor, bookPagesNumber, bookIsRead);
    myLibrary.push(book);
}

function showLibrary(){
    const div = document.createElement("div");
    div.className = ("book-card");
    
    const book = myLibrary[0];
    Object.keys(book).forEach((key) => {
        let p = document.createElement("p");
        p.innerText = book[key];
        if(key != "id") div.appendChild(p);
    });
    div.insertAdjacentHTML("beforeend" ,'<button class="btn green">Read</button>');
    div.insertAdjacentHTML("beforeend" ,'<button class="btn gray">Remove</button>');
    bookContainerElement.appendChild(div);
}

function submitNewBook(){
    event.preventDefault(); //Disable refresh after submit
    addBookToLibrary();
    closePopupWindow();
    showLibrary();
}

//Closing popup window
function closePopupWindow(){
    //Removing overlay background
    bodyOverlayElement.classList.remove("on");
    bodyOverlayElement.classList.remove("off");
    //Hiding popup window
    newBookWindowElement.classList.remove("active");
    newBookWindowElement.classList.add("not-active");
    //Resetting form
    document.getElementById("newBookForm").reset();
}