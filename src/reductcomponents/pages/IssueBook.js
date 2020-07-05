import React, { Component } from 'react';
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

export default class IssueBook extends Component {

    state = {
        newquery: {
            "email_id": "",
            "accession_no":""
        },
        queries: [],
        booklst: []
      }
    
    // upercase function
      toUpperCase = () => {
        const upperCase = this.state.text.toUpperCase();
        this.setState({
            text: upperCase
        });
    }
      
      // handle user search
      handleuserbooksearch = async(email_id, event) => {
        event.preventDefault();
       // const book_query_upper= book_query.toUpperCase();
        console.log ("Book Query Received", email_id);
    
        try {
    
          const params = {
            "email_id": email_id
          };
    
          console.log("Fetching API");
         // book_query=encodeURIComponent(book_query);
          const res = await axios.get(`${config.api.invokeUrl}/books/bookings/${email_id}`, params);
         // console.log("Fetching API for query : ", email_id);
          //book_query=encodeURIComponent(book_query);
          //console.log("Encoded URL :", encodeURIComponent(book_query));
          
          
          
          this.setState({ queries: res.data });
         console.log("Fetched Data", this.state.queries);
    
        // this.assignSearchedresults();
         // validating search results
    
        } catch (error) {
          console.log(`An error has occurred: ${error}`);
        }
      }

     handleissuebook = async(accession_no) => {

      //  event.preventDefault();
        // const book_query_upper= book_query.toUpperCase();
         console.log ("Book Query Received", accession_no);
     
         try {
     
           const params = {
             "accession_no": accession_no
           };
     
           console.log("Fetching API");
          // book_query=encodeURIComponent(book_query);
           const res = await axios.get(`${config.api.invokeUrl}/books/bookings/transaction/${accession_no}`, params);
           console.log("Fetching API for query : ", accession_no);
           //book_query=encodeURIComponent(book_query);
           //console.log("Encoded URL :", encodeURIComponent(book_query));
           
           
           
           this.setState({ queries: res.data });
        //  console.log("Fetched Data", this.state.booklst);
     //return;
         // this.assignSearchedresults();
          // validating search results
     
         } catch (error) {
           console.log(`An error has occurred: ${error}`);
         }

      }


    onAddEmailChange = event => this.setState({ newquery: { ...this.state.newquery, 
        "email_id": event.target.value } });
    
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
              <Form onSubmit={event => this.handleuserbooksearch(this.state.newquery.email_id, event)}>
                
                <FormGroup>
                  <Label for="username">User Name</Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Enter email address to search User..."
                    value={this.state.newquery.email_id} 
      
                    onChange={this.onAddEmailChange}
                    
                  />
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button type="submit">Search User



                    </Button>
                  </Col>
                </FormGroup>



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
      <Table >
                        <tbody>
                          <tr>
                          <th className="table-head-btitle">Book Title</th>
                          <th className="table-head-atitle">Author Name</th>
                          <th className="table-head-cls">Clasification</th>
                          <th className="table-head-scope">Scope</th>
                          <th className="table-head-stat">Status</th>
                          </tr>
    
                        
                  </tbody></Table>              
                                {booklist}
                                  
                          
                              
       
       
    <Bookquery/>
    

    
    
            </div>
        )
    }
}
