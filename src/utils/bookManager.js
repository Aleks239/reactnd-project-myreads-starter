const sCurentlyReading = "currentlyReading"
const sWantToRead = "wantToRead"
const sRead = "read"

export const getCurrentlyReading = (books) => {

    return books.filter((book) => {
        return book.shelf === sCurentlyReading
    })
}

export const getWantToRead = (books) => {

    return books.filter((book) => {
        return book.shelf === sWantToRead
    })
}

export const getRead = (books) => {

    return books.filter((book) => {
        return book.shelf === sRead
    })
}