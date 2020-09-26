import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { Auth } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo1 from '../logo2.png'
import styled from 'styled-components';
import MobileNavbar from './MobileNavbar';
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
      <div className="navbar-fin">
 </div>
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