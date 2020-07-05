import Page from '../../components/AdminView/Page';
import React, { Component, Fragment } from 'react';
import axios from "axios";
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, FormText, Input, Label, Row, } from 'reactstrap';

const config = require('../../config.json');
var key_value=0;
export default class AddBook extends Component {

  state = {
    newbook: {  
    "accession_no": "",
    "Author_Title": "",
    "Book_Author":"",
    "Book_Author_First": "",
    "Book_Author_Second":"",
    "Book_Classification_No": "",
    "Book_Publisher_Year": "",
    "Book_Publisher_Price": "",
    "Book_Scope": "",
    "Book_Status": "",
    "Book_Title": "",
    "PK": ""
    },
    newbooks: []

  }
// upercase function
toUpperCase = () => {
  const upperCase = this.state.text.toUpperCase();
  this.setState({
      text: upperCase
  });
}
  handleAddBook = async (accession_no, event) => {

    console.log ("Function invoked");

    //this.fetchProducts();
     console.log("function invoked", key_value);
      //console.log("accession No received : ",accession_no);
      //const test = document.getElementById("accessionNo").value
      //console.log ("Data from input field : ", test);
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
        console.log("inside try");
     accession_no=key_value.toString();
     // accession_no="333";
       const now = new Date();
       const book_authorF_upper= this.state.newbook.Book_Author_First.toUpperCase();
       const book_authorS_upper= this.state.newbook.Book_Author_Second.toUpperCase();
       const book_booktitle_upper=this.state.newbook.Book_Title.toUpperCase();
       const book_cls_upper= this.state.newbook.Book_Classification_No.toUpperCase();
      



      const params = {
    "Accession_No": accession_no,
    "Book_Author": book_authorF_upper + " " + book_authorS_upper,
    "Author_Title": book_authorF_upper + " " + book_authorS_upper + "##" + " " + book_booktitle_upper,
    "Book_Classification_No": book_cls_upper,
    "Book_Publisher": this.state.newbook.Book_Publisher,    
    "Book_Scope": this.state.newbook.Book_Scope,
    "Book_Status": "Available",
    "Book_Title": book_booktitle_upper,
    "updated_on": now,
    "PK": "AK_Library#001"
      };

      console.log("Inputs received :", params);
      console.log("accession No : ",accession_no);
      await axios.post(`${config.api.invokeUrl}/books/${accession_no}`, params);
      this.setState({ newbooks: [...this.state.newbooks, this.state.newbook] });
      this.setState({ newbook: { "Accession_No":"", "Author_Title": "", "Book_Author": "", "Book_Classification_No": "", "Book_Publisher": "", "Book_Scope": "" , "Book_Status": "", "Book_Title": "", "PK": ""}});
      console.log("Books Added Successfully");
      alert ("Book Added Successfully");
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

   fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/books`);
     // console.log("data received : ", res);
     // console.log("res data : ", res.data);
      console.log("data received : ", res.data.LastEvaluatedKey.Accession_No);
      key_value = (res.data.LastEvaluatedKey.Accession_No);
      key_value=(key_value*1)+1;
    
      //console.log ("Key value details :", key_value);
      //alert ("Total records", key_value);
      //const products = res.data;
      //this.setState({ products: products });
      //return key_value;
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }

    
  }
 

  onAddBookTitleChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Title": event.target.value } });
  onAddBookAuthorChangeFirst = event => this.setState({ newbook: { ...this.state.newbook, "Book_Author_First": event.target.value } });
  onAddBookAuthorChangeSecond = event => this.setState({ newbook: { ...this.state.newbook, "Book_Author_Second": event.target.value } });

  onAddBookAccessionNoChange = event => this.setState({ newbook: { ...this.state.newbook, "accession_no": event.target.value } });
  onAddBookClassificationNoChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Classification_No": event.target.value } });
  onAddBookPublisherChangeYear = event => this.setState({ newbook: { ...this.state.newbook, "Book_Publisher_Year": event.target.value } });
  onAddBookPublisherChangePrice = event => this.setState({ newbook: { ...this.state.newbook, "Book_Publisher_Price": event.target.value } });

  onAddBookScopeChange = event => this.setState({ newbook: { ...this.state.newbook, "Book_Scope": event.target.value } });

  
  componentDidMount = () => {
    key_value = this.fetchProducts();
  }

render() {

  return (
    <Page title="Add Book" breadcrumbs={[{ name: 'New Book', active: true }]}>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Book Details</CardHeader>
            <CardBody>
            <form onSubmit={event => this.handleAddBook(this.state.newbook.accession_no, event)}> 
            <FormGroup>
                  <Label for="accessionNo">Accession No</Label>
                  <Input
                    type="text"
                    name="accessionNo"
                    value={key_value}
                    
                    onChange={this.onAddBookAccessionNoChange}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="bookTitle">Book Title</Label>
                  <Input
                    type="text"
                    name="booktitle"
                    placeholder="Book Title"
                    value={this.state.newbook.Book_Title}
                    onChange={this.onAddBookTitleChange}  
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="bookAuthor">Author</Label>
                  <Input
                    type="text"
                    name="AuthorFN"
                    placeholder="First Name"
                    value={this.state.newbook.Book_Author_First}
                    onChange={this.onAddBookAuthorChangeFirst}
                      
                  />
                  <Input
                    type="text"
                    name="AuthorSN"
                    placeholder="Second Name"
                    value={this.state.newbook.Book_Author_Second}
                    onChange={this.onAddBookAuthorChangeSecond}
                      
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="clsNo">Classification</Label>
                  <Input
                    type="text"
                    name="cls"
                    id="clsId"
                    placeholder="Classification"
                    value={this.state.newbook.Book_Classification_No}
                    onChange={this.onAddBookClassificationNoChange}
                      
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="clsNo" >Department</Label>
                  
                </FormGroup>
                <FormGroup>
                  <Label for="scope">Scope</Label>
                  <Input type="select" name="scope"
                   value={this.state.newbook.Book_Scope}
                   onChange={this.onAddBookScopeChange}
                     
                  >
                    <option>Circulation</option>
                    <option>Reference</option>
                  </Input>
                </FormGroup>
                
                <FormGroup>
                  <Label for="publication">Publication</Label>
                  <Input
                    type="text"
                    name="publication"
                    placeholder="Publication"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="location">Location</Label>
                  <Input
                    type="text"
                    name="location"
                    placeholder="Location"
                  />
                  </FormGroup>
                
                <FormGroup>
                  <Label for="yop">Year of Publication</Label>
                  <Input
                    type="number"
                    type='number'
                      min={1000}
                      max={9999}
                    placeholder="Year of Publication"
                    value={this.state.newbook.Book_Publisher_year}
                    onChange={this.onAddBookPublisherChangeYear}
                      
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
  );
};
};
