import axios from 'axios'
import React from 'react'
import {useNavigate } from 'react-router-dom'


export const VerifyContext=React.createContext();

export const VerifyToken=(token)=>{
   
  axios.post("http://192.168.8.100:8000/api/token/verify/",{token:token}).then(
      response=>{
        if (response.status===401){
          console.log('expired')
          
        }else {console.log('still valable')}
      
      
      }
  ).catch(err=>{
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("id");
   

  }) 
}
