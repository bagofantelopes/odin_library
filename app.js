let bookArr = [];
let cards = document.querySelector('.book_cards');

// constructor function
function Book(title, author, genre, publisher, readStatus) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.publisher = publisher;
    this.readStatus = readStatus;
}

Book.prototype.changeStatus = function() {
    
}

const eventHandler = {
    handlers: {
        click(e) {
            if (e.currentTarget.innerText = "Remove From Library") {
                let attribute = e.currentTarget.parentNode.getAttribute('data-index');
                console.log(attribute);
                console.log('----');
                bookArr.forEach((book) => console.log(book.index));
                //console.log(bookArr[attribute].index);

                // removes the div card from the DOM
                let x = e.currentTarget.parentNode;
                x.remove(x);

                // removes the corresponding Book object from bookArr
                let y = bookArr.indexOf(bookArr[attribute]);
                bookArr.splice(y, 1);

                /* 
                    this method so far works in all cases but it does eventually
                    'unlink' the actual array index of the object and it's 
                    corresponding div card's data-index attribute if 'books' are
                    made and 'deleted' from the 'library'.

                    I think this could be corrected somehow, but it does not 
                    currently interfere with the functioning of the program so
                    I'm just going to let it remain as is for now. 
                */
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
function addBook(a, b, c, d, e) {
    let book = new Book(a, b, c, d, e)
    bookArr.push(book);

    // creates the div 'cards' and their indices
    let div = document.createElement('div');
    let button = document.createElement('button');
    let index = bookArr.indexOf(book);

    div.setAttribute('id', 'card');
    document.createAttribute('data-index');
    div.setAttribute('data-index', index);
    cards.appendChild(div);

    // populates the div 'cards' with the user input
    for (const prop in book) {
        let p = document.createElement('p');
        p.innerText = book[prop];
        div.appendChild(p);
    };

    // add buttons to the cards;
    button.setAttribute('id', 'remove_book_button');
    button.innerText = "Remove From Library";
    div.appendChild(button);
    button.addEventListener('click', eventHandler);

    // adds a new key:value to the Book object based on the 
    // data-index value of the book card being created
    book.index = index;

}

// test values
addBook('1', '2', '3', '4', '5');
addBook('11', '22', '33', '44', '55');
addBook('-1', '-2', '-3', '-4', '-5');

// event handler for the form to submit new books to the library
const form = document.getElementById('form_submit')
form.addEventListener('click', (e) => {
    let title = document.querySelector("#book_form input[name='title']").value;
    let author = document.querySelector("#book_form input[name='author']").value;
    let genre = document.querySelector("#book_form input[name='genre']").value;
    let publisher = document.querySelector("#book_form input[name='publisher']").value;
    let readStatus = document.querySelector("#book_form select[name='read_status']").value;

    addBook(title, author, genre, publisher, readStatus);
    e.preventDefault(); 
});

/* 
probably don't even need this function but keeping it for now
would need to be called in case a 'library' was prepopulated with some books somehow
*/
// const displayBooks = () => {
//     bookArr.forEach((book, index) => {
//         let div = document.createElement('div');
//         div.setAttribute('id', 'card');
//         cards.appendChild(div);

//         for (const prop in book){
//             let p = document.createElement('p')
//             p.innerText = book[prop];
//             div.appendChild(p)
//         };
//     });
// };


