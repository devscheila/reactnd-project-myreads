import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book.js';

class SearchPage extends Component {
	state = {
		query: '',
		searchBooks: []
	}
	
	updateQuery = (query) => {
		this.setState({
			query: query
		})
		this.updateSearchBooks(query);
	}

	updateSearchBooks = (query) => {
		if (query) {
			BooksAPI.search(query).then((searchBooks) => {
				if (searchBooks.error) {
					this.setState({ searchBooks: [] });
				} else {
					this.setState({ searchBooks: searchBooks });
				}
			})
		} else {
			this.setState({ searchBooks: [] });
		}
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{
							this.state.searchBooks.map(searchBook => {
								let shelf = "none";
								this.props.books.map(book => (
									book.id === searchBook.id ?
									shelf = book.shelf :
									''
								))
								return (
									<li key={searchBook.id}>
										<Book 
											book={searchBook}
											changeShelf={this.props.changeShelf}
											currentShelf={shelf}
										/>
									</li>
								);
							})
						}
					</ol>
				</div>
			</div>
		);
	}
}

export default SearchPage;