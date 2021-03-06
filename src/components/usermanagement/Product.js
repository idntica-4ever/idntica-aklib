import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Table} from 'react-bootstrap';

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
    this.props.handleEnableProduct(this.props.Username);
  }

  onAddComments = event => this.setState({ "updatedcomments": event.target.value });

  render() {
    return (
              
        <Table>
                       
                       <tbody>
                      
                          <tr >
                           
                                 <td className="author-title-sps">
                               {this.props.Username} 
                               </td>
                               
                              
                               
                                 <td className="author-title-sps">
                                 {
          this.props.isAdmin && 
          <Fragment>
           
            <button type="submit" 
                className="button-approve is-info is-small"
                onClick={event => this.props.handleEnableProduct(this.props.Username, event)}
              >Approve</button>
             </Fragment>
        }
                               </td>
                               
                               <td className="author-title-sps">
                               {
          this.props.isAdmin && 
          <Fragment>
            
            <button type="submit"  className="button-del is-info is-small" 
            onClick={event => this.props.handleDeleteProduct(this.props.email_id, event)} >Delete</button>
          </Fragment>
        }
                               </td>
                          </tr>
                           
                          
                         

                        
                         
                       </tbody>
                     </Table>



            
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


        
    )
  }
}
