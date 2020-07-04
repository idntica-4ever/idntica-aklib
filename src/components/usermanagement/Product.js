import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class NewUserList extends Component {

  state = {
    isEditMode: false,
    updatedcomments: this.props.updatedcomments
  }

  handleProductEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateProduct(this.props.email_id, this.props.user_name, this.state.updatedcomments);
  }

  onAddComments = event => this.setState({ "updatedcomments": event.target.value });

  render() {
    return (
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
              <p>Enter Comments:</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter Comments"
                value={this.state.updatedcomments}
                onChange={this.onAddComments}
              />
              <p className="product-id">id: { this.props.email_id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >Approve</button>
            </div>
          :<div>
              <p className="product-title"> User Name:{ this.props.user_name }</p>
              <p className="product-id">Email ID: { this.props.email_id }</p>
              <p className="product-id">Category: { this.props.user_category }</p>
              <p className="product-id">Batch Year: { this.props.user_batch }</p>
              
            </div>
// testing display
/*
<div className="container1">
<div className="row">

<div className="row my-2 text-capitalize text-center">
    <p >User Name: 
        
        {this.props.user_name}
        
        
        </p>

    </div>
    <div className="row my-2 text-capitalize text-center">

<p >Email ID:{ this.props.email_id}</p>

    </div>
    <div className="row my-2 text-capitalize text-center">
  
<p>User Category:{ this.props.user_category}</p>

    </div>
    <div className="row my-2 text-capitalize text-center">


<p >Batch Year: { this.props.user_batch}</p>

    </div>
</div>

</div>


*/


        }
      </div>
    )
  }
}
