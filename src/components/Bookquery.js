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
export default class SearchList extends Component {
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
       
      <div className="container">
              


 
{tableTypes.map((tableType, index) => (
        <Row key={index}>
          
            
<Table {...{ [tableType || 'default']: true }}>
                       
                        <tbody>
                       
                           <tr >
                            
                              <td className="book-title-sps">
                                {this.props.Book_Title} 
                                </td>
                            
                               
                                
                                  <td className="author-title-sps">
                                {this.props.Book_Author} 
                                </td>
                                
                               
                                
                                <td className="book-cls-sps">
                                {this.props.Book_Classification_No} 
                                </td>
                                
                                <td className="book-scope-sps">
                                {this.props.Book_Scope} 
                                </td>
                                 
                                <td className="book-status-sps">
                                {this.props.Book_Status} 
                                </td>
                               
                           </tr>
                            
                           
                          

                         
                          
                        </tbody>
                      </Table>
                 </Row>
      ))}
       
</div>      
    )
  }
}
