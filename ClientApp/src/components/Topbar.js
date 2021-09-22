import React, { Component } from 'react'
import './topbar.css'
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import profilepic from '../images/reaper.png';
import logo from '../images/clique_logo_resize.png';
import {useHistory} from 'react-router-dom'

class Topbar extends Component{

  // handleLogout=(e)=>{

  //   const history = useHistory();
  // }
    render() {

      

  return <div className='topbarContainer'>
    <div className="topbarLeft">
    <img src={logo} alt="" className="logo"/>
    </div>
    <div className="topbarCenter">
      <div className="searchbar">
        <Search className="searchIcon" />
        <input
          placeholder="Search for friend, post or video"
          className="searchInput"
        />
      </div>
    </div>
    <div className="topbarRight">
    <div className="topbarLinks">
          <span className="topbarLink" >Logout</span>
          <span className="topbarLink">    Communities</span>
        </div>
      
      <img src={profilepic} alt="" className="topbarImg"/>
    </div>
  </div>
  
}
}
export default Topbar;
