import React, {Component} from 'react'

class Book extends Component {

    constructor(props) {
        super(props)
        this.state = {
            shelf: this.props.type
        }
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${this.props.cover})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue="None" onChange={(e) => {
                                let previousShelf = this.state.shelf
                                let selectedShelf = e.target.value
                                let book = this.props.bookRef
                                this.props.makeChange(book, selectedShelf, previousShelf)
                            }}>
                                <option value="None" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.author}</div>
                </div>
            </li>
        )

    }
}

export default Book






