import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchResults from './SearchResults'
import './App.css';

class Search extends Component {

  state = {
    searchQuery:  '',
    books:[]
  }

  handleChange = (query) => {
    this.setState({searchQuery: query});
    if(query) {
      BooksAPI.search(query, 20).then((books) => {
        this.setState({books});
      })
    } else {
      this.setState({books: []});
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
          <SearchResults books={this.state.books} 
          onShelfBooks={this.props.onShelfBooks}
          onChangeHandler={this.props.onChangeHandler} heading="Search Result" 
          />
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