import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom"
import Shelve from "./Shelve"
import Book from "./Book"

class ShelvesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: {
                current: [],
                wanted: [],
                read: [],
                none: []

            }
        }
    }

    componentDidMount(){
        BooksAPI.getAll().then((books)=>{
            console.log(books)
        })
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
                        {aShelveTypes.map((type)=>{
                            return (<Shelve shelve={type}><li><Book></Book></li>
                                <li><Book></Book></li>
                                <li><Book></Book></li>
                                <li><Book></Book></li>
                                <li><Book></Book></li>
                                <li><Book></Book></li>
                                <li><Book></Book></li>
                                <li><Book></Book></li>
                                <li><Book></Book></li>
                                <li><Book></Book></li>
                                <li><Book></Book></li>
                            </Shelve>)
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