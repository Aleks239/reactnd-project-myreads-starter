import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom"
import Book from "./Book"

class SearchPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: "",
            books: [],
            loading: false,
            adding:false,
            addedBooks: []


        }

    }

    changeShelf = (book,shelf) => {
        BooksAPI.update(book,shelf).then((res)=>{
            alert(`${book.title} added to ${shelf} shelf!`)

        })


    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({addedBooks: books})
            console.log(books)
        })
    }


    handleChange = (e) => {
        this.setState({query: e.target.value})
    }


    getUniqueBooks = (existingBookIds) => {
        return this.state.books.filter((book) => {
            return !existingBookIds.includes(book.id)
        })
    }

    getAddedBooksForSearch = (existingBookIds) => {

        let booksOnShelf = this.state.books.filter((book) => {
            return existingBookIds.includes(book.id)
        }).map((book) => { return book.id})

        return this.state.addedBooks.filter((book) => {
            return booksOnShelf.includes(book.id)
        })

    }


    enter = (e) => {
        let query = e.target.value

        if (e.key === "Enter" && query !== "") {
            this.setState({loading: true})
            BooksAPI.search(query, 10).then((data) => {
                if (Array.isArray(data)) {
                    console.log(data)
                    this.setState({
                        books: data,

                    })

                    let ids = this.state.addedBooks.map((book) => {
                        return book.id
                    })
                    let uniqueBooks = this.getUniqueBooks(ids)
                    let booksFromShelf = this.getAddedBooksForSearch(ids)
                    let books = [...booksFromShelf, ...uniqueBooks]
                    this.setState({books:books, loading:false})


                }
                else {
                    this.setState({
                        loading: false,
                        books: []
                    })
                }
            })
        }

    }


    render() {


        return (
            <div onKeyPress={this.enter} className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}


                        <input value={this.state.query} onChange={this.handleChange} type="text"
                               placeholder="Search by title or author"/>


                    </div>
                </div>
                <div className="search-books-results">

                    {this.state.loading  && this.state.addedBooks.length !== 0 ? <h1>Loading...</h1> :

                        <ol className="books-grid">{this.state.books.map((book) => {


                            return <Book update={this.changeShelf} type={book.shelf} bookRef={book}
                                         key={book.id} author={book.authors ? book.authors[0] : "Unknown"}
                                         title={book.title}
                                         cover={book.imageLinks ? book.imageLinks.thumbnail : ""}/>


                        })}</ol>}


                </div>
            </div>
        )

    }


}

export default SearchPage