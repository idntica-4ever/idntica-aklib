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
  
/*    state = {
        username: "",
        password: "",
        email: "",
        confirmpassword: "",
        errors: {
          cognito: null,
          blankfield: false,
          passwordmatch: false
        }
      }
    
      clearErrorState = () => {
        this.setState({
          errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
          }
        });
      }
    
      handleSubmit = async event => {
        event.preventDefault();
       console.log("coding started");
        // Form validation
        this.clearErrorState();
        const error = Validate(event, this.state);
        if (error) {
          this.setState({
            errors: { ...this.state.errors, ...error }
          });
        }
    
        // AWS Cognito integration here
        // this.state will pass the data from the from to the varialbels
        const {username, email, password } = this.state;
        try{
             console.log("started try method");
    
          const signUpResponse = await Auth.signUp({
            username,
            password,
            attributes:{
              email:email
            }
          });
          console.log(signUpResponse);
          this.props.history.push("/welcome");
        } catch (error){
          //console.log("Inside error log");
    
          let err = null;
          !error.message ? err = { "message" : error} : err = error;
          this.setState({
            errors:{
              errors:{
                ...this.state.errors,
                cognito:err
              }
            }
          })
        }
      };
    */
      onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
      }

    render() {
        return (
           
<div className="container" fluid="md">
<h1 className="header-text">Register</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={event => this.handleNewUserRequest(this.state.newbook.email_id, event)}>
<div className="row">
    <div className="col-6">
    <img className="signupimg" src={require('../../images/signup-img-new.jpg')} /> 
    </div>
    <div className="col-6">
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
                  id="email"
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
                  id="category"
                  aria-describedby="categoryHelp"
                  placeholder="Category (Student / Staff)"
                  value={this.state.newbook.category}
                  onChange={this.onAddBookCategoryChange}
                />
              
               
        </div>
        <div className="row">
       
        <input 
                  className="input" 
                  type="text"
                  id="batch"
                  aria-describedby="batchHelp"
                  placeholder="Batch No ?"
                  value={this.state.newbook.batch}
                  onChange={this.onAddBatchChange}
                />
             
        </div>
<div className="row">
    <p></p>
</div>
<div className="row">
    <p></p>
</div>
        <div className="row">
            <div className="col">
                <a href="/forgotpassword">Forgot password?</a>
            </div>
            <div className="col">
           
                <button className="button is-success">
                  Register
                </button>
              
            </div>
        </div>
    </div></div>
    </form>
</div>
        )
    }
}