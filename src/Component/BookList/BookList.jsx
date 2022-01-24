import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../Queries/Queries';

//Components
import BookDetails from '../BookDetails/BookDetails';


class BookList extends Component {
  state = {
    selected: null
  }

  displayBooks() {
    var data = this.props.data;
    if(data.loading) {
      return <div>loading books......</div>
    }else {
      return data.books.map(book =>{
        return <li key={book.id} onClick={(e)=>{this.setState({selected:book.id})}}>{book.name}</li>
      })
    }
  };

  render() {
    return (
      <div id='main'>
        <div className='books-contanier'>
          <h1>Our Reading List</h1>
          <ul id='book-list'>
            {this.displayBooks()}
          </ul>
        </div>
        <BookDetails bookId={this.state.selected}/>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);