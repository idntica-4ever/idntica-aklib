import React, { Component } from 'react';

import {Table} from 'react-bootstrap';
//import {Link} from 'react-router-dom';
import axios from 'axios';
import '../Search.css';
import Form from "./Form";


const config = require('../config.json');

export default class SearchListGirdView extends Component {
      
        
  constructor(props) {
    super(props);
    this.state = {
          booklists: [],
          newquery:{
           book_query:""
          }
       
        
      };
    }
    
     
     
    // upercase function
      toUpperCase = () => {
        const upperCase = this.state.text.toUpperCase();
        this.setState({
            text: upperCase
        });
    }
    
    
    

      // handle global search
      handleglobalsearch =async(book_query) => {
        this.setState(prevState => ({
          booklists: [...prevState.booklists, prevState.newquery],
          newquery: { book_query: ""}
        }));
       const bookquery=this.state.newquery;
        
        
        console.log ("Book Query Received", bookquery);
    
        try {
    
          const params = {
            "book_query": book_query
          };
    
          console.log("Fetching API");
          const res = await axios.get(`${config.api.invokeUrl}/books/global-book-search/${bookquery}`, params);
          this.setState({ queries: res.data });
         console.log("Fetched Data", this.state.queries);
    
         this.assignSearchedresults();
         // validating search results
    
        } catch (error) {
          console.log(`An error has occurred: ${error}`);
        }
      }
    
    
      onAddBookQueryChange = e => {
        const { book_query, value } = e.target;
        this.setState(prevState=>({ 
          newquery: { ...prevState.newquery, [book_query]: value } }))
        
        };
    
    
    
      render() {
       
      
          
               
                    return (<div >
                      <Form
                      onAddBookQueryChange={this.onAddBookQueryChange}
                      newquery={this.state.newquery}
                      handleglobalsearch={this.handleglobalsearch}
                    />
                      
                      <div className="post-container">
          <ul>
            {this.state.booklists.map((booklist, Author_Title) => (
              <li key={Author_Title}>
                <ul className="post-tile">
                  <li className="post-tile-name">{booklist.Book_Title}</li>
                  
                </ul>
              </li>
            ))}
          </ul>
        </div>

                  </div>
                      
                       
                    )
               }
                
              } 