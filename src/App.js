import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import MyReads from './MyReads'
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
      this.setState({
        books,
        currentlyReading: books.filter((b) => b.shelf === 'currentlyReading'),
        wantToRead: books.filter((b) => b.shelf === 'wantToRead'),
        read: books.filter((b) => b.shelf === 'read')
      });
    });
  }

  updateStatus = (book, value) => {
    book.shelf = value

    BooksAPI.update(book, value).then(res => {
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }

  onChangeHandler = (book, addTo, removeFrom) => {
    if(addTo !== removeFrom) {
      this.setState((state) => {
        if(removeFrom !== 'none') {
          state[removeFrom] = state[removeFrom].filter((b) => b.id !== book.id); 
        }
        book.shelf = addTo; 
        state[addTo].push(book);
        state['books'].push(book);
        this.updateStatus(book, addTo);
        console.log('books', state['books'])
      }); 
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={({ history }) => (
          <Search onShelfBooks={this.state.books} 
            onChangeHandler={(book, addTo, removeFrom) => {
              this.onChangeHandler(book, addTo, removeFrom)
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
                <MyReads books={this.state.currentlyReading} onChangeHandler={this.onChangeHandler} heading="Currently Reading" />
                <MyReads books={this.state.wantToRead} onChangeHandler={this.onChangeHandler} heading="Want To Read"/>
                <MyReads books={this.state.read} onChangeHandler={this.onChangeHandler} heading="Read"/>
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
