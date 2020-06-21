import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

export default class SignupForm extends Component {


    state = {
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
    
      onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
      }
    



    render() {
        return (
           
<div className="container-mg" fluid="md">

  
<h1 className="header-text">Register</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
<div className="row">
    <div className="col-6">
    <img className="signupimg" src={require('../../images/signup-img-new.jpg')} /> 
    </div>
    <div className="col-6 withbg">
        <div className="row">
        
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
             
        </div>
        <div className="row">
        
                <input 
                  className="input" 
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
               
              
        </div>
        <div className="row">
      
                <input 
                  className="input" 
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
               
        </div>
        <div className="row">
       
                <input 
                  className="input" 
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
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
