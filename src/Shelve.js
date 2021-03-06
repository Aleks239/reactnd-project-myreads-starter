import React, {Component} from 'react'
import Book from "./Book"
import * as BooksAPI from './BooksAPI'


class Shelve extends Component{

    constructor(props){
        super(props)


    }

    changeShelf = (book,shelf) => {
        BooksAPI.update(book,shelf).then((res)=>{
            console.log(res)
            this.props.updateShelves()
        })


    }

    render(){
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book)=>{
                            let image = book.imageLinks.smallThumbnail
                            let author = book.authors[0]
                            if(image === 'undefined'){
                                image = "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_640.png"
                            }
                            if(author === "undefined"){
                                author = "Mr. Unknown"
                            }
                            return <Book update={this.changeShelf} key={book.id} bookRef={book} cover={image} type={book.shelf} title={book.title} author={author}/>
                        })}
                    </ol>
                </div>
            </div>
        )
    }

}

export default Shelve