import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from "react-router-dom"
import SearchPage from "./SearchPage"
import ShelvesPage from "./ShelvesPage"
import './App.css'

class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">
                <Route exact path="/search" component={SearchPage}/>
                <Route exact path="/" component={ShelvesPage}/>
            </div>
        )
    }
}

export default BooksApp
