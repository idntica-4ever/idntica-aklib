import React, { Component } from 'react';
import logo1 from '../logo2.png';
import styled from 'styled-components';
import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem
    } from "reactstrap";
import {Link} from 'react-router-dom';
import { Auth } from 'aws-amplify';


export default class MobileNavbar extends Component {
    
    
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
      console.log(this);
      //Add home page redirection command
    }catch(error){
      console.log(error.message);
    }
  }
    
    
    constructor(props) {
        super(props);
    
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.closeNavbar = this.closeNavbar.bind(this);
        this.state = {
        collapsed: true
        };
    }
    
    toggleNavbar() {
        this.setState({
        collapsed: !this.state.collapsed
        });
    }
    
    closeNavbar() {
        if (this.state.collapsed == true) {
        this.toggleNavbar();
        }
    }
    
    render() {
        return (
            <div className="navbar-fin">
                 <div className="navbar-bg">
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

  
  </div>
  <div className="navbar-mobile">
  <Navbar className="navigation__navbar" light expand="md">
    <div className="brand_name">
    <center>ARULKADAL INIGO LIBRARY <br></br>
   

   அருள்கடல் இனிகோ நூலகம் </center>    
    </div>
       
           <NavbarToggler onClick={this.toggleNavbar}  />
            <Collapse isOpen={!this.state.collapsed} navbar>   
            <Nav className="ml-auto" navbar> 
                
           
  

                <NavItem>
                    
                    {!this.props.auth.isAuthenticated && (    
                   
                    <Link  className="nav-link navigation__navlinks" to="/"
                    onClick={this.toggleNavbar} >
                          Home
                    </Link>
                   
                     )

                     }
                    
                     {this.props.auth.isAuthenticated && ( 
                        <Link  className="nav-link navigation__navlinks" to="/newuserlist">
                        Home
                    </Link>
                    )} 
                    {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p className="nav-link">
                  Hello {this.props.auth.user.username}
                </p>
               
              )} 
                 </NavItem>      

<NavItem>
                 
{!this.props.auth.isAuthenticated && (
                  <Link  className="nav-link navigation__navlinks" 
                  onClick={this.toggleNavbar} 
                  to="/login">
                  Login
              </Link>
                 
                )}
                
{this.props.auth.isAuthenticated && (
                   <div>
                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log Out
                  </a>  
                    
                    
                  

                  </div>
                )}

</NavItem>

<NavItem>
                 

                 <Link 
                   onClick={this.toggleNavbar} 
                  className="nav-link navigation__navlinks" to="/signup">
                 Register
             </Link>
                
             

</NavItem>

                 <NavItem>
                 

                  <Link  
                   onClick={this.toggleNavbar} 
                  className="nav-link navigation__navlinks" to="/search">
                  Search
              </Link>
                 
              

</NavItem>

</Nav>
                </Collapse>
            
         
            </Navbar>
            </div>
  </div>
  
        );
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