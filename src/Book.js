import React from 'react'


function Book(props) {

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${props.cover})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={props.type ? props.type : "none"} onChange={(e) => {
                                props.update(props.bookRef, e.target.value)}
                            }>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{props.title}</div>
                    <div className="book-authors">{props.author}</div>
                </div>
            </li>
        )


}

export default Book






