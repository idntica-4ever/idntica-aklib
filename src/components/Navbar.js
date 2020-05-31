import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
import { Auth } from 'aws-amplify';
import axios from "axios";
import Bookquery from './Bookquery';

const config = require('../config.json');



export default class Navbar extends Component {


  state = {
    newquery: {
        "book_query": ""
    },
    queries: []
  }



  //handle logout
  handleLogOut = async event => {
    event.preventDefault();
    try{
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      console.log(this);
      //Add home page redirection command
    }catch(error){
      console.log(error.message);
    }
  }

  // handle global search
  handleglobalsearch = async(book_query, event) => {
    event.preventDefault();

    console.log ("Book Query Received", book_query);

    try {

      const params = {
        "book_query": book_query
      };

      console.log("Fetching API");
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
  ?this.state.queries.map(searchresult => <Bookquery book_title= {searchresult.book_title} book_author={searchresult.book_author} status_key={searchresult.status_key} key={searchresult.author_title} />)
  : <div className="tile notification is-warning">NO BOOKS / AUTHOR found.... Try again...</div>  
  console.log("Testing value : ", testing);
  }


  onAddBookQueryChange = event => this.setState({ newquery: { ...this.state.newquery, "book_query": event.target.value } });

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
        <Link to='/'>
<img src={logo} style={{width:"8rem", height: "3rem"}} alt="library" className="navbar-brand"/>
</Link>
        </div>


        <div id="navbarBasicExample" className="navbar-menu">
          
          <div className="navbar-start">
          {!this.props.auth.isAuthenticated && (
            <div className="navbar-item">
            <a href="/" className="navbar-item">
              Home
            </a>
            
          
            </div>
          )}
          {this.props.auth.isAuthenticated && (
          <div className="navbar-item">
          <a href="/" className="navbar-item">
              Home
          </a>  
          </div>  
          )}
        </div>

        

       



          <div className="navbar-end">

          <form onSubmit={event => this.handleglobalsearch(this.state.newquery.book_query, event)}>
          <div class="wrap">

   <div class="search">
      <input type="text" className="searchTerm" placeholder="Search your books here..."  
      value={this.state.newquery.book_query} 
      onChange={this.onAddBookQueryChange}/>
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
     </button>
   </div>
</div>

</form>

            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                  <a href="/register" className="button is-primary">
                  <strong>Register</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                  </a>  
                  </div>  
                )}
                {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log Out
                  </a>  
                )}
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
