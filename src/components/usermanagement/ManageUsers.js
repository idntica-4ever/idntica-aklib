import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import {Table} from 'react-bootstrap';
import { resetCalls } from 'react-ga';

const config = require('../../config.json');


class NewUserList extends Component {

  state = {
    newproduct: { 
      "username": "", 
      "email_id": "",
      "user_batch":"",
      "user_category":"",
      "comments":"",
      "approved_by":"",
      "approved_on":"",
      "account_status":"",
      "password":""    
    },
    userid:"",
    products: [],
    errors: {
      cognito:null,
      blankfield:false,
      passwordmatch:false
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


  handleSignUp = async (email_id, event) => {
   // event.preventDefault();
   // console.log("coding started");
    // Form validation
   /* this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }*/

    // AWS Cognito integration here
    // this.state will pass the data from the from to the varialbels
    //const username = username;
    const email = email_id;
    const username = this.state.userid;
    const password = "Aklibrary@123";
    const source="AKLibrary";
    const role="admin";
    console.log("Username :", username);
    try{
         //console.log("started try method");

     const signUpResponse = await Auth.signUp({
       username,
       email,
        password,
        attributes:{
          email:email,
        'custom:source':source,
        'custom:role':role
        }
      });
      console.log(signUpResponse);
      console.log("Cognito account created");
     // this.props.history.push("/welcome");
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


/*
  handleAddProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        "id": id,
        "productname": this.state.newproduct.productname
      };
      await axios.post(`${config.api.invokeUrl}/products/${id}`, params);
      this.setState({ products: [...this.state.products, this.state.newproduct] });
      this.setState({ newproduct: { "productname": "", "id": "" }});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }
*/

handleEnableProduct = async (username, event) => {
  event.preventDefault();

  console.log("Username :", username);
  const userName=username;

  try {
    const res = await axios.get(`${config.api.invokeUrl}/user/enableuser/${userName}`);
    //console.log("response :", res);
    //const products = res.data.Users;
    //console.log("Products :", products);
   //this.setState({ products: products });
  } catch (err) {
    console.log(`An error has occurred: ${err}`);
  }
}



  handleUpdateProduct = async (email_id, event) => {
    //setting up new login account
    await this.fetchUserId();
    const now = new Date();
   // const username = user_name;
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "username": this.state.userid,
        "email_id":email_id,
        "account_status":"Active",
        "approved_by":"Admin",
        "approved_on":now,
        "PK":"AKLibrary"
      };
      console.log("Inputs received :", params);
      console.log("processing update for email ID : ", this.state.userid);
      //await axios.patch(`${config.api.invokeUrl}/user/${username}`, params);
      this.handleSignUp(email_id);

      const productToUpdate = [...this.state.products].find(product => product.email_id === email_id);
      const updatedProducts = [...this.state.products].filter(product => product.email_id !== email_id);
     // productToUpdate.comments = comments;
    //  updatedProducts.push(productToUpdate);
      //this.setState({products: updatedProducts});
      this.fetchProducts();
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }

  handleDeleteProduct = async (email_id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    console.log ("Delete request received for email ID :", email_id);
   // const username = user_name;
    try {
      await axios.delete(`${config.api.invokeUrl}/user/${email_id}`);
      const updatedProducts = [...this.state.products].filter(product => product.email_id !== email_id);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }

  fetchUserId = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/user/userid`);
      var temp = "AK"+(1000+res.data.Count+1);
      this.setState({userid:temp});
      console.log("total user records: ", res);     // this.setState({ products: products });

   //   console.log("total user records: ", temp);     // this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
    
  }


  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/user/disabled`);
      console.log("response :", res);
      const products = res.data.Users;
      console.log("Products :", products);
     this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }
  
/*
  onAddProductNameChange = event => this.setState({ newproduct: { ...this.state.newproduct, "productname": event.target.value } });
  onAddProductIdChange = event => this.setState({ newproduct: { ...this.state.newproduct, "id": event.target.value } });
*/
  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>User Management</h1>
            <p className="subtitle is-5">Select appropriate action to approve or deny new user request</p>
            <br />
            <div className="columns">
              
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products.map((product, index) => 
                        <Product 
                          isAdmin={true}
                          handleEnableProduct={this.handleEnableProduct}
                          handleDeleteProduct={this.handleDeleteProduct} 
                          Username={product.Username}
                          Attributes={product.Attributes}
                          key={product.Username}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </Fragment>



    )
  }
}

export default NewUserList;