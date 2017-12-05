import React, { Component } from 'react';



class SearchResults extends Component {

getBookShelf = (bookId) => {
  const book = this.props.onShelfBooks.find(b => b.id === bookId);
  const shelf = !!book ? book.shelf : 'none';
  return shelf;
}

	render() {
    const {books} = this.props;
    const bookDetails = books.map(book => {
      const shelf = this.getBookShelf(book.id)
      return(
        <li key={book.id}> 
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}?id=${book.id}&printsec=frontcover&img=1&printsec=frontcover&img=1&zoom=1)` }}></div>
              <div className="book-shelf-changer">
                <select name="grp" value={shelf}
                   onChange={(event) => this.props.onChangeHandler(book, event.target.value, shelf )}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading" >Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors" key="book.authors">{book.authors}</div>
          </div>
        </li>
      )
    })
		return (
      <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.heading}</h2>
      <div className="bookshelf-books"> 
          <ol className="books-grid">
            {bookDetails}
          </ol>
        </div>
      </div>
		);
	}
}

export default SearchResults;
