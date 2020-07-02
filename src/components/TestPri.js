import React, { Component } from 'react';
import Bookquery from './Bookquery';
//import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import { queries } from '@testing-library/react';


const config = require('../config.json');



export default class TestPri extends Component {
  
  constructor(props) {
    super(props);
  this.state = {
    
    newquery: {
        "book_query": ""
    },
    queries: [],
    
  }
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
    

     this.assignSearchedresults();
     // validating search results

    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  }


  assignSearchedresults = async () => {
  console.log("Assigning to Bookquery");
  console.log ("Number of results returned :", this.state.queries.length);
  const testing = this.state.queries && this.state.queries.length > 0
  ?this.state.queries.map(searchresult => <Bookquery Book_Title= {searchresult.Book_Title} 
    Book_Author={searchresult.Book_Author} Book_Classification_No={searchresult.Book_Classification_No} Book_Status={searchresult.Book_Status} Book_Scope={searchresult.Book_Scope} key={searchresult.author_title} />)
  : <div className="tile notification is-warning">NO BOOKS / AUTHOR found.... Try again...</div>   
  console.log("Testing value : ", testing);
  
  
  
  }

  onAddBookQueryChange = event => this.setState({ newquery: { ...this.state.newquery, 
    "book_query": event.target.value } });



  render() {
    
    return (
     
           <div className="bookcontainer">
  
  <div className="col">

  <form onSubmit={event => this.handleglobalsearch(this.state.newquery.book_query, event)}>
          <div class="wrap">
          <div className="row">
         
      <input type="text" className="col-11 form-control" placeholder="Search your books here..."  

      
      value={this.state.newquery.book_query} 
      
      onChange={this.onAddBookQueryChange}/>
      
     <button type="submit" className="col-1 searchButton">

      <i className="fa fa-search" />
     </button>
            
     
   </div>
</div>

</form>
      
 </div>
 <Table>
  <thead>
    <tr>
      <th>Book Title</th>
      <th>Author Name</th>
      <th>Clasification</th>
      <th>Status</th>
      <th>Scope</th>
    </tr>
  </thead>
  <tbody>
    <tr >
      
    </tr>
   
  </tbody>
</Table>
<Bookquery/> 
</div>

  )
 
  
 
}


}
