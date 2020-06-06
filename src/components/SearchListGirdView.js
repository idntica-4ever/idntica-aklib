import React, { Component } from 'react';
import Bookquery from './Bookquery';
import {Table} from 'react-bootstrap';
//import {Link} from 'react-router-dom';
import axios from 'axios';
import '../Search.css';
import SearchBar from './SearchBar';


const config = require('../config.json');

export default class SearchListGirdView extends Component {
      
        
      state = {
          post:{
           query:""
          },
       
        booklist1: []
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
          const res = await axios.get(`${config.api.invokeUrl}/books/global-book-search/${book_query_upper}`, params);
          this.setState({ queries: res.data });
         console.log("Fetched Data", this.state.queries);
    
         this.assignSearchedresults();
         // validating search results
    
        } catch (error) {
          console.log(`An error has occurred: ${error}`);
        }
      }
    
    
    
      onAddBookQueryChange = event => this.setState({ newquery: { ...this.state.newquery, 
        "book_query": event.target.value } });
    
    
    
      render() {
        if (this.state.queries) {
            const {booklist1} = this.state;
      
           
               
                    return (
                       
                        <Table className="mt-4" striped bordered bover size="sm">
                            <thead>
                                <tr>
                                    <th>Book Title</th>
                                    <th>Author</th>
                                    <th>Classification</th>
                                    <th>Scope</th>
                                    <th>Status</th>
                                </tr>

                            </thead>
                            <tbody>
                           {booklist1.map
               (result=>
                            
                            <tr key={result.Author_Title}>
                           
                                <td>
                                {result.Book_Title} 
                                </td>
                                <td>
                                {result.Book_Author}
                                </td>
                                <td>
                                {result.Book_Classification_No}
                                </td>
                                <td>
                                {result.Book_Scope} 
                                    </td>
                               <tr> {result.Book_Status}
                                   </tr>
                      
                                
                                
                            </tr>
                            )}
                            
                            
                            </tbody>
                        </Table>

                      
                       
                    )
               }
                
                
       }}