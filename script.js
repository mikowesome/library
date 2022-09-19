function Book(title, author, pages) {
    this.title = title,
    this.author = author
    this.pages = pages
    this.isRead = false
}

const myLibrary = []

const bookContainer = document.querySelector('.book-container')
const addBookButton = document.querySelector('.add-book-button')
const submitButton = document.querySelector('#add-new-book-btn')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const newBookTitle = document.querySelector('#book-title')
const newBookAuthor = document.querySelector('#book-author')
const newBookPages = document.querySelector('#book-pages')
const errorMessage = document.querySelector('#error-message')
const removeBtn = document.querySelector('.remove-button')

// Event Listeners

addBookButton.addEventListener('click', openModal)
overlay.addEventListener('click', closeModal)
submitButton.addEventListener('click', addBookToLibrary)

// Functions

function toggleRead(event) {
    const title = event.target.parentNode.firstChild.textContent
    for (const book of myLibrary) {
        if (book.title == title && book.isRead === false) {
            book.isRead = true
            console.log(book)
        } else if (book.title == title && book.isRead === true) {
            book.isRead = false
        }
    }
    updateLibrary()
}

function removeBook(event) {
    const title = event.target.parentNode.firstChild.textContent
    for (const book of myLibrary) {
        if (book.title == title) {
            const index = myLibrary.indexOf(book)
            myLibrary.splice(index, 1)
        }
    }
    updateLibrary()
}

function openModal() {
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal() {
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function getBookFromInput() {
    return new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value)
}

function addBookToLibrary(event) {
    event.preventDefault()
    const newBook = getBookFromInput()
    for (const book of myLibrary) {
        if (book.title == newBook.title && book.author == newBook.author) {
            errorMessage.classList.add('active')
            return
        }
    }
    myLibrary.push(newBook)
    updateLibrary()
    closeModal()
}

function updateLibrary() {
    bookContainer.innerHTML = ""
    myLibrary.forEach(book => {
        const bookItem = document.createElement('div')
        const title = document.createElement('p')
        const author = document.createElement('p')
        const pages = document.createElement('p')
        const readBtn = document.createElement('button')
        const removeBtn = document.createElement('button')

        bookItem.classList.add('book-item')
        title.classList.add('book-item-title')
        author.classList.add('book-item-author')
        pages.classList.add('book-item-pages')
        readBtn.classList.add('read-button')
        removeBtn.classList.add('remove-button')
        readBtn.addEventListener('click', toggleRead)
        removeBtn.addEventListener('click', removeBook)

        title.textContent = `${book.title}`
        author.textContent = book.author
        pages.textContent = `${book.pages} pages`
        removeBtn.textContent = 'Remove'
        if (book.isRead) {
            readBtn.textContent = 'Read'
            readBtn.classList.add('read')
        } else {
            readBtn.textContent = 'Not Read'
            readBtn.classList.remove('read')
        }
        

        bookItem.appendChild(title)
        bookItem.appendChild(author)
        bookItem.appendChild(pages)
        bookItem.appendChild(readBtn)
        bookItem.appendChild(removeBtn)
        bookContainer.appendChild(bookItem)
    })
}

updateLibrary()