import React from 'react'
import "./createcom.css";
import New from '../../../images/sticker.png'
import Trend from '../../../images/trend.png'
import Top from '../../../images/arrow-up.png'
import {  useHistory } from 'react-router-dom'

export default function CreateCom() {
    const history=useHistory();
    function createpost(){
      localStorage.getItem("access_token") != null
      ?(window.location.href="/CreateCommunity")
      :(window.location.href="/Signin");
       

    }
  return (
    <div className="maincont">
    <div className="subcont">
      <div className="cont">
         
          <button className="create" onClick={createpost}>You can create communities here! Start Now!</button>
      </div>
    </div>
  </div>
  )
}