import React, { Component }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Table} from 'react-bootstrap';
import UserProgressTable from '../components/AdminView/UserProgressTable';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from '../reductcomponents/demos/dashboardPage';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';

const tableTypes = ['hover'];
export default class UserDisplay extends Component {

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

  render() {
 
    return (
       
      <div className="container">
              


 
{tableTypes.map((tableType, index) => (
        <Row key={index}>
          
            
<Table {...{ [tableType || 'default']: true }}>
                       
                        <tbody>
                           <tr >  
                              <td className="book-title-sps">
                                {this.props.loginid} 
                                </td> 
                                <td className="author-title-sps">
                                {this.props.userfullname} 
                                </td>
                                <td className="book-cls-sps">
                                {this.props.emailid} 
                                </td>
                                <td className="book-cls-sps">
                                {this.props.phoneno} 
                                </td>
                                <td className="book-cls-sps">
                                {this.props.role} 
                                </td>
                                <td className="book-cls-sps">
                                {this.props.status} 
                                </td>
                                <td>
           <button type="submit" 
               className="button-approve is-info is-small"
               onClick={event => this.props.handleEditUser(this.props.loginid, event)}
             >Edit</button>
            </td>                                
            <td>  <button type="submit"  className="button-del is-info is-small" 
            onClick={event => this.props.handleDeleteUser(this.props.loginid, event)} >Delete</button></td>

                           </tr>
                          
                        </tbody>
                      </Table>
                 </Row>
      ))}
       
</div>      
    )
  }
}
