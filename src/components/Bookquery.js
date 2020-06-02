import React, { Component }  from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Bookquery extends Component {
/*
  state = {
    isEditMode: false,
    updatedname: this.props.query_followup,
    updatedquery: this.props.query_status
  }

  handleProductEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateProduct(this.props.query_id, this.state.updatedname, this.state.updatedquery);
  }

  onAddProductNameChange = event => this.setState({ "updatedname": event.target.value });
  onAddProductQueryChange = event => this.setState({ "updatedquery": event.target.value });
*/
  render() {
    return (

      <div>
              <p className="product-title">Book Title: {this.props.Book_Title }</p>
              <p className="product-id">Book Author:{ this.props.Book_Author}</p>
              <p className="product-id">Book Classification:{ this.props.Book_Classification_No}</p>
              
              <p className="product-id">Book Scope: { this.props.Book_Scope}</p>
              <p className="product-id">Book Status: { this.props.Book_Status}</p>

            </div>

      /*
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleProductEdit} className="product-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteProduct(this.props.email_id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Enter Follow up Comments</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Update name"
                value={this.state.updatedname}
                onChange={this.onAddProductNameChange}
              />

              <p>Enter Status</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Update Query"
                value={this.state.updatedquery}
                onChange={this.onAddProductQueryChange}
              />

              <p className="product-id">id: { this.props.query_id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
              
            </div>
          : 
          
          
          <div>
              <p className="product-title">Book Title: {this.props.book_title }</p>
              <p className="product-id">Book Author:{ this.props.book_author}</p>
              
              <p className="product-id">Book Status: { this.props.status_key}</p>
            </div>
        }
      </div>

      */
    )
  }
}
