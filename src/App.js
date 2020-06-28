import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import HomeContent from './components/HomeContent';
import Footer from './components/Footer';
import { Auth } from 'aws-amplify';
import TestPri from './components/TestPri';
//import Amplify, { Auth } from 'aws-amplify';
//import awsconfig from './aws-exports';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import Test from './components/Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from './components/Hero';
import SliderEffect from './components/SliderEffect';
import SearchListGirdView from './components/SearchListGirdView';
import SearchBar from './components/SearchBar'
import Search from './components/Search';
import SearchList from './components/SearchList';

import SignupForm from './components/auth/SignupForm';
import MainDashboardView from './components/test/MainDashboardView';




//Book adding details
import BookAdd from './components/BookAdd';
import BookIssue from './components/BookIssue';

//User management components
import NewUser from './components/usermanagement/NewUser';
import NewUserList from './components/usermanagement/NewUserList';
import WorkinProgress from './components/test/WorkinProgress';

//Amplify.configure(awsconfig);




//import { library } from '@fortawesome/fontawesome-svg-core';
//import { faEdit } from '@fortawesome/free-solid-svg-icons';


//library.add(faEdit);

class App extends Component {

  //AWS Cognitto code to declare global value to validate signed user

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

setAuthStatus = authenticated => {
  this.setState({isAuthenticated: authenticated});
}

setUser = user => {
  this.setState({user: user});
}

// to keep session active
async componentDidMount(){
  try{
    const session = await Auth.currentSession();
    this.setAuthStatus(true);
    console.log(session);
    const user = await Auth.currentAuthenticatedUser();
    this.setUser(user);
  }catch(error){
    console.log(error);
  }
  this.setState({ isAuthenticating:false});
}

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }

    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps} />
            <Switch>
             
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
              <Route exact path="/signup" render={(props) => <SignupForm {...props} auth={authProps} />} />
              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
              <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
              <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
              <Route exact path="/welcome" render={(props) => <MainDashboardView {...props} auth={authProps} />} />
              <Route exact path="/bookadd" render={(props) => <BookAdd {...props} auth={authProps} />} />
              <Route exact path="/bookissue" render={(props) => <BookIssue {...props} auth={authProps} />} />
              <Route exact path="/newuser" render={(props) => <NewUser {...props} auth={authProps} />} />

              <Route exact path="/search" render={(props) => <TestPri {...props} auth={authProps} />} />
             
              <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
              <Route exact path="/newuserlist" render={(props) => <MainDashboardView {...props} auth={authProps} />} />
              
            </Switch>
           
          </div>
          
         
         
    
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
