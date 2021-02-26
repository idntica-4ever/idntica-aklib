import React, { Component, Fragment } from 'react';
import axios from "axios";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";

const config = require('../../config.json');

export default class SignupForm extends Component {


  state = {
    newbook: {  
    "email_id": "",
    "username": "",
    "user_category": "",
    "user_batch": "",
    "userSource":""
    },
    "displayMsg":"",
    newbooks: []
  }

  handleNewUserRequest = async (username, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
       // console.log("inside try");
        this.setState({displayMsg:""});
        if (this.state.newbook.username==="" || this.state.newbook.email_id==="" || this.state.newbook.user_category === "" || this.state.newbook.user_batch ==="")
        {
          this.setState({displayMsg:"Fill all the required details to submit the request"});
        }
        else
        {
       // console.log("email_id", this.state.newbook.username);

    const now = new Date();
    const params = {
    "email_id": this.state.newbook.email_id,
    "username": username,
    "user_category": this.state.newbook.user_category,
    "user_batch":this.state.newbook.user_batch,
    "req_submitted_on":now,
    "approved_by":"NO",
    "PK":"AKLibrary"

      };
      //console.log("Inputs received :", params);
      await axios.post(`${config.api.invokeUrl}/user/${username}`, params);
      this.setState({ newbooks: [...this.state.newbooks, this.state.newbook] });
      this.setState({ newbook: { "email_id":"", "username": "", "user_batch": "", "user_category": ""}});
      this.setState({displayMsg:"Your Request has been submitted successfully. Admin will review your request and action it accordingly. Check your emails for further updates..."});
      //console.log("Request Submitted Successfully");
    }
    }catch (err) {
      const errmsg = "Error Occured : " + err.error;
      this.setState({displayMsg:errmsg});
     // console.log(`An error has occurred: ${err}`);
    }
  }

  onAddUserSource = event => this.setState({ newbook: { ...this.state.newbook, "userSource": event.target.value } });

  onAddEmailIdChange = event => this.setState({ newbook: { ...this.state.newbook, "email_id": event.target.value } });
  onAddUsernameChange = event => this.setState({ newbook: { ...this.state.newbook, "username": event.target.value } });
  onAddBatchChange = event => this.setState({ newbook: { ...this.state.newbook, "user_batch": event.target.value } });
  onAddBookCategoryChange = event => this.setState({ newbook: { ...this.state.newbook, "user_category": event.target.value } });
    render() {
        return (
           
<div className="container-mg" >

  
<h1 className="header-text">Register</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={event => this.handleNewUserRequest(this.state.newbook.username, event)}>
<div className="row">
    <div className="col-6">
    <img className="signupimg" src={require('../../images/reg-img-new.jpg')} /> 
    </div>
    <div className="col-6 withbg">
        <div className="row">
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Enter username"
                  value={this.state.newbook.username}
                  onChange={this.onAddUsernameChange}
                />
        </div>
        <div className="row">
        
                <input 
                  className="input" 
                  type="email"
                  id="email_id"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.newbook.email_id}
                  onChange={this.onAddEmailIdChange}
                />     
        </div>
        <div className="row">
        <input 
                  className="input" 
                  type="text"
                  id="user_category"
                  aria-describedby="categoryHelp"
                  placeholder="Category (Student / Staff)"
                  value={this.state.newbook.user_category}
                  onChange={this.onAddBookCategoryChange}
                />  
        </div>
        <div className="row">
        <input 
                  className="input" 
                  type="text"
                  id="user_batch"
                  aria-describedby="batchHelp"
                  placeholder="Enter Batch Year"
                  value={this.state.newbook.user_batch}
                  onChange={this.onAddBatchChange}
                />   
        </div>
        <div className="row">
        <input 
                  className="input" 
                  type="text"
                  id="userSource"
                  aria-describedby="batchHelp"
                  placeholder="Enter your Library Code"
                  value={this.state.newbook.userSource}
                  onChange={this.onAddUserSource}
                />   
        </div>
<div className="row">
    <p></p>
</div>

        <div className="row">
            
            <div className="col">
              {this.state.displayMsg}
                <div className = "pull-right">
           
                <button className="button-is-success">
                  Register
                </button>
                </div>
            </div>
        </div>
    </div></div>
    </form>
</div>
        )
    }
}