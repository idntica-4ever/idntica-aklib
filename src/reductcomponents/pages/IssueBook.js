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
const users = ['joe', 'xavi', 'alex'];
const peoples = [
    "Siri",
    "Alexa",
    "Google",
    "Facebook",
    "Twitter",
    "Linkedin",
    "Sinkedin"
  ];
  
const config = require('../../config.json');
export default class IssueBook extends Component {

    state = {
        newquery: {
            "book_query": ""
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
    
    
    
    
      // handle global search
      handleglobalsearch = async(book_query, event) => {
        event.preventDefault();
        const book_query_upper= book_query.toUpperCase();
        console.log ("Book Query Received", book_query_upper);
    
        try {
    
          const params = {
            "book_query": book_query
          };
    
          console.log("Fetching API");
          book_query=encodeURIComponent(book_query);
          const res = await axios.get(`${config.api.invokeUrl}/books/global-book-search/${book_query_upper}`, params);
          console.log("Fetching API for query : ", book_query);
          book_query=encodeURIComponent(book_query);
          console.log("Encoded URL :", encodeURIComponent(book_query));
          
          
          
          this.setState({ queries: res.data });
         console.log("Fetched Data", this.state.queries);
    
        // this.assignSearchedresults();
         // validating search results
    
        } catch (error) {
          console.log(`An error has occurred: ${error}`);
        }
      }


    onAddBookQueryChange = event => this.setState({ newquery: { ...this.state.newquery, 
        "book_query": event.target.value } });
    

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
              <Form onSubmit={event => this.handleglobalsearch(this.state.newquery.book_query, event)}>
                
                <FormGroup>
                  <Label for="username">User Name</Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Search the User..."
                    value={this.state.newquery.book_query} 
      
                    onChange={this.onAddBookQueryChange}
                    
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
                  />
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Issue Book</Button>
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
