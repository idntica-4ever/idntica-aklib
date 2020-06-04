import React, { Component } from 'react'


export default class BookHomeSearch extends Component {
   

bookSearch(){
    const book_query = this.state.book_query;
    return (
        book_query
    )
}



    render() {
        return (
            <div className="bookcontainer">
  
  <div className="col">

  
          <div class="wrap">

   <div class="search">
      <input type="text" className="searchTerm" placeholder="Search your books here..."  
      value={this.state.newquery.book_query} 
     />
      
     <button type="submit" className="searchButton">
      <i className="fa fa-search" />
     </button>
   </div>
</div>


      
    </div>
   
</div>

        )
    }
}
