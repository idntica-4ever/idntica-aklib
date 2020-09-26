import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { Auth } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo1 from '../logo2.png'
import styled from 'styled-components';

import {ButtonContainer} from "./Button";
import SliderEffect from './SliderEffect'
import {Button, Collapse} from 'react-bootstrap'






export default class Navbar extends Component {

  state={ 
    open:false
   }

  //handle logout
  handleLogOut = async event => {
    event.preventDefault();
    try{
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      this.props.auth.setAdmin(false);
      console.log(this);
      this.props.history.push("/search");

      //Add home page redirection command
    }catch(error){
      console.log(error.message);
    }
  }


  render() {
    return (
      
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
     <div className="nav-logo">
<Link to='/'>

<img src={logo1} style={{width:"7rem", height: "5rem"}} alt="store" className="navbar-brand-ak"/>

</Link></div>
<ul className="navbar-nav align-items-center" >
<li className="nav-item ml-5">
<Link to='/' className="nav-link-title">
  <center>ARULKADAL INIGO LIBRARY</center>
   

</Link>

<Link to='/' className="nav-link-title">

அருள்கடல் இனிகோ நூலகம் 
</Link>
</li>



</ul>


               
<header className="top-navbar">
          <nav className="navbar1 navbar-expand-lg navbar-light bg-light">
              
                <ul className="navbar-nav ml-auto">
                {!this.props.auth.isAuthenticated && (    
              <li className="nav-item active"><a className="nav-link" href="/" >Home</a></li>
              )}
              {this.props.auth.isAuthenticated && ( 

<li><a href="/newuserlist" className="nav-link">Home</a></li>

)}

{this.props.auth.isAuthenticated && this.props.auth.user && (
                <p className="nav-link">
                  Hello {this.props.auth.user.username}
                </p>
              )}


                
{!this.props.auth.isAuthenticated && (
                  <div>
                  
                  <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>

                  </div>  
                )}

{this.props.auth.isAuthenticated && (
                   <div>
                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log Out
                  </a>  
                    
                    
                  

                  </div>
                )}

                 
                  <li className="nav-item"><a className="nav-link" href="/signup">Register</a></li>

                  <li className="nav-item"><a className="nav-link" href="/search">Search</a></li>
                </ul>
              
           
        </nav></header>
          
   
    
   

 


  </NavWrapper>

  

     
    )
  }
}
const NavWrapper = styled.nav `
background: var(--mainBlue);
.nav-link {
 color: var(--mainWhite) !important;
 font-size: 1.3rem;
 text-transform: capitalize;
    
}


`