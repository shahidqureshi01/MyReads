import React, { Component } from 'react';
import './App.css';

class CurrentlyReading extends Component {
	render() {
		return (
      <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.heading}</h2>
      <div className="bookshelf-books"> 
          <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}> 
              <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}?id=${book.id}&printsec=frontcover&img=1&printsec=frontcover&img=1&zoom=1)` }}></div>
                  <div className="book-shelf-changer">
                    <select name="grp" value={book.shelf} onChange={(event) => this.props.onChangeHandler(book, event.target.value, book.shelf )}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading" >Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map((author) => 
                <div className="book-authors" key={author}>{author}</div>
                )}
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
		);
	}
}

export default CurrentlyReading;