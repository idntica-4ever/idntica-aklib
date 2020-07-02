import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here

    try{
      //console.log("started try method");

   const user= await Auth.signIn(this.state.username, this.state.password);
   console.log("success");
   console.log(user);
   //console.log("success");
   this.props.auth.setAuthStatus(true);
   this.props.auth.setUser(user);
   console.log("success");
   this.props.history.push("/newuserlist");
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
  };

  render() {
    return (
     
        <div className="container-mg">
         <h1 className="header-text">Log In</h1>
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
                  aria-describedby="usernameHelp"
                  placeholder="Enter username or email"
                  value={this.state.username}
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
             
                <a href="/forgotpassword">Forgot password?</a>
             
            </div>
            <div className="row">
            <div className="col">
                <div className = "pull-right">
           
                <button className="button is-success">
                  Login
                </button>
             </div></div>
            </div>

</div>
</div>


          </form>
        </div>
     
    );
  }
}

export default LogIn;