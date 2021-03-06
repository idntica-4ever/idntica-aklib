import React, { Component } from 'react';
import Bookquery from '../../components/Bookquery';
import { Auth } from 'aws-amplify';

//import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import {ProductConsumer} from '../../Context';


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

export default class SearchUser extends Component {

    state = {
        searchvalue:"",
        searchoption:"loginid",
        newquery: {
            "username": "",
            "accession_no":""
        },
        privilagedUser:"",
        dispMsg:"",
        queries: [],
        booklst: []
      }

      // handle user search
      handleusersearch = async(familyname, event) => {
       event.preventDefault();
      // email_id ? alert ("Empty") : alert("value is there")

       // const book_query_upper= book_query.toUpperCase();
       this.setState({dispMsg:""});

       const searchvalue = this.state.searchvalue;
       const searchoption= this.state.searchoption;
      // console.log ("Book Query Received", this.state.searchoption);

        if(searchvalue==="")
        {
          this.setState({dispMsg:"Enter the value to search"});
        }else{
    
        try {   
          const params = {
            "searchkey": searchvalue,
            "searchoption": searchoption,
            "familyName": familyname
            };
    
          console.log("PArams API", params);
         // const validateResponse = await axios.get(`${config.api.invokeUrl}/user/search?searchkey=${username}&searchoption=${searchoption}`, params);
         // const validateResponse = await axios.get(`${config.api.invokeUrl}/user/search`, { params:{searchparams}});
          const validateResponse = await axios.get(`${config.api.invokeUrl}/user/search`, { params});

          console.log("Validate Response :", validateResponse);
            if(validateResponse.data.length<1)
            {
              this.setState({dispMsg:"No Records found"});
            }else {
              console.log("Testing",validateResponse);
            }
         
        } catch (error) {
          console.log(`An error has occurred: ${error}`);
        }
      }
      }

      onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      //  document.getElementById(event.target.id).classList.remove("is-danger");
      };
    

    
    render() {
          
      return (
        <div>

        <ProductConsumer>
        {(value)=>{
                const {familyName, isAdmin, isLibrarian} = value;
return(
                <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader> Search User</CardHeader>
            <CardBody>
            <Form >
            <FormGroup>
                  <Label for="username">Search Options</Label>
                <p>  <Input
                    type="radio"
                    name="searchoption"
                    id="searchoption"
                    value="loginid"
                    checked
                    onChange={this.onInputChange}                    
                  />

                 <Label for="huey">Login ID</Label></p>
                 <p><Input
                    type="radio"
                    name="searchoption"
                    id="searchoption"
                    value="userfullname"
                    onChange={this.onInputChange}                    
                  />

                 <Label for="searchoption">User Name</Label></p>

                
                </FormGroup>


                             <FormGroup>
                  <Label for="username">Enter User Details : </Label>
                  <Input
                    type="text"
                    name="searchvalue"
                    id="searchvalue"

                    placeholder="Enter username to search..."
                    value={this.state.searchvalue} 
      
                    onChange={this.onInputChange}
                    
                  />
                </FormGroup>
            {this.state.dispMsg}
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button
                    onClick={event => this.handleusersearch(familyName, event)}
                    >Search User
                    </Button>
                  </Col>
                </FormGroup>


                
              </Form>
            </CardBody>
          </Card>
        </Col>

           
      </Row> 
      )
               }
              }

          </ProductConsumer>

    
    
            </div>
        )
    }
}
