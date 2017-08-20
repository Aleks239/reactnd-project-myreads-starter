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
            loading: false

        }
    }

    handleChange = (e) => {
        this.setState({query: e.target.value})
    }



    addToShelf = (book,shelf) => {
        BooksAPI.get(book.id).then((book) =>{
            if(book.shelf === "none"){
                BooksAPI.update(book,shelf).then((res)=>{
                    alert("Added!")
                    console.log(res)
                })
            }else{
                alert("Already added to shelf: " + book.shelf)
            }



        })



    }


    enter = (e) => {
        let query = e.target.value

        if (e.key === "Enter" && query !== "") {
            this.setState({loading: true})
            console.log(query.trim())
            BooksAPI.search(query, 10).then((data) => {
                if (Array.isArray(data)) {
                    console.log(data)
                    this.setState({
                        books: data,
                        loading: false
                    })

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

                    {this.state.loading ? <h1>Loading...</h1> :
                        <ol className="books-grid">{this.state.books.map((book) => {
                            return <Book type={book.shelf} makeChange={this.addToShelf} bookRef={book}
                                         key={book.id} author="Shit" title={book.title}
                                         cover={book.imageLinks.thumbnail}/>
                        })}</ol>}


                </div>
            </div>
        )

    }


}

export default SearchPage