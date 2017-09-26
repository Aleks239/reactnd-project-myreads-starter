import React, {Component} from 'react'
import Book from "./Book"


class Shelve extends Component{

    constructor(props){
        super(props)


    }

    render(){
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book)=>{
                            let image = book.imageLinks.smallThumbnail
                            if(image === 'undefined'){
                                image = "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_640.png"
                            }
                            return <Book key={book.title} cover={image} type={book.shelf} title={book.title} author={book.author}/>
                        })}
                    </ol>
                </div>
            </div>
        )
    }

}

export default Shelve