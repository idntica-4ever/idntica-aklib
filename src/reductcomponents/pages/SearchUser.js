import React, { Component } from 'react';
import UserDisplay from '../../components/UserDisplay';
import { Auth } from 'aws-amplify';
//import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import {ProductConsumer} from '../../Context';
import {Button,Card,CardBody,CardHeader,Col,Form,FormFeedback,FormGroup,FormText,Input,Label,Row,} from 'reactstrap';
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
        familyName:"",
        users: [],
        booklst: []
      }

      handleUpdateUser = async (loginid, user_role) => {
        //setting up new login account
       // await this.fetchUserId();
       // const now = new Date();
       // const username = user_name;
        // add call to AWS API Gateway update product endpoint here
        const familyname=this.state.familyName;
        const session = await Auth.currentSession();
      // console.log("Session :", session.accessToken.payload.username);
      // console.log("Session :", session.idToken.jwtToken);
      const access_token=session.idToken.jwtToken;
      const username=session.accessToken.payload.username;
      

        try {
          const params = {
            "loginid": loginid,
            "user_role":user_role,
            "familyname":familyname
          };
          console.log("Inputs received :", params);
          const userid=loginid
          //console.log("processing update for email ID : ", this.state.loginid);
          await axios.patch(`${process.env.REACT_APP_API_URL}/inigolibrary/users/manage/${userid}`, params,{
            headers: {
              Authorization: access_token,
              'x-api-key':process.env.REACT_APP_API_KEY
            }
          });
        //  this.handleSignUp(email_id);inigolibrary/users/manage/{userid}  
    
          const productToUpdate = [...this.state.users].find(searchresult => searchresult.loginid === loginid);
          const updatedProducts = [...this.state.users].filter(searchresult => searchresult.loginid !== loginid);
          productToUpdate.user_role = this.state.user_role;
          updatedProducts.push(productToUpdate);
          this.setState({users: updatedProducts});
          //this.fetchProducts();
        }catch (err) {
          console.log(`Error updating product: ${err}`);
        }
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
      const username=session.accessToken.payload.username;
      const familyname=this.state.familyName;

      if (username===loginid)
      {
      alert("You cannot delete your own account");
        }else{
      
       try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/inigolibrary/users/manage?loginid=${userid}&familyname=${familyname}`,{
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
      }
    

      // handle user search
      handleusersearch = async(familyname, event) => {
       event.preventDefault();
       this.setState({dispMsg:""});
       this.setState({users:[]});
       this.setState({familyName:familyname});
       const searchvalue = this.state.searchvalue;
       const searchoption= this.state.searchoption;
      const session = await Auth.currentSession();
      const access_token=session.idToken.jwtToken;
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
           const validateResponse = await axios.get(`${process.env.REACT_APP_API_URL}/inigolibrary/users/manage?searchkey=${searchvalue}&searchoption=${searchoption}&familyName=${familyname}`,{
            headers: {
              Authorization: access_token,
              'x-api-key':process.env.REACT_APP_API_KEY
            }
          });
            if(validateResponse.data.length<1)
            {
              this.setState({dispMsg:"No User Records found"});
            }else {
                this.setState({users:validateResponse.data})
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
          phoneno={searchresult.phoneno} user_role={searchresult.user_role}
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
