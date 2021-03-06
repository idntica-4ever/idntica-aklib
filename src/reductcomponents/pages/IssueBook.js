import React, { Component } from 'react';
import Bookquery from '../../components/Bookquery';
import { Auth } from 'aws-amplify';

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
            "username": "",
            "accession_no":""
        },
        privilagedUser:"",
        dispMsg:"",
        queries: [],
        booklst: []
      }

      componentDidMount(){
        this.fetchLoggedUserDetails();
       }
       fetchLoggedUserDetails = async() =>{
        const session =  await Auth.currentSession();
        // console.log("Session :", session.accessToken.payload.username);
        // console.log("Session :", session.idToken.jwtToken);
        const access_token=session.idToken.jwtToken;
         const privilagedUser=session.accessToken.payload.username;
       this.setState({privilagedUser:privilagedUser});
      
       }

      // handle user search
      handleuserbooksearch = async(username, event) => {
      // event.preventDefault();
      // email_id ? alert ("Empty") : alert("value is there")

       // const book_query_upper= book_query.toUpperCase();
        console.log ("Book Query Received", username);
        if(username==="")
        {
          this.setState({dispMsg:"Enter the username"});
        }else{
    
        try {   
          const params = {
            "username": username
            };
    
          console.log("Fetching API");
          const validateResponse = await axios.get(`${config.api.invokeUrl}/user/validateuser/${username}`);
            console.log("Validate Response :", validateResponse);
            if(validateResponse.data.Users.length<1)
            {
              this.setState({dispMsg:"Incorrect UserName"});
            }else {
              console.log("Testing",validateResponse.data.Users[0].UserStatus);
            }
         // book_query=encodeURIComponent(book_query);
          const res = await axios.get(`${config.api.invokeUrl}/books/bookings/${username}`, params);
          console.log("res:", res);
          if (res.length<1){
            this.setState({dispMsg:"No Books Issued to this user"});
          }else{
         // console.log("Fetching API for query : ", email_id);
          //book_query=encodeURIComponent(book_query);
          //console.log("Encoded URL :", encodeURIComponent(book_query));
          
          //console.log("UserName:",this.props.auth.user.username);
          //console.log("Username");
          this.setState({ queries: res.data });
        // console.log("Fetched Data", this.state.queries);
    
        // this.assignSearchedresults();
         // validating search results
          }
        } catch (error) {
          console.log(`An error has occurred: ${error}`);
        }
      }
      }

     handleissuebook = async(accession_no, username, event) => {

       // event.preventDefault();
        // const book_query_upper= book_query.toUpperCase();
         console.log ("Book Query Received", accession_no);
         console.log("Username received :", username);
         const now = new Date();
     
         try {
     
           const params = {
             "Accession_No": accession_no,
             "Book_Status":"Issued",
             "issued_by": this.state.privilagedUser,
             "issued_on":now,
             "username":username

           };
     
           console.log("Fetching API");
          // book_query=encodeURIComponent(book_query);
           await axios.patch(`${config.api.invokeUrl}/books/bookings/transaction/${accession_no}`, params);
           this.handleuserbooksearch(username, event);
           alert ("Book Issued Successfully");

        //  console.log("Fetched Data", this.state.booklst);
     //return;
         // this.assignSearchedresults();
          // validating search results
     
         } catch (error) {
           console.log(`An error has occurred: ${error}`);
         }
      }

      handlereturnbook = async(accession_no, username, event) => {

        event.preventDefault();
        console.log ("Book Query Received", accession_no);
         try {
           const params = {
             "Accession_No": accession_no,
             "Book_Status":"Available",
             "issued_by":"",
             "issued_on":"",
             "username":"NA"
           };
           console.log("Fetching API");
          
           await axios.patch(`${config.api.invokeUrl}/books/bookings/transaction/${accession_no}`, params);
           this.handleuserbooksearch(username, event);
           alert ("Book Returned Successfully");
         } catch (error) {
           console.log(`An error has occurred: ${error}`);
         }

      }



    onAddUsernameChange = event => this.setState({ newquery: { ...this.state.newquery, 
        "username": event.target.value } });
    
        onAddAccessionNoChange = event => this.setState({ newquery: { ...this.state.newquery, 
          "accession_no": event.target.value } });
      

    render() {
          
        const booklist = this.state.queries && this.state.queries.length > 0
        ?this.state.queries.map(searchresult => <Bookquery Book_Title= {searchresult.Book_Title} 
          Book_Author={searchresult.Book_Author} Book_Classification_No={searchresult.Book_Classification_No} 
          Book_Status={searchresult.Book_Status} Book_Scope={searchresult.Book_Scope} key={searchresult.author_title} />)
        : <div className="tile notification is-warning">NO BOOKS Issued </div>   
        return (

            
            <div>
                <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Issue or Return Books</CardHeader>
            <CardBody>
            <Form >
                             <FormGroup>
                  <Label for="username">User Name</Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Enter username to search..."
                    value={this.state.newquery.username} 
      
                    onChange={this.onAddUsernameChange}
                    
                  />
                </FormGroup>
            {this.state.dispMsg}
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button
                    onClick={event => this.handleuserbooksearch(this.state.newquery.username, event)}
                    >Search User
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
                  <Col sm={{ size: 5, offset: 2 }}>
                    <Button
                    onClick={event => this.handleissuebook(this.state.newquery.accession_no, this.state.newquery.username, event)}
                    >Issue Book
      
                    </Button>
                    
                    
                    
                 
                  
                    
                    
                    <Button
                    onClick={event => this.handlereturnbook(this.state.newquery.accession_no, this.state.newquery.username, event)}
                    >Return Book
      
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
