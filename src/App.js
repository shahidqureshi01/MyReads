import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import CurrentlyReading from './CurrentlyReading'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
      this.setState({currentlyReading: books.filter((b) => b.shelf === 'currentlyReading')}); 
      this.setState({wantToRead: books.filter((b) => b.shelf === 'wantToRead')});
      this.setState({read: books.filter((b) => b.shelf === 'read')});
    });
  }

  onChangeHandler = (book, addTo, removeFrom) => {
    if(addTo !== removeFrom) {
      this.setState((state) => {
        state[removeFrom] = state[removeFrom].filter((b) => b.id !== book.id);
        book.shelf = addTo;
        state[addTo].push(book);
      }); 
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={({ history }) => (
          <Search books={this.state.books} 
            onChangeHandler={(book, addTo, removeFrom) => {
              this.onChangeHandler(book, addTo, removeFrom)
              history.push('/')
            }}/>
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <h1>{this.state.title}</h1>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading books={this.state.currentlyReading} onChangeHandler={this.onChangeHandler} heading="Currently Reading" />
                <CurrentlyReading books={this.state.wantToRead} onChangeHandler={this.onChangeHandler} heading="Want To Read"/>
                <CurrentlyReading books={this.state.read} onChangeHandler={this.onChangeHandler} heading="Read"/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

BooksApp.proptypes = {
  heading: PropTypes.string.isRequired,
  books:  PropTypes.array.isRequired,
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired
}

export default BooksApp
