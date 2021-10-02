import React, { Component } from 'react'
import './topbar.css'
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import profilepic from '../../../images/reaper.png';
import logo from '../../../images/clique_logo_resize.png';
import { withRouter } from 'react-router-dom'

class Topbar extends Component{

    logout=(e)=>{

    const { history } = this.props;
    localStorage.clear();
    history.push('/Signin');
   }
   
    render() {
      const { history } = this.props;
       

  return <div className='topbarContainer'>
    <div className="topbarLeft">
    <img src={logo} alt="" className="logo"/>
    </div>
    <div className="topbarCenter">
      <div className="searchbar">
        <Search className="searchIcon" />
        <input
          placeholder="Search for communities"
          className="searchInput"
        />
      </div>
    </div>
    <div className="topbarRight">
    <div className="topbarLinks">

          
          <button className="topbarLink" onClick={this.logout}>Logout</button>
        </div>
      
      <img src={profilepic} alt="" className="topbarImg"/>
    </div>
  </div>
  
}
}
export default withRouter(Topbar);
