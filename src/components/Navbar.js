import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
import { Auth } from 'aws-amplify';






export default class Navbar extends Component {


 


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



  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
        <Link to='/'>

</Link>
        </div>


        <div id="navbarBasicExample" className="navbar-menu">
          
          <div className="navbar-start">
          {!this.props.auth.isAuthenticated && (
            <div className="navbar-item">
            <a href="/" className="button is-primary">
              Home
            </a>
            
          
            </div>
          )}
          {this.props.auth.isAuthenticated && (
          <div className="navbar-item">
          <a href="/" className="button is-primary">
              Home
          </a>  
          </div>  
          )}
        </div>

        

       



          <div className="navbar-end">

        

            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/newuser" className="button is-primary">
                   <strong>New User ?</strong>
                   </a>

                  <a href="/login" className="button is-light">
                    Log in
                  </a>  
                  </div>  
                )}
                {this.props.auth.isAuthenticated && (
                   <div>
                   <a href="/register" className="button is-primary">
                   <strong>User Registration</strong>
                   </a>

                   <a href="/bookadd" className="button is-primary">
                   <strong>Book Registration</strong>
                   </a>
                   <a href="/bookissue" className="button is-primary">
                   <strong>Issuing Books</strong>
                   </a>

                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log Out
                  </a>  
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
