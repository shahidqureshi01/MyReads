import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import CurrentlyReading from './CurrentlyReading'
import './App.css';

class Search extends Component {
  state = {
    searchQuery:  '',
    result:[]
  }

  handleChange = (query) => {
    this.setState({searchQuery: query.trim()});
    if(this.state.searchQuery) {
      const match = new RegExp(escapeRegExp(this.state.searchQuery), 'i'); 
      this.setState({result: this.props.books.filter((book) =>  (match.test(book.title)) || (match.test(book.authors)) )});
      this.state.result.sort(sortBy('title'))
    }
  }

	render() {
    return (	
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.searchQuery} onChange={(e) => this.handleChange(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol> 
          <CurrentlyReading books={this.state.result} onChangeHandler={this.props.onChangeHandler} heading="Search Result" />
        </div>
      </div>         
		);
	}
}

Search.proptypes = {
  heading: PropTypes.string.isRequired,
  result:  PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired
}

export default Search;