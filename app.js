// 'library' array to hold all the Book objects
let bookArr = []; 

// where are all the book cards are held in the DOM
let cards = document.querySelector('#book_cards'); 

class BookClass {
    constructor(title, author, genre, publisher, readStatus) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publisher = publisher;
        this.readStatus = readStatus;
    };

    // getters
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get genre() {
        return this._genre;
    }
    get publisher() {
        return this._publisher;
    }
    get readStatus() {
        return this._readStatus;
    }

    // setters
    set title(value) {
        this._title = value;
    }
    set author(value) {
        this._author = value;
    }
    set genre(value) {
        this._genre = value;
    }
    set publisher(value) {
        this._publisher = value;
    }
    set readStatus(value) {
        this._readStatus = value;
    }
}

BookClass.prototype.changeStatus = function(targetDivCard) {
    let nodelist = targetDivCard.parentNode.querySelectorAll('li');
    let readStatus = nodelist[4].innerText;
    switch(readStatus) {
        case "In Progress":
            readStatus = "Finished";
            break;
        case "Finished":
            readStatus = "Not Started";
            break;
        case "Not Started":
            readStatus = "In Progress";
            break;
    }
    nodelist[4].innerText = readStatus;
    this.readStatus = readStatus;    
}

// object to handle some events
const eventHandler = {
    handlers: {
        click(e) {     
            // finding the data-index of the div card so it can be associated with
            // the Book object array 
            let targetDivCard = e.currentTarget.parentNode;
            let divIndex = targetDivCard.parentNode.getAttribute('data-index');

            // NodeList of the divs under #book_cards so their data-index can be updated to
            // reflect one being deleted
            let divNodeList = document.querySelectorAll('#book_cards #card');

            if (e.target.innerText == "Remove From Library") {

                // removes the div card from the DOM
                divNodeList[divIndex].remove(divNodeList[divIndex])
                // updates the nodelist sans the removed div card
                divNodeList = document.querySelectorAll('#book_cards #card');
                  
                // removes the corresponding Book object from bookArr
                let y = bookArr.indexOf(bookArr[divIndex]);
                bookArr.splice(y, 1);

                // reassigns the data-index attribute of each div card so it tracks
                // with the indices of bookArr
                divNodeList.forEach((node, i) => {
                    node.setAttribute('data-index', i);
                }); 

            } else if (e.target.innerText == "Change Read Status") {
                bookArr[divIndex].changeStatus(targetDivCard);
            }
        },
        keydown(e) {
        },
    },
    handleEvent(e) {
        switch (e.type) {
            case 'click':
                this.handlers.click(e);
        }
    },
}

/* 
pushes new books to the Book object and generates their display 
on the page when called by the form event handler
*/
function addBook(a, b, c, d, e, img) {
    let book = new BookClass(a, b, c, d, e)
    bookArr.push(book);

    // creates the div 'cards' and their indices, and buttons
    let div = document.createElement('div'); // main 'card'
    let div2 = document.createElement('div'); // button holding div
    let button = document.createElement('button'); // remove book button
    let button2 = document.createElement('button'); // toggle read status button
    let uList = document.createElement('ul'); // holds user input in the book 'card'
    let index = bookArr.indexOf(book);

    div.setAttribute('id', 'card');
    uList.setAttribute('id', 'attribute_list');
    document.createAttribute('data-index');
    div.setAttribute('data-index', index);
    div.appendChild(uList);
    cards.appendChild(div);

    // populates the div 'cards' with the user input
    for (const prop in book) {
        // else the prototype function(s) are litterally added to the card...
        if (book.hasOwnProperty(prop)) {
            let li = document.createElement('li');
            li.innerText = book[prop];
            uList.appendChild(li);
        }
    };

    // add buttons to the cards;
    button.setAttribute('id', 'change_status_button');
    button.innerText = "Change Read Status";
    button.addEventListener('click', eventHandler);

    button2.setAttribute('id', 'remove_book_button');
    button2.innerText = "Remove From Library";
    button2.addEventListener('click', eventHandler);
    div2.setAttribute('id', 'sub_button_container');
    
    div2.appendChild(button);
    div2.appendChild(button2);
    div.appendChild(div2);

    if(img) {
        div.style.backgroundImage = 'img';
    }

    // adds a new key:value to the Book object based on the 
    // data-index value of the book card being created
    book.index = index;

}

// event handler for the form to submit new books to the library
const form_submit_button = document.getElementById('form_submit')
form_submit_button.addEventListener('click', (e) => {
    let title = document.querySelector("#book_form input[name='title']").value;
    let author = document.querySelector("#book_form input[name='author']").value;
    let genre = document.querySelector("#book_form input[name='genre']").value;
    let publisher = document.querySelector("#book_form input[name='publisher']").value;
    let readStatus = document.querySelector("#book_form select[name='read_status']").value;
    let imgUrl = document.querySelector("#book_form input[name='img']").value;

    addBook(title, author, genre, publisher, readStatus, imgUrl);

    e.preventDefault(); // so the form submit doesn't refresh the page each time
    document.getElementById('book_form').style.display = 'none';
    form_button.style.display = 'block';
});

// event handler for 'New Book' button, which displays the form
const form_button = document.getElementById("display_form_button")
form_button.addEventListener('click', (e) => {
    document.getElementById('book_form').style.display = 'block';
    document.getElementById('book_form').style.transition = 'transition: all 0.5s ease-in';

    document.getElementById('book_cards').style.display = 'flex';
    form_button.style.display = 'none';
});

// event handler for 'cancel' button on the form
const cancel_form = document.getElementById("form_cancel");
cancel_form.addEventListener('click', (e) => {
    document.getElementById('book_form').style.display = 'none';
    form_button.style.display = 'block';
});

//test values

// addBook('Harry Potter', 'JK Rowling', 'Fantasy', 'Bloomsbury Publishing', 'Finished');
// addBook('Wheel of Time', 'Robert Jordan', 'Fantasy', 'TOR Books', 'Finished');
// addBook('Dies the Fire', 'S.M. Stirling', 'Fantasy', 'Penguin', 'Finished');