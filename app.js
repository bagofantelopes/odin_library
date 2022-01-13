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

Book.prototype.changeStatus = function(x) {
    let nodelist = x.parentNode.querySelectorAll('li');
    let a = nodelist[4].innerText;
    switch(a) {
        case "In Progress":
            a = "Finished";
            break;
        case "Finished":
            a = "Not Started";
            break;
        case "Not Started":
            a = "In Progress";
            break;
    }
    nodelist[4].innerText = a;
    this.readStatus = a;    
}

const eventHandler = {
    handlers: {
        click(e) {
            let x = e.currentTarget.parentNode;
            let divIndex = x.parentNode.getAttribute('data-index');
            console.log('divindex ' + divIndex);
            //console.log('object index ' + bookArr[divIndex].index)
            let nodelist = document.querySelectorAll('.book_cards #card');
            let a = Array.from(nodelist, item => item);
            console.log('nodelist: ' + a);
            try {
                if (divIndex != bookArr[divIndex].index) {
                    document.querySelectorAll("#card").forEach((test) => {
                        test.setAttribute('data-index', divIndex - 1);
                        console.log(divIndex);
                    });
                } else if (bookArr[divIndex].index == undefined) {

                }
            } catch (error) {
                console.log('ahh fuck');
            }
            

            //let attribute = e.currentTarget.parentNode.getAttribute('data-index');
            if (e.target.innerText == "Remove From Library") {
                // console.log(attribute);
                // console.log('----');
                // bookArr.forEach((book) => console.log(book.index));

                // removes the div card from the DOM
                x.parentNode.remove(x);

                // removes the corresponding Book object from bookArr
                let y = bookArr.indexOf(bookArr[divIndex]);
                // if (bookArr[divIndex].index < bookArr[divIndex].index + 1) {
                //     document.querySelectorAll("#card").forEach((test) => {
                //         console.log('test');
                //     });
                // }

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
            } else if (e.target.innerText == "Change Read Status") {
                bookArr[divIndex].changeStatus(x);
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
    const book = new Book(a, b, c, d, e)
    bookArr.push(book);

    // creates the div 'cards' and their indices, and buttons
    let div = document.createElement('div'); // main 'card'
    let div2 = document.createElement('div'); // button holding div
    let button = document.createElement('button'); // remove book button
    let button2 = document.createElement('button'); // toggle read status button
    let uList = document.createElement('ul');
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

    // adds a new key:value to the Book object based on the 
    // data-index value of the book card being created
    book.index = index;

}

// test values
addBook('Harry Potter', 'JK Rowling', 'Fantasy', 'Bloomsbury Publishing', 'Finished');
addBook('Wheel of Time', 'Robert Jordan', 'Fantasy', 'TOR Books', 'Finished');
addBook('Dies the Fire', 'S.M. Stirling', 'Fantasy', 'Penguin', 'In Progress');

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


