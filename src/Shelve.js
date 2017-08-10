import React from 'react'


function Shelve(props) {

    let books = props.children
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelve}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books}
                </ol>
            </div>
        </div>
    )
}

export default Shelve