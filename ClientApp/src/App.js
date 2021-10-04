import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import ForgotPass from './Pages/ForgotPassword'
import NotFound from './Pages/NotFound'
import Landing from './Pages/LandingPage'
import NewPost from './Pages/NewPost'
import PrivatePage from './Pages/PrivatePage'
import InsidePost from './Pages/InsidePost'
import SeeCommunities from './Pages/SeeCommunities'
import CommunityDetails from './Pages/CommunityDetails'
import {BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  BrowserRouter} from "react-router-dom"
import LandingPage from './Pages/LandingPage';


class App extends Component{
  render(){
    return <BrowserRouter>
    <Router>
      <Switch>
      <Route exact path="/" component={LandingPage}></Route>
      <Route exact path="/Signup" component={Signup}></Route>
      <Route exact path="/ForgotPassword" component={ForgotPass}></Route>
      <Route exact path="/Signin" component={Signin}></Route>
      <Route exact path="/NewPost" component={NewPost}></Route>
      <Route exact path="/PrivatePage" component={PrivatePage}></Route>
      {/* inside post private route */}
      <Route exact path="/InsidePost/:id" component={InsidePost}></Route>
      <Route exact path="/SeeCommunities" component={SeeCommunities}></Route>
      <Route exact path="/CommunityDetails" component={CommunityDetails}></Route>
      <Route component={NotFound}></Route>
      <Redirect to ="/NotFound" />
      </Switch>
    </Router>
    </BrowserRouter> 
  }
 
}

export default App;
