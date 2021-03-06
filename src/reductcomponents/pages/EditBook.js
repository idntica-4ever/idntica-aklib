import React, { Component } from 'react';
import Page from '../../components/AdminView/Page';
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

var firstName, secondName="";  
const config = require('../../config.json');
var key_value=0;
export default class EditBook extends Component {

    
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
  
  


            <Page title="Edit Book" breadcrumbs={[{ name: 'Edit Book', active: true }]}>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Book Details</CardHeader>
            <CardBody>
            <form onSubmit={event => this.handlebooksearch(this.state.Search_Value, event)}>
         
     
         <input type="text" className="search-input-ed" 
         placeholder="Enter the Accession No to Search"  
         name="Search_Value"
         value={this.state.Search_Value}          
         onChange={this.handleChange}/>
         
        <button type="submit" className="searchButton">
   
         <i className="fa fa-search" /> Search
        </button>
               
     <h3>  {this.state.Search_Output_Msg} </h3>
    
   
   </form>
            <form onSubmit={event => this.handleUpdateSubmit(event)}> 
            <FormGroup>
                  <Label for="accessionNo">Accession No</Label>
                  <Input
                    type="text"
                    name="Accession_No"
                    value={this.state.Accession_No}
                    
                    onChange={this.handleChange}
                    disabled
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="bookTitle">Book Title</Label>
                  <Input
                    type="text"
                    name="Book_Title"
                    placeholder="Book Title"
                    value={this.state.Book_Title}

                    onChange={this.handleChange}  
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="bookAuthor">Author</Label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                      
                  />
                  <Input
                    type="text"
                    name="secondName"
                    placeholder="Second Name"
                    value={this.state.secondName}
                    onChange={this.handleChange}
                      
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="clsNo">Classification</Label>
                  <Input
                    type="text"
                    name="Book_Classification_No"
                    id="clsId"
                    placeholder="Classification"
                    value={this.state.Book_Classification_No}
                    onChange={this.handleChange}
                      
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="clsNo" >Department</Label>
                  
                </FormGroup>
                <FormGroup>
                  <Label for="scope">Scope</Label>
                  <Input type="select" name="Book_Scope"
                   value={this.state.Book_Scope}
                   onChange={this.handleChange}
                     
                  >
                    <option>Circulation</option>
                    <option>Reference</option>
                  </Input>
                </FormGroup>
                
                <FormGroup>
                  <Label for="publication">Publication</Label>
                  <Input
                    type="text"
                    name="Book_Publisher"
                    value={this.state.Book_Publisher}
                    onChange={this.handleChange}
                 
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="location">Location</Label>
                  <Input
                    type="text"
                    name="location"
                  />
                  </FormGroup>
                
                <FormGroup>
                  <Label for="yop">Year of Publication</Label>
                  <Input
                    type="number"
                    name="Publishing_Year"
                      min={1000}
                      max={9999}
                    value={this.state.Publishing_Year}
                    onChange={this.handleChange}
                      
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="number"
                    name="price"
                    
                    placeholder="Price"
                    value={this.state.newbook.Book_Publisher_Price}
                    onChange={this.onAddBookPublisherChangePrice}
                    
                  />
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>
              </form>
            </CardBody>
          </Card>
        </Col>           
      </Row>
    </Page>
    </div>
        )
    }
}
