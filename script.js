/*addEventListener('submit', (event) => {});

onsubmit = (event) => { 
    var nameValue = document.getElementById("read-status").checked;
    alert(nameValue);
}; 
+*/

//Adding event listener to "add book button"
const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", addBook);

var bodyOverlayElement = document.getElementById("bodyOverlay"); 
var newBookWindowElement = document.getElementById("newBookWindow")

//Adding new Book functions
function showPopupWindow(){
    //Bringing up popup window
    newBookWindowElement.classList.remove("not-active");
    newBookWindowElement.classList.add("active");
    //Bringing up overlay background
    bodyOverlayElement.classList.remove("off");
    bodyOverlayElement.classList.add("on");
}

function addBook(){
    showPopupWindow();
}

//Closing popup window
function closePopupWindow(){
    //Removing overlay background
    bodyOverlayElement.classList.remove("on");
    bodyOverlayElement.classList.remove("off");
    //Hidding popup window
    newBookWindowElement.classList.remove("active");
    newBookWindowElement.classList.add("not-active");
    //Resetting form
    document.getElementById("newBookForm").reset();
}