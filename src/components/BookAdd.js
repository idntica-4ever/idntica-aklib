import React, { Component, Fragment } from 'react';
import axios from "axios";
// userquery is used to display the database items to viewable format
//import Userquery from './UserQuery';

const config = require('../config.json');

export default class BookAdd extends Component {

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

  handleAddBook = async (accession_no, event) => {
      console.log("function invoked");
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
        console.log("inside try");

       // const now = new Date();
      const params = {
    "Accession_No": accession_no,
    "Author_Title": this.state.newbook.Book_Author + " " + "##" + " " + this.state.newbook.Book_Title,
    "Book_Author": this.state.newbook.Book_Author,
    "Book_Classification_No": this.state.newbook.Book_Classification_No,
    "Book_Publisher": this.state.newbook.Book_Publisher,    
    "Book_Scope": this.state.newbook.Book_Scope,
    "Book_Status": "Available",
    "Book_Title": this.state.newbook.Book_Title,
    "PK": "AK_Library#001"
      };
      console.log("Inputs received :", params);
      console.log("accession No : ",accession_no);
      await axios.post(`${config.api.invokeUrl}/books/${accession_no}`, params);
      this.setState({ newbooks: [...this.state.newbooks, this.state.newbook] });
      this.setState({ newbook: { "Accession_No":"", "Author_Title": "", "Book_Author": "", "Book_Classification_No": "", "Book_Publisher": "", "Book_Scope": "" , "Book_Status": "", "Book_Title": "", "PK": ""}});
      console.log("Books Added Successfully");
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
            <h1>Add a New Book</h1>
            <p className="subtitle is-5">Enter the details of the Book :</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddBook(this.state.newbook.accession_no, event)}>
                      
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

                        <div className="field">
                        <p className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Book Title"
                        value={this.state.newbook.Book_Title}
                        onChange={this.onAddBookTitleChange}
                      />
                     </p>
                    </div>

                        <div className="field">
                        <p className="control">
                       <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Book Author"
                        value={this.state.newbook.Book_Author}
                        onChange={this.onAddBookAuthorChange}
                      />
                   </p>
                    </div>

                        <div className="field">
                        <p className="control">
                         <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Book Classification No"
                        value={this.state.newbook.Book_Classification_No}
                        onChange={this.onAddBookClassificationNoChange}
                      />
                    </p>
                    </div>

                        <div className="field">
                        <p className="control">
                        <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Book Publisher"
                        value={this.state.newbook.Book_Publisher}
                        onChange={this.onAddBookPublisherChange}
                      />
                    </p>
                    </div>

                        <div className="field">
                        <p className="control">
                        <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Book Scope"
                        value={this.state.newbook.Book_Scope}
                        onChange={this.onAddBookScopeChange}
                      />
                      </p>
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Submit
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
