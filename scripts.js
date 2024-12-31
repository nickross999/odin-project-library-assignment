let myLibrary = [];
const library = document.querySelector('.bookshelf');
const addBookButton = document.querySelector('.add-btn');
const clearLibraryButton = document.querySelector('.clear-btn');
let dialog = document.querySelector('.input-dialog');
let addDialogButton = document.querySelector('.submit-btn');
let closeDialogButton = document.querySelector('.close-dialog-btn')

function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;

    this.info = function() {
        console.log(this.title + ' by ' + this.author + ', ' + this.pages + ', ' + (this.read? 'read': 'not read yet'));
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read, myLibrary.length));
}

function displayLibrary() {
    clearLibrary();
    myLibrary.forEach(book => {
        const newBook = document.createElement('div');
        newBook.classList.add('book');

        const title = document.createElement('p');
        title.innerText = book.title;
        title.classList.add('title');

        const author = document.createElement('p');
        author.innerText = book.author;
        author.classList.add('author');

        const pages = document.createElement('p');
        pages.innerText = book.pages;
        pages.classList.add('pages');

        const read = document.createElement('img');
        read.setAttribute('src', book.read? 'circle-double.svg': 'alpha-x.svg');
        read.classList.add('read');

        const toggleButton = document.createElement('button');
        toggleButton.innerText = 'Toggle Read';
        toggleButton.classList.add('toggle-btn');
        toggleButton.addEventListener('click', () => {
            myLibrary[book.index].read = !myLibrary[book.index].read;
            displayLibrary();
        })

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => {
            myLibrary.splice(book.index, 1);
            displayLibrary();
        })

        newBook.appendChild(title);
        newBook.appendChild(author);
        newBook.appendChild(pages);
        newBook.appendChild(read);
        newBook.appendChild(toggleButton);
        newBook.appendChild(removeButton);

        library.appendChild(newBook);
    })
}

function clearLibrary() {
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }
}

addBookButton.addEventListener('click', () => {
    dialog.showModal();
});

clearLibraryButton.addEventListener('click', () => {
    myLibrary = [];
    clearLibrary();
});

addDialogButton.addEventListener('click', (e) => {
    e.preventDefault();

    e.target.form[0].classList.remove('invalid');
    e.target.form[1].classList.remove('invalid');
    e.target.form[2].classList.remove('invalid');

    if (!e.target.form[0].value || !e.target.form[1].value || !e.target.form[2].value){
        if (!e.target.form[0].value) {
            e.target.form[0].classList.add('invalid');
        }
        
        if (!e.target.form[1].value) {
            e.target.form[1].classList.add('invalid');
        }
        
        if (!e.target.form[2].value) {
            e.target.form[2].classList.add('invalid');
        }
    }

    else {
        myLibrary.push(new Book (
            e.target.form[0].value,
            e.target.form[1].value,
            e.target.form[2].value,
            e.target.form[3].checked
        ));
        displayLibrary();
        dialog.close();
    }
});

closeDialogButton.addEventListener('click', () => {
    dialog.close();
})

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkien', 398, false);
addBookToLibrary('The Two Towers', 'J.R.R. Tolkien', 327, false);
displayLibrary();