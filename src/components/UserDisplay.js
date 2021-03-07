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
  Input,
  Row,
} from 'reactstrap';

const tableTypes = ['hover'];
export default class UserDisplay extends Component {

  state = {
    isEditMode: true,
    updatedname: this.props.query_followup,
    updatedquery: this.props.query_status,
    user_role:this.props.user_role,
    buttonValue:"Edit"

  }

  componentDidMount(){
    this.setState({user_role:this.props.user_role});
  }
  handleUserEdit = event => {
    event.preventDefault();
    this.setState({buttonValue:"Save"});
    this.setState({ isEditMode: false });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({buttonValue:"Edit"});
    this.setState({ isEditMode: true });
    console.log("User Role :", this.state.user_role);
    this.props.handleUpdateUser(this.props.loginid, this.state.user_role);
  }

  onAddProductNameChange = event => this.setState({ "updatedname": event.target.value });
  onAddProductQueryChange = event => this.setState({ "updatedquery": event.target.value });
  onInputChange = event => this.setState({[event.target.id]:event.target.value});

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
                                <Input type="select" name="user_role" id="user_role"
                   value={this.props.user_role} 
                   onChange={this.onInputChange} disabled={this.state.isEditMode}>
                    <option>Guest</option>
                    <option>Student</option>
                    <option>Staff</option>

                  </Input>
                                </td>
                                <td className="book-cls-sps">
                                {this.props.status} 
                                </td>
                                <td>
           <button type="submit" 
               className="button-approve is-info is-small"
               onClick={event => {this.state.buttonValue==="Edit"?this.handleUserEdit(event):this.handleEditSave(event)}}
             >{this.state.buttonValue}</button>
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
