let myLibrary = []; //Array to store books
//Book constructor
function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id=title+author+pages; //in the future it can be used for not creating same book twice
}

var bodyOverlayElement = document.getElementById("bodyOverlay");
var newBookWindowElement = document.getElementById("newBookWindow");
var bookContainerElement = document.querySelector(".books-container");

//Adding event listener to "add book button"
const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", showPopupWindow);
//Adding event listener to submit new book button
const newBookForm = document.getElementById("newBookForm");
newBookForm.addEventListener("submit", submitNewBook);

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

function showBookInLibrary(){
    //Look at index.html "//Sample of book card structure//" the html
    //we want to add this book-card every time a book is created
    const div = document.createElement("div");
    div.className = ("book-card");
    const book = myLibrary[myLibrary.length - 1]; //select last added book
    Object.keys(book).forEach((key) => { //create p elements with book information
        if(key == "id") return;
        if(key == "isRead") return;
        let p = document.createElement("p");
        p.innerText = book[key];
        div.appendChild(p);
    });
    //add button if its read or not read
    if(book.isRead == true) div.insertAdjacentHTML("beforeend" ,'<button class="btn green read-btn">Read</button>');
    if(book.isRead == false) div.insertAdjacentHTML("beforeend" ,'<button class="btn red read-btn">Not read</button>');
    
    div.insertAdjacentHTML("beforeend" ,'<button class="btn gray rmv-btn">Remove</button>'); //add remove button
    bookContainerElement.appendChild(div); //append child to books container
}

function toggleReadButton(){ //Changes the read button color if read or not read
    if(this.classList.contains("red")){
        this.classList.remove('red');
        this.classList.add('green');
        this.innerText = "Read";
        return;
    }
    if(this.classList.contains("green")){
        this.classList.remove('green');
        this.classList.add('red');
        this.innerText = "Not read";
    }
}

function removeBook(){ //Removes a book only from DOM, not from object
    this.parentElement.remove();
}

function addEventListenerToBookCard(){ //Add events to "read buttonn" and "remove button"
    const readButtonElement = Array.from( //gets the button only from the last book-card
        document.querySelectorAll('.read-btn')
      ).pop();
      readButtonElement.addEventListener('click', toggleReadButton);

    const removeButtonElement = Array.from( //gets the button only from the last book-card
        document.querySelectorAll('.rmv-btn')
      ).pop();
      removeButtonElement.addEventListener('click', removeBook);
}

function submitNewBook(){
    event.preventDefault(); //Disable refresh after submit
    addBookToLibrary();
    closePopupWindow();
    showBookInLibrary();
    addEventListenerToBookCard();
    
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