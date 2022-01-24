import React, { Component } from "react";
import { compose, graphql} from "react-apollo";
import { 
  addBookMutation, 
  getAuthorsQuery, 
  getBooksQuery 
} from "../../Queries/Queries";
// import {flowRight as compose} from 'lodash';


class AddBook extends Component {
  state =  {
    name:'',
    genre:'',
    authorId:''
  };

  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if(data.loading) {
      return <option disabled>Loading Authors..... </option>
    }else {
      return data.authors.map(author => {
        return <option key={author.id} value={author.id}>{author.name}</option>
      })
    }
  }

submitForm(e) {
  e.preventDefault();
  this.props.addBookMutation({
    variables: {
      name:this.state.name,
      genre:this.state.genre,
      authorId:this.state.authorId
    },
    refetchQueries: [{query:getBooksQuery}]
  })
}

  render() {
    return (
      <div>
        <form id="add-book" onSubmit={this.submitForm.bind(this)}>
          <p className="fz-3">Add New Book:</p>
          <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
          </div>

          <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={(e) => this.setState({genre: e.target.value})} />
          </div>

          <div className="field">
            <label>Author:</label>
            <select onChange={(e) => this.setState({authorId: e.target.value})}>
              <option disabled>Select Author</option>
              {this.displayAuthors()}
            </select>
          </div>

          <button>+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery , {name:"getAuthorsQuery"}),
  graphql(addBookMutation , {name:"addBookMutation"})
  )(AddBook);
