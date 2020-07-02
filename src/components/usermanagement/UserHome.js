import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";

import { Auth } from "aws-amplify";

class Register extends Component {
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

 /* clearErrorState = () => {
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
*/
  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>User Management</h1>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  New User Confirmation
                </button>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Account Deletion
                </button>
              </p>
            </div>
          
          </div>
      </section>
    );
  }
}

export default Register;