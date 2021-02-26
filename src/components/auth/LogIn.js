import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import axios from 'axios';
import {ProductConsumer} from '../../Context';

const config = require('../../config.json');


class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    },
    dispMsg:"",
    newquery: {
        "username": "",
    },
    queries: [],
    userlist: []
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
    //  console.log("inside submit method");
      this.setState({dispMsg:""});
   const user= await Auth.signIn(this.state.username, this.state.password);
   //console.log("success");
   //console.log(user);
   //console.log("success");
   this.handleusercategorysearch(this.state.username);
   this.props.auth.setAuthStatus(true);
   this.props.auth.setUser(user);
  // console.log("success");
   this.props.history.push("/newuserlist");
 } catch (error){
   //console.log("Inside error log");
    const errmsg = "Error Occurred : " + error.message;
    this.setState({dispMsg:errmsg});
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

   // handle user search
   handleusercategorysearch = async(username) => {
  //event.preventDefault();
   // email_id ? alert ("Empty") : alert("value is there")

    // const book_query_upper= book_query.toUpperCase();
     //console.log ("Book Query Received", username);
 
     try {
 
       const params = {
         "username": username
         
       };
 
       console.log("Fetching API");
       console.log("username received : ", username)
      // book_query=encodeURIComponent(book_query);
       const res = await axios.get(`${config.api.invokeUrl}/user/${username}`, params);
      // console.log("Fetching API for query : ", email_id);
       //book_query=encodeURIComponent(book_query);
       //console.log("Encoded URL :", encodeURIComponent(book_query));
       
       //console.log("UserName:",this.props.auth.user.username);
       //console.log("Username");
       //this.setState({ queries: res.data });
       //console.log("data received:", res.data);
       //const arrBirdID = birds.map(bird => bird.ID);	     // Or, simply use bird.Name to get the values from the "Name" object in the JSON array.

       const category = res.data.map(query => query.user_category);
                    
       console.log("User Category :", category);
       
       //category="Admin" ? this.props.auth.setAdmin(true) : this.props.auth.setAdmin(false);
// fetch logged in user details
       const user = await Auth.currentAuthenticatedUser()
       console.log('user:', user)
       console.log('user info:', user.signInUserSession.idToken.payload)
       console.log('user name :', user.signInUserSession.idToken.payload.cognito.username)
       console.log("testing")

     // console.log("Fetched Data from User table", this.state.queries);
 
     // this.assignSearchedresults();
      // validating search results
 
     } catch (error) {
       console.log(`An error has occurred: ${error}`);
     }
   }


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
              {this.state.dispMsg}
            <div className="col">
                <div className = "pull-right">
           
                <button className="button-is-success">
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