import React, { Component }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Table} from 'react-bootstrap';
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
              


              <Table className="mt-4" striped bordered bover size="sm">
                            
                            <tbody>
                           
               
                            
                           <tr>
                           
                                <td>
                                {this.props.Book_Title} 
                                </td>
                                <td>
                                {this.props.Book_Author}
                                </td>
                                <td>
                                {this.props.Book_Classification_No}
                                </td>
                                <td>
                                {this.props.Book_Scope} 
                                    </td>
                               <td> {this.props.Book_Status}
                                   </td>
                      
                                
                                
                            </tr>
                            
                            
                            
                            
                            
                            </tbody>
                        </Table>


           



          <div>
              <p className="product-title">Book Title: {this.props.Book_Title }</p>
              <p className="product-id">Book Author:{ this.props.Book_Author}</p>
              
              <p className="product-id">Book Status: { this.props.Status_Key}</p>
            </div>
       
</div>      
    )
  }
}
