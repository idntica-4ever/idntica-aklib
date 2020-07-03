import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../../config.json');

export default class NewUserList extends Component {

  state = {
    newproduct: { 
      "user_name": "", 
      "email_id": "",
      "user_batch":"",
      "user_category":""
    },
    products: []
  }
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
  handleUpdateProduct = async (email_id, updatedcomments) => {

    const now = new Date();
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "email_id": email_id,
        "Comments": updatedcomments,
        "account_status":"Active",
        "approved_by":"Admin",
        "approved_on":now
      };
      await axios.patch(`${config.api.invokeUrl}/newuser/${email_id}`, params);
      const productToUpdate = [...this.state.products].find(product => product.email_id === email_id);
      const updatedProducts = [...this.state.products].filter(product => product.email_id !== email_id);
      //productToUpdate.productname = user_name;
      //updatedProducts.push(productToUpdate);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }

  handleDeleteProduct = async (email_id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    console.log ("Delete request received for email ID :", email_id);
    try {
      await axios.delete(`${config.api.invokeUrl}/newuser/${email_id}`);
      const updatedProducts = [...this.state.products].filter(product => product.email_id !== email_id);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/newuser`);
      const products = res.data;
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
                          handleUpdateProduct={this.handleUpdateProduct}
                          handleDeleteProduct={this.handleDeleteProduct} 
                          user_name={product.user_name} 
                          email_id={product.email_id}
                          user_category={product.user_category}
                          user_batch={product.user_batch}
                          key={product.email_id}
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
