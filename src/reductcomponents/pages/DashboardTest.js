import React, { Component } from 'react';
import Page from '../../components/AdminView/Page';
import Bookquery from '../../components/Bookquery';
import {Auth} from "aws-amplify";

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
  require('dotenv').config();

  const userquery='';

var firstName, secondName="";  
const config = require('../../config.json');
var key_value=0;
export default class DashboardTest extends Component {

    
  state = {
    newbook: {  
    "Accession_No": "",
    "Author_Title": "",
    "Book_Author":"",
    "Book_Author_First": "",
    "Book_Author_Second":"",
    "Book_Classification_No": "",
    "Publishing_Year": "",
    "Book_Publisher_Price": "",
    "Book_Scope": "",
    "Book_Status": "",
    "Book_Title": "",
    "PK": "",
    "firstName":"",
    "secondName":"",
    "Search_Value":""
    },
    Search_Output_Msg:"",
    newbooks: [],
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

componentDidMount(){
    this.handleFetchDetails();
}


//fetching books for the user
handleFetchDetails = async () => {
        // add call to AWS API Gateway to fetch products here
        try {
          const session = await Auth.currentSession();
         // console.log("Session :", session.accessToken.payload.username);
         // console.log("Session :", session.idToken.jwtToken);
         const access_token=session.idToken.jwtToken;
          const username=session.accessToken.payload.username;
       console.log("Username :", username);
          await axios.get(`${process.env.REACT_APP_API_URL}/books/bookings/${username}`).then((response) => {
           console.log("Response : ", response);
            if(response.data.length>0)
            {
                console.log("Data fetched : ",response);
            this.setState({queries:response.data});
            }
          }, (error) => {
            console.log("Error : ", error);
          });
         //console.log("inside if", res.data.length);
          } catch (err) {
          console.log(`An error has occurred: ${err}`);
        }  
      
}
  // handle global search
  handlebooksearch = async(accession_no, event) => {
    event.preventDefault();
    this.setState({Search_Output_Msg:""});
    //console.log ("Book Query Received", accession_no);

    try {

      const params = {
        "Accession_No": accession_no
      };

     // console.log("Fetching API");
     // book_query=encodeURIComponent(book_query);
      const res = await axios.get(`${config.api.invokeUrl}/books/${accession_no}`, params);
     // console.log("Fetching API for query : ", book_query);
      //book_query=encodeURIComponent(book_query);
      //console.log("Encoded URL :", encodeURIComponent(book_query));
      if (res.data.length>0) 
      {
      this.setState({Book_Author:res.data[0].Book_Author});
      const name=res.data[0].Book_Author;
      firstName = name.substr(0, name.indexOf(" "));
      secondName = name.substr(name.indexOf(" ")+1, name.length);
      this.setState({firstName:firstName});
      this.setState({secondName:secondName});
      this.setState({Book_Title:res.data[0].Book_Title});
      this.setState({Accession_No:res.data[0].Accession_No});
      this.setState({Book_Classification_No:res.data[0].Book_Classification_No});
      this.setState({Book_Publisher:res.data[0].Book_Publisher});
      this.setState({Book_Scope:res.data[0].Book_Scope});
      this.setState({Publishing_Year:res.data[0].Publishing_Year});
      //console.log("Book Author :", res.data[0].Book_Author);
     //this.setState({ newbooks: res.data });
     console.log("Books received :" , res.data);
    //alert("Book Successfully Updated");
      }
      else{
        this.setState({Search_Output_Msg:"No Records Found"});
      }
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  }

  onAddBookAccessionNoChange = event => this.setState({ newquery: { ...this.state.newquery, 
    "accession_no": event.target.value } });


  handleUpdateSubmit = async (event) => {

    //console.log ("Function invoked");

    //this.fetchProducts();
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      //  console.log("inside try");
       const book_authorF_upper= this.state.firstName.toUpperCase();
       const book_authorS_upper= this.state.secondName.toUpperCase();
       const book_booktitle_upper=this.state.Book_Title.toUpperCase();
       const book_cls_upper= this.state.Book_Classification_No.toUpperCase();
       const accession_no=this.state.Accession_No;
      const params = {
    "Accession_No": this.state.Accession_No,
    "Book_Author": book_authorF_upper + " " + book_authorS_upper,
    "Author_Title": book_authorF_upper + " " + book_authorS_upper + "##" + " " + book_booktitle_upper,
    "Book_Classification_No": book_cls_upper,
    "Book_Publisher": this.state.Book_Publisher,    
    "Book_Scope": this.state.Book_Scope,
    "Book_Title": book_booktitle_upper,
    "Publishing_Year":this.state.Publishing_Year,
    "PK": "AKLibrary"
      };
     // console.log("Inputs received :", params);
      await axios.patch(`${config.api.invokeUrl}/books/${accession_no}`, params);
      //this.setState({ newbooks: [...this.state.newbooks, this.state.newbook] });
      this.setState({ "Accession_No":"", "firstName":"", "secondName":"", "Author_Title": "", "Publishing_Year":"", "Book_Author": "", "Book_Classification_No": "", "Book_Publisher": "", "Book_Scope": "" , "Book_Status": "", "Book_Title": "", "PK": ""});
     console.log("Books Updated Successfully");
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  //  console.log("Value :", event.target.value);
//this.setState({selectedValue:value});
  };


  onAddBookTitleChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Title": event.target.value } });
  onAddBookAuthorChangeFirst = event => this.setState({ newbook: { ...this.state.newbook, "Book_Author_First": event.target.value } });
  onAddBookAuthorChangeSecond = event => this.setState({ newbook: { ...this.state.newbook, "Book_Author_Second": event.target.value } });

  onAddBookAccessionNoChange = event => this.setState({ newbook: { ...this.state.newbook, "accession_no": event.target.value } });
  onAddBookClassificationNoChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Classification_No": event.target.value } });
  onAddBookPublisherChangeYear = event => this.setState({ newbook: { ...this.state.newbook, "Book_Publisher_Year": event.target.value } });
  onAddBookPublisherChangePrice = event => this.setState({ newbook: { ...this.state.newbook, "Book_Publisher_Price": event.target.value } });

  onAddBookScopeChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Scope": event.target.value } });

  
 
    render() {
        
        const booklist = this.state.queries && this.state.queries.length > 0
        ?this.state.queries.map(searchresult => <Bookquery Book_Title= {searchresult.Book_Title} 
          Book_Author={searchresult.Book_Author} Book_Classification_No={searchresult.Book_Classification_No} Book_Status={searchresult.Book_Status} Book_Scope={searchresult.Book_Scope} key={searchresult.author_title} />)
        : <div className="tile notification is-warning">NO BOOKS / AUTHOR found.... Try again...</div>   

        return (
            <div className="container">
  
  


            <Page title="Dashboard" breadcrumbs={[{ name: 'Dashboard', active: true }]}>
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
    
    </Page>
    </div>
        )
    }
}
