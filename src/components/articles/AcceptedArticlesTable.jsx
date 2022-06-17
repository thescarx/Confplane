import React from 'react'
import { useState, useEffect } from "react";
import "./Articles.css";
import axios from "axios";
import dateFormat from "dateformat";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import uzCyrl from 'date-fns/locale/uz-Cyrl/index';


function AcceptedArticlesTable() {
  const [state, setState] = useState({});
  const [data, setData] = useState([]);
  const [bool, setBool] = useState(false);
  const accesToken = localStorage.getItem("token");



  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${accesToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const {id} = useParams();


  useEffect(() => {
    let url ="http://localhost:8000/articles/listforchairman/path/?conference_id="+id+"&status=accepted"; 
    console.log(url)
    axios
      .get(url)
      .then((response) => {setData(response["data"])})

  }, [bool]);

  // const handleDecline = (id) => {
  //   axios
  //     .put("http://localhost:8000/articles/" + id, { status: "refused" })
  //     .then(() => {
  //       console.log("done");
  //     });
  // };
  // const handleAccept = (id) => {
  //   axios
  //     .put("http://localhost:8000/articles/" + id, {
  //       status: "accepted to review",
  //     })
  //     .then(() => {
  //       console.log("done");
  //     });
  // };



  return (


    <div className="page" >
     <h2 className="title" > articles</h2> 
    <table className="table-content">
      <thead>
        <tr>
          <th>Articles</th>
          <th>Author name</th>
          <th>Upload date</th>
          <th>Decision</th>
        </tr>
      </thead>

      <tbody>
        {data.map((column, i) => (
          <tr key={i}>
            <td> {column.title} </td>
            <td> {column.user_id} </td>
            <td>
              {column.report_set.map((report,key)=>{
                 <div>
                   {column.report_set.length} /3
                 </div>
 

 

              })}




            </td>
            <td className="decision" >
            
              <div >pass to review</div> 
              <div >Decline</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

    
  )
}

export default AcceptedArticlesTable