import React, { Component } from 'react'
import Bookquery from '../../components/Bookquery';

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
    render() {
        return (
            <div>

<div>
                <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>User Details</CardHeader>
            <CardBody>
              <Form onSubmit={event => this.handlereturnbook(this.state.newquery.accession_no, event)}>
                
             


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
                    <Button>Issue Book
      
                    </Button>
                  </Col>
                </FormGroup>

                
              </Form>
            </CardBody>
          </Card>
        </Col>

           
      </Row> 
       
        </div>
                
            </div>
        )
    }
}
