import React, { Component } from 'react';
import Bookquery from './Bookquery';
//import {Link} from 'react-router-dom';
import axios from 'axios';


const config = require('../config.json');



export default class SearchList extends Component {
  
    
  state = {
    newquery: {
        "book_query": ""
    },
    queries: [],
    booklst: []
  }


  



  // handle global search
  handleglobalsearch = async(book_query, event) => {
    event.preventDefault();

    console.log ("Book Query Received", book_query);

    try {

      const params = {
        "book_query": book_query
      };

      console.log("Fetching API for query : ", book_query);
      book_query=encodeURIComponent(book_query);
      console.log("Encoded URL :", encodeURIComponent(book_query));
      //console.log("decoded URL :", decodeURIComponent(book_query));
      
      const res = await axios.get(`${config.api.invokeUrl}/books/global-book-search/${book_query}`, params);
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
    
        
        const booklist = this.state.queries && this.state.queries.length > 0
        ?this.state.queries.map(searchresult => <Bookquery Book_Title= {searchresult.Book_Title} 
          Book_Author={searchresult.Book_Author} Book_Classification_No={searchresult.Book_Classification_No} Book_Status={searchresult.Book_Status} Book_Scope={searchresult.Book_Scope} key={searchresult.Author_Title} />)
        : <div className="tile notification is-warning">NO BOOKS / AUTHOR found.... Try again...</div> 
       
    return (
     
           <div className="bookcontainer">
  
  <div className="col">

  <form onSubmit={event => this.handleglobalsearch(this.state.newquery.book_query, event)}>
          <div class="wrap">

   <div class="search">
      <input type="text" className="searchTerm" placeholder="Search your books here..."  
      value={this.state.newquery.book_query} 
      
      onChange={this.onAddBookQueryChange}/>
      
     <button type="submit" className="searchButton">
      <i className="fa fa-search" />
     </button>
   </div>
</div>

</form>
      
    </div>
   
    {booklist}
</div>

  )
 
  
 
}


}
