import React, { Component } from 'react'

export default ({ post, handleglobalsearch, onAddBookQueryChange }) => {
    return (
                  
            <div className="bookcontainer">
   
   <div className="col">
 
   <form >
           <div class="wrap">
 
    <div class="search">
       
       <input type="text" className="searchTerm" placeholder="Search your books here..."  
 
       name="book_query"
       value={post.book_query} 
       
       onChange={onAddBookQueryChange}/>
       
      <button type="submit" className="searchButton" onClick={handleglobalsearch}>
 
       <i className="fa fa-search" />
      </button>
             
      
    </div>
 </div>
 
 </form>
       
     </div>
   
         
       
     
 </div>
 
   
        )
    }

