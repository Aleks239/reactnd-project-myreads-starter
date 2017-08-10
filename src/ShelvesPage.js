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
            this.setState({current: cr,wanted:wr,read:re})

        })

    }


    render() {

        const aShelveTypes = ["Currently Reading", "Want to read", "Read"]
        console.log(this.aCurrentlyRead)
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
                                    {this.state.current.map((book) => {
                                        return (

                                            <Book key={book.id} author={book.authors[0]} title={book.title}
                                                  cover={book.imageLinks.thumbnail}/>
                                        )
                                    })}
                                    </Shelve>

                                )

                            }

                            else if(type === aShelveTypes[1]){
                                return (<Shelve key={type} shelve={type}>
                                    {this.state.wanted.map((book) => {
                                        return (
                                            <Book key={book.id} author={book.authors[0]} title={book.title}
                                                  cover={book.imageLinks.thumbnail}/>
                                        )
                                    })}
                                </Shelve>)
                            }

                            else if(type === aShelveTypes[2]){
                                return (<Shelve key={type} shelve={type}>
                                    {this.state.read.map((book) => {
                                        return (
                                            <Book key={book.id} author={book.authors[0]} title={book.title}
                                                  cover={book.imageLinks.thumbnail}/>
                                        )
                                    })}
                                </Shelve>)
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