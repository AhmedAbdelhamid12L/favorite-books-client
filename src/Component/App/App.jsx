import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

//components
import BookList from '../BookList/BookList'
import AddBook from '../AddBook/AddBook'


//apollo client setup
const client = new ApolloClient ({
  uri:'https://favorite-books-server.herokuapp.com/'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div>
        <BookList/>
        <AddBook/>
      </div>
      </ApolloProvider>
    )
  }
}

export default App;



