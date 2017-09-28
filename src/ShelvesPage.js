import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom"
import Shelve from "./Shelve"


class ShelvesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: []

        }
    }


    componentDidMount() {

        BooksAPI.getAll().then((books) => {
            this.setState({books: books})
            console.log(books)
        })

    }

    updateShelves = () => {
        BooksAPI.getAll().then((books)=>{
            this.setState({books:books})
            console.log(books)
        })
    }



    render() {

        const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead')
        const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading')
        const read = this.state.books.filter(book => book.shelf === 'read')

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.state.books.length !== 0 ?  <div>
                        <Shelve updateShelves={this.updateShelves} shelf="Currently reading"  books={currentlyReading}/>
                        <Shelve updateShelves={this.updateShelves} shelf="Want to read"  books={wantToRead}/>
                        <Shelve updateShelves={this.updateShelves} shelf="Read"  books={read}/>
                    </div> : <h1>Loading ...</h1>}

                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>


        )

    }

}

export default ShelvesPage