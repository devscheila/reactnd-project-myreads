import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import MainPage from './MainPage.js';
import SearchPage from './SearchPage.js';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MainPage
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )} />
        <Route path="/search" render={() => (
          <SearchPage
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
