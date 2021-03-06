import React, { Component, Fragment } from 'react';
import axios from "axios";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

const config = require('../../config.json');

export default class SignupForm extends Component {


  state = {
    newbook: {  
    "email_id": "",
    "username": "",
    "password":"",
    "user_category": "Student",
    "user_batch": "",
    "userSource":""
    },
    "userid":"",
    "displayMsg":""
  }

  handleUserRequest= async (event) => {
    event.preventDefault();
    try{
         //console.log("started try method");

         this.setState({displayMsg:""});
         if (this.state.newbook.username==="" || this.state.newbook.email_id==="" || this.state.newbook.user_category === "" || this.state.newbook.user_batch ==="" || this.state.newbook.userSource === "")
         {
           this.setState({displayMsg:"Fill all the required details to submit the request"});
         }
         else
         {
         //  console.log("response : ", this.state.newbook.userSource);
         
           const library_source = this.state.newbook.userSource;
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
           const username = this.state.newbook.username;
            const email = this.state.newbook.email_id;
            //const username = this.state.userid;
            const password = this.state.newbook.password;
            const role=this.state.newbook.user_category;
            const batch=this.state.newbook.user_batch;
           // console.log("Username :", username);
        
            

       const signUpResponse = await Auth.signUp({
       username,
       email,
        password,
        attributes:{
          email:email,
        'custom:source':lib_source,
        'custom:role':role,
        'custom:batch':batch

        }
      });
      //console.log(signUpResponse);
      this.setState({displayMsg:"Verify your email to confirm your account."});
    }
  }
     // this.props.history.push("/welcome");
    } catch (err){
      console.log("Inside error log", err);
      const errmsg = "Error Occured : " + err.message;
      this.setState({displayMsg:errmsg});
    }
  
  }

  handleNewUserRequest = async (username, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
       // console.log("inside try");
        this.setState({displayMsg:""});
        if (this.state.newbook.username==="" || this.state.newbook.email_id==="" || this.state.newbook.user_category === "" || this.state.newbook.user_batch ==="" || this.state.newbook.userSource === "")
        {
          this.setState({displayMsg:"Fill all the required details to submit the request"});
        }
        else
        {
        //  console.log("response : ", this.state.newbook.userSource);

          const library_source = this.state.newbook.userSource;
          const res = await axios.get(`${config.api.invokeUrl}/library/${library_source}`);
         if (res.data.length < 1){
            this.setState({displayMsg:"Invalid Library code"});
          }else{
            const key=res.data[0].lib_key;
            const now = new Date();
            const params = {
            "email_id": this.state.newbook.email_id,
            "username": this.state.newbook.username,
            "user_category": this.state.newbook.user_category,
            "user_batch":this.state.newbook.user_batch,
            "req_submitted_on":now,
            "approved_by":"NO",
            "PK":key
            }
            console.log("response :", res);
            console.log("Params :", params);

          await axios.post(`${config.api.invokeUrl}/user/${username}`, params);
          //this.setState({ newbooks: [...this.state.newbooks, this.state.newbook] });
          this.setState({ newbook: { "email_id":"", "username": "", "user_batch": "", "user_category": "","userSource":"" }});
          this.setState({displayMsg:"Your Request has been submitted successfully. Admin will review your request and action it accordingly. Check your emails for further updates..."});
          }
      };
      //console.log("Inputs received :", params);
      //console.log("Request Submitted Successfully");
      
    }catch (err) {
      const errmsg = "Error Occured : " + err.error;
      this.setState({displayMsg:errmsg});
     console.log(`An error has occurred: ${err}`);
    }
  }

  onAddUserSource = event => this.setState({ newbook: { ...this.state.newbook, "userSource": event.target.value } });
  onAddUserNameChange = event => this.setState({ newbook: { ...this.state.newbook, "username": event.target.value } });
  onPwdChange = event => this.setState({ newbook: { ...this.state.newbook, "password": event.target.value } });

  onAddEmailIdChange = event => this.setState({ newbook: { ...this.state.newbook, "email_id": event.target.value } });
  onAddBatchChange = event => this.setState({ newbook: { ...this.state.newbook, "user_batch": event.target.value } });
  onAddBookCategoryChange = event => this.setState({ newbook: { ...this.state.newbook, "user_category": event.target.value } });
    render() {
        return (
           
<div className="container-mg" >

  
<h1 className="header-text">Register</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={event => this.handleUserRequest(event)}>
<div className="row">
    <div className="col-6">
    <img className="signupimg" src={require('../../images/reg-img-new.jpg')} /> 
    </div>
    <div className="col-6 withbg">
    <div className="row">
        
        <input 
          className="input" 
          type="username"
          id="username"
          aria-describedby="userHelp"
          placeholder="Enter username"
          value={this.state.newbook.username}
          onChange={this.onAddUserNameChange}
        />     
</div>
<div className="row">

<input className="input" type="password" id="password" placeholder="Password" 
             value={this.state.newbook.password}
             onChange={this.onPwdChange}/>
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
        <select className="input" type="select" name="scope"
        id="user_category"
        aria-describedby="categoryHelp"
                   value={this.state.newbook.user_category}
               onChange={this.onAddBookCategoryChange}>
                    <option>Student</option>
                    <option>Staff</option>
                    <option>Guest</option>

                  </select>
                
        </div>
        <div className="row">
        <input 
                  className="input" 
                  type="number"
                  id="user_batch"
                  min={1000}
                  max={9999}
                
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
                  aria-describedby="sourceHelp"
                  placeholder="Enter Library Code"
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