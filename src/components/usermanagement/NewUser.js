import React, { Component, Fragment } from 'react';
import axios from "axios";
// userquery is used to display the database items to viewable format
//import Userquery from './UserQuery';

const config = require('../../config.json');

export default class NewUser extends Component {

  state = {
    newbook: {  
    "email_id": "",
    "username": "",
    "category": "",
    "batch": ""
    },
    newbooks: []
  }

  handleNewUserRequest = async (email_id, event) => {
      console.log("function invoked");
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
        console.log("inside try");

    const now = new Date();
    const params = {
    "email_id": email_id,
    "username": this.state.newbook.username,
    "category": this.state.newbook.category,
    "batch":this.state.newbook.batch,
    "req_date":now

      };
      console.log("Inputs received :", params);
      await axios.post(`${config.api.invokeUrl}/newuser/${email_id}`, params);
      this.setState({ newbooks: [...this.state.newbooks, this.state.newbook] });
      this.setState({ newbook: { "email_id":"", "username": "", "batch": "", "category": ""}});
      console.log("Request Submitted Successfully");
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddEmailIdChange = event => this.setState({ newbook: { ...this.state.newbook, "email_id": event.target.value } });
  onAddUsernameChange = event => this.setState({ newbook: { ...this.state.newbook, "username": event.target.value } });
  onAddBatchChange = event => this.setState({ newbook: { ...this.state.newbook, "batch": event.target.value } });
  onAddBookCategoryChange = event => this.setState({ newbook: { ...this.state.newbook, "category": event.target.value } });
  
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
            <h1>Welcome to AK Library</h1>
            <p className="subtitle is-5">Looking for a Sign In account ?</p>
            <p className="subtitle is-5">Submit your details. Our admin will process with your acccount in 3 days</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleNewUserRequest(this.state.newbook.email_id, event)}>
                      
                    <div className="field">
                    <p className="control">
                    <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Name"
                        value={this.state.newbook.username}
                        onChange={this.onAddUsernameChange}
                      />
                      </p>
                    </div>

                        <div className="field">
                        <p className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Email Address"
                        value={this.state.newbook.email_id}
                        onChange={this.onAddEmailIdChange}
                      />
                     </p>
                    </div>

                        <div className="field">
                        <p className="control">
                       <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Batch (Year)"
                        value={this.state.newbook.batch}
                        onChange={this.onAddBatchChange}
                      />
                   </p>
                    </div>

                        <div className="field">
                        <p className="control">
                         <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Category (Student / Staff)"
                        value={this.state.newbook.category}
                        onChange={this.onAddBookCategoryChange}
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
