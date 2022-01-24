import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { getSingleBookQuery } from '../../Queries/Queries';

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if(book) {
      return (
        <div>
          <h2>Book Name: {book.name}</h2>
          <p className='fz-3'>Genre: {book.genre}</p>
          <p className='fz-3'>Author Name: {book.author.name}</p>
          <p className='fz-3'>All Books By This Author: </p>
          <ul className='other-books'>
            {book.author.books.map(item => {
              return <li className='fz-3' key={item.id}>{item.name}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>No Book Selected.....</div>
      )
    }
  }
  render() {
    return (
      <div id='book-details'>
        <div>
          {this.displayBookDetails()}
        </div>
        
      </div>
    )
  }
}

export default graphql(getSingleBookQuery, {
  options: (props)=> {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
