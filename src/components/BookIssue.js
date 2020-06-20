import React, { Component, Fragment } from 'react';
import axios from "axios";
// userquery is used to display the database items to viewable format
//import Userquery from './UserQuery';

const config = require('../config.json');

export default class BookIssue extends Component {

  state = {
    newbook: {  
    "accession_no": "",
    "Author_Title": "",
    "Book_Author": "",
    "Book_Classification_No": "",
    "Book_Publisher": "",
    "Book_Scope": "",
    "Book_Status": "",
    "Book_Title": "",
    "PK": ""
    },
    newbooks: []
  }

  handleSearchBook = async (accession_no, event) => {
      console.log("function invoked");
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        "accession_no": accession_no
      };

      console.log("Fetching API for query : ", accession_no);
     // book_query=encodeURIComponent(book_query);
      //console.log("Encoded URL :", encodeURIComponent(book_query));
      //console.log("decoded URL :", decodeURIComponent(book_query));
      
      const res = await axios.get(`${config.api.invokeUrl}/books/${accession_no}`, params);
      this.setState({ newbooks: res.data });
     console.log("Fetched Data", this.state.newbooks);

      console.log("Book Searched Successfully");
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddBookTitleChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Title": event.target.value } });
  onAddBookAuthorChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Author": event.target.value } });
  onAddBookAccessionNoChange = event => this.setState({ newbook: { ...this.state.newbook, "accession_no": event.target.value } });
  onAddBookClassificationNoChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Classification_No": event.target.value } });
  onAddBookPublisherChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Publisher": event.target.value } });
  onAddBookScopeChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Scope": event.target.value } });

  /*
  componentDidMount = () => {
    this.fetchProducts();
  }
*/

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Issue a Book</h1>
            <p className="subtitle is-5">Enter the Accession Number of the Book :</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleSearchBook(this.state.newbook.accession_no, event)}>
                      
                    <div className="field">
                    <p className="control">
                    <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Accession No"
                        value={this.state.newbook.accession_no}
                        onChange={this.onAddBookAccessionNoChange}
                      />
                      </p>
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Search
                      </button>
                    </div>
                  
                </form>
              </div>
              

              </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
