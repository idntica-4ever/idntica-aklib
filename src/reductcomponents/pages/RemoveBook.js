import React, { Component } from 'react';
import Bookquery from '../../components/Bookquery';
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
  } from 'reactstrap';
  const userquery='';
 
const config = require('../../config.json');


  
   

export default class RemoveBook extends Component {

  state = {
    newquery: {
        "accession_no":""
    }
  }

    
    // upercase function
      toUpperCase = () => {
        const upperCase = this.state.text.toUpperCase();
        this.setState({
            text: upperCase
        });
    }
      
   
     handleremovebook = async(accession_no, event) => {

      
    event.preventDefault();
    console.log ("Book Query Received", accession_no);
     try {
       const params = {
         "Accession_No": accession_no
         };
       console.log("Fetching API");
      
       await axios.delete(`${config.api.invokeUrl}/books/${accession_no}`, params);
       alert ("Book Removed Successfully");
     } catch (error) {
       console.log(`An error has occurred: ${error}`);
     }

  }


    onAddAccessionNoChange = event => this.setState({ newquery: { ...this.state.newquery, 
      "accession_no": event.target.value } });




    render() {
          
        const booklist = this.state.queries && this.state.queries.length > 0
        ?this.state.queries.map(searchresult => <Bookquery Book_Title= {searchresult.Book_Title} 
          Book_Author={searchresult.Book_Author} Book_Classification_No={searchresult.Book_Classification_No} Book_Status={searchresult.Book_Status} Book_Scope={searchresult.Book_Scope} key={searchresult.author_title} />)
        : <div className="tile notification is-warning">NO BOOKS / AUTHOR found.... Try again...</div>   
        return (

            
            <div>
                <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>User Details</CardHeader>
            <CardBody>
              <Form onSubmit={event => this.handleremovebook(this.state.newquery.accession_no, event)}>
                
             


                <FormGroup>
                  <Label for="accessionno">Accession No</Label>
                  <Input
                    type="text"
                    name="accno"
                    placeholder="Enter the book Accession No"
                    value={this.state.newquery.accession_no} 
                    onChange={this.onAddAccessionNoChange}
                    
                  />
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Delete Book
      
                    </Button>
                  </Col>
                </FormGroup>

                
              </Form>
            </CardBody>
          </Card>
        </Col>

           
      </Row> 
            </div>
        )
    }
}
