import React, { Component, Fragment } from 'react';
import axios from "axios";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { phone } from 'faker';

const config = require('../../config.json');

export default class SignUp extends Component {


  state = {
    "loginid":"",
    "userfullname":"",
    "phoneno":"",
    "emailid":"",
    "password":"",
    "code":"",
    "displayMsg":""
  }

  handleUserRequest= async (event) => {
    event.preventDefault();
    try{
         //console.log("started try method");

         this.setState({displayMsg:""});
         if ( this.state.loginid==="" || this.state.password==="" || this.state.emailid==="" || this.state.phoneno === "" || this.state.userfullname ==="" || this.state.code === "")
         {
           this.setState({displayMsg:"Fill all the required details to submit the request"});
         }
         else
         {
         //  console.log("response : ", this.state.newbook.userSource);
         
           const library_source = this.state.code;
           const res = await axios.get(`${config.api.invokeUrl}/library/${library_source}`);
          if (res.data.length < 1){
             this.setState({displayMsg:"Invalid Library code"});
           }else{
            const lib_source=res.data[0].lib_key;
            const lib_code = lib_source.substring(0,3);
            
           // const res1 = await axios.get(`${config.api.invokeUrl}/user/userid/${lib_code}`);
            //console.log("total user records: ", res1);     // this.setState({ products: products });
            //console.log("code :", lib_code);
            //var temp = lib_code+(1000+res1.data.Users.length+1);
            //this.setState({userid:temp});
      
            //console.log("user id: ", temp);     // this.setState({ products: products });
            
           // const source=res.data[0].lib_key;
           const username=this.state.loginid;
           const userfullname = this.state.userfullname;
            const email = this.state.emailid;
            //const username = this.state.userid;
            const password = this.state.password;
            const role="Guest";
            const batch="NA";
            const phoneno=this.state.phoneno;

           // console.log("Username :", username);
           
        
            

       const signUpResponse = await Auth.signUp({
       username,
       email,
        password,
        attributes:{
          email:email,
          family_name:lib_source,
          phone_number:phoneno,
          name: userfullname,
          given_name:role,
          preferred_username:batch,
         profile:role,
         picture:role
        }
      });
      //console.log(signUpResponse);
      this.setState({displayMsg:"Check your email to confirm the account"});
    }
  }
     // this.props.history.push("/welcome");
    } catch (err){
      console.log("Inside error log", err);
      const errmsg = "Error Occured : " + err.message;
      this.setState({displayMsg:errmsg});
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
           
<div className="container-mg" >

  
<h1 className="header-text">Sign Up</h1>

          <form onSubmit={event => this.handleUserRequest(event)}>
<div className="row">
    <div className="col-6">
    <img className="signupimg" src={require('../../images/reg-img-new.jpg')} /> 
    </div>
    <div className="col-6 withbg">
    <div className="row">
        
        <input 
          className="input" 
          type="loginid"
          id="loginid"
          aria-describedby="loginidHelp"
          placeholder="Enter login ID"
          value={this.state.loginid}
          onChange={this.onInputChange}
        />     
</div>
<div className="row">

<input className="input" type="password" id="password" placeholder="Password" 
             value={this.state.password}
             onChange={this.onInputChange}/>
         </div> 

         <div className="row">
        
        <input 
          className="input" 
          type="userfullname"
          id="userfullname"
          aria-describedby="nameHelp"
          placeholder="Enter your Name"
          value={this.state.userfullname}
          onChange={this.onInputChange}
        />     
</div>
        <div className="row">
                <input 
                  className="input" 
                  type="email"
                  id="emailid"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.emailid}
                  onChange={this.onInputChange}
                />     
        </div>
        <div className="row">
        
        <input 
          className="input" 
          type="phoneno"
          id="phoneno"
          aria-describedby="phoneHelp"
          placeholder="Enter Phone No"
          value={this.state.phoneno}
          onChange={this.onInputChange}
        />     
</div>
        <div className="row">
        <input 
                  className="input" 
                  type="text"
                  id="code"
                  aria-describedby="sourceHelp"
                  placeholder="Enter Library Code"
                  value={this.state.code}
                  onChange={this.onInputChange}
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
                  Sign Up
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