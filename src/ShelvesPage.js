import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom"
import Shelve from "./Shelve"
import Book from "./Book"
import * as bookManager from "./utils/bookManager"

class ShelvesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current: [],
            wanted: [],
            read: [],
            none: []
        }
    }


    componentDidMount() {

        BooksAPI.getAll().then((books) => {
            let cr = bookManager.getCurrentlyReading(books)
            let wr = bookManager.getWantToRead(books)
            let re = bookManager.getRead(books)
            this.setState({current: cr, wanted: wr, read: re})
            console.log(books)

        })

    }

    removeFromShelf = (type, removed) => {
        let {current, wanted, read} = this.state

        switch (type) {
            case bookManager.sCurentlyReading:
                current = this.state.current.filter((book) => {
                    return book.id !== removed.id
                })
                return {current, wanted, read}
            case bookManager.sWantToRead:
                wanted = this.state.wanted.filter((book) => {
                    return book.id !== removed.id
                })
                return {current, wanted, read}
            case bookManager.sRead:
                read = this.state.read.filter((book) => {
                    return book.id !== removed.id
                })
                return {current, wanted, read}
            default:
                return {current, wanted, read}

        }
    }


    changeShelf = (book, selectedShelf, previousShelf) => {
        let removedOperation = this.removeFromShelf(previousShelf, book)
        let {current, wanted, read} = removedOperation
        switch (selectedShelf) {
            case bookManager.sCurentlyReading:
                BooksAPI.update(book, selectedShelf)
                book.shelf = selectedShelf
                current.push(book)
                this.setState({current: current, wanted: wanted, read: read})
                break
            case bookManager.sWantToRead:
                BooksAPI.update(book, selectedShelf)
                book.shelf = selectedShelf
                wanted.push(book)
                this.setState({current: current, wanted: wanted, read: read})
                break
            case bookManager.sRead:
                BooksAPI.update(book, selectedShelf)
                book.shelf = selectedShelf
                read.push(book)
                this.setState({current: current, wanted: wanted, read: read})
                break
            default:
                break
        }
    }




    render() {

        const aShelveTypes = ["Currently Reading", "Want to read", "Read"]
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {aShelveTypes.map((type) => {
                            if (type === aShelveTypes[0]) {
                                return (

                                    <Shelve key={type} shelve={type}>

                                        {this.state.current.length !== 0 ? this.state.current.map((book) => {
                                            return (

                                                <Book type={book.shelf} makeChange={this.changeShelf} bookRef={book}
                                                      key={book.id} author={book.authors[0]} title={book.title}
                                                      cover={book.imageLinks.thumbnail}/>
                                            )
                                        }) : <p>Loading...</p>}
                                    </Shelve>

                                )

                            }

                            else if (type === aShelveTypes[1]) {
                                return (

                                    <Shelve key={type} shelve={type}>

                                        {this.state.wanted.length !== 0 ? this.state.wanted.map((book) => {
                                            return (

                                                <Book type={book.shelf} makeChange={this.changeShelf} bookRef={book}
                                                      key={book.id} author={book.authors[0]} title={book.title}
                                                      cover={book.imageLinks.thumbnail}/>
                                            )
                                        }) : <p>Loading...</p>}
                                    </Shelve>

                                )
                            }

                            else if (type === aShelveTypes[2]) {
                                return (

                                    <Shelve key={type} shelve={type}>

                                        {this.state.read.length !== 0 ? this.state.read.map((book) => {
                                            return (
                                                <Book type={book.shelf} makeChange={this.changeShelf} bookRef={book}
                                                      key={book.id} author={book.authors[0]} title={book.title}
                                                      cover={book.imageLinks.thumbnail}/>
                                            )
                                        }) : <p>Loading...</p>}
                                    </Shelve>

                                )
                            }

                        })}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>


        )

    }

}

export default ShelvesPage