import React, { Component } from 'react';
import UserDisplay from '../../components/UserDisplay';
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
  require('dotenv').config();

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
        users: [],
        booklst: []
      }

      handleDeleteUser = async (loginid, event) => {
        event.preventDefault();
        // add call to AWS API Gateway delete product endpoint here
        console.log ("Delete request received for email ID :", loginid);
       // const username = user_name;
       const userid=loginid;
       const session = await Auth.currentSession();
      // console.log("Session :", session.accessToken.payload.username);
      // console.log("Session :", session.idToken.jwtToken);
      const access_token=session.idToken.jwtToken;
      
       try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/inigolibrary/users/manage/${userid}`,{
            headers: {
              Authorization: access_token,
              'x-api-key':process.env.REACT_APP_API_KEY
            }
          });
          const updatedProducts = [...this.state.users].filter(searchresult => searchresult.loginid !== loginid);
          this.setState({users: updatedProducts});
        }catch (err) {
          console.log(`Unable to delete product: ${err}`);
        }
      }
    

      // handle user search
      handleusersearch = async(familyname, event) => {
       event.preventDefault();
      // email_id ? alert ("Empty") : alert("value is there")

       // const book_query_upper= book_query.toUpperCase();
       this.setState({dispMsg:""});
       this.setState({users:[]});

       const searchvalue = this.state.searchvalue;
       const searchoption= this.state.searchoption;
      // console.log ("Book Query Received", this.state.searchoption);
      const session = await Auth.currentSession();
      // console.log("Session :", session.accessToken.payload.username);
      // console.log("Session :", session.idToken.jwtToken);
      const access_token=session.idToken.jwtToken;
      // const orderedby=session.accessToken.payload.username;
    

        if(searchvalue==="")
        {
          this.setState({dispMsg:"Enter the value to search"});
        }else{
    
        try {   
          const searchParams = {
            "searchkey": searchvalue,
            "searchoption": searchoption,
            "familyName": familyname
            };
    
          console.log("PArams API", searchParams);
         // const validateResponse = await axios.get(`${config.api.invokeUrl}/user/search?searchkey=${username}&searchoption=${searchoption}`, params);
         // const validateResponse = await axios.get(`${config.api.invokeUrl}/user/search`, { params:{searchparams}});
          const validateResponse = await axios.get(`${process.env.REACT_APP_API_URL}/inigolibrary/users/manage?searchkey=${searchvalue}&searchoption=${searchoption}&familyName=${familyname}`,{
            headers: {
              Authorization: access_token,
              'x-api-key':process.env.REACT_APP_API_KEY
            }
          });

        //  console.log("Validate Response :", validateResponse);
            if(validateResponse.data.length<1)
            {
              this.setState({dispMsg:"No User Records found"});
            }else {
                this.setState({users:validateResponse.data})
             // console.log("Testing",validateResponse);
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
          {this.state.users.length>0?
          <div>
          <Table >
                        <tbody>
                          <tr>
                          <th className="table-head-btitle">LogIn ID</th>
                          <th className="table-head-atitle">User Name</th>
                          <th className="table-head-cls">Email</th>
                          <th className="table-head-cls">Phone</th>
                          <th className="table-head-cls">Role</th>
                          <th className="table-head-cls">Status</th>


                          </tr>
    
                        
                  </tbody></Table>   
                  {this.state.users && this.state.users.length > 0
        ?this.state.users.map(searchresult => <UserDisplay loginid= {searchresult.loginid} 
          userfullname={searchresult.userfullname} emailid={searchresult.emailid} 
          phoneno={searchresult.phoneno} role={searchresult.role}
          status={searchresult.account_status} 
          handleUpdateUser={this.handleUpdateUser}
          handleDeleteUser={this.handleDeleteUser} 
          key={searchresult.loginid} />)
        : <div className="tile notification is-warning">NO User Records Found </div>  }
                  
    </div>:<div className="tile notification is-warning">{this.state.dispMsg}</div>}
            </div>
        )
    }
}
