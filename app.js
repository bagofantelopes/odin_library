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

/* 
pushes new books to the Book object and generates their display 
on the page when called by the form event handler
*/
function addBook(a, b, c, d, e) {
    let book = new Book(a, b, c, d, e)
    bookArr.push(book);

    let div = document.createElement('div');
    div.setAttribute('id', 'card');
    cards.appendChild(div);

    for (const prop in book) {
        let p = document.createElement('p');
        p.innerText = book[prop];
        div.appendChild(p);
    };
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


