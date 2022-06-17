import React, { useState, useEffect } from "react";
import "./Articles.css";
import axios from "axios";
import dateFormat from "dateformat";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";

function PendingArticlesTable() {
  const {id} = useParams();
  console.log(id)
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


  useEffect(() => {
    let url = "http://localhost:8000/articles/listforchairman/path/?conference_id="+id+"&status=pending";
    console.log(url)
    axios
      .get(url)
      .then((response) => {setData(response["data"]);console.log("pending")})

  }, [bool]);

  // const getName = async (id) => {
  //   const res = await axios.get("http://localhost:8000/users/" + id);
  //   return res["data"].first_name;

    // .then((response)=>{
    //  name = response["data"].first_name + response["data"].family_name

    //  })
    // return await name
  // };

  const handleDecline = (id) => {
    axios
      .put("http://localhost:8000/articles/" + id, { status: "refused" })
      .then(() => {
        console.log("done");
      });
  };
  const handleAccept = (id) => {
    axios
      .put("http://localhost:8000/articles/" + id, {
        status: "accepted to review",
      })
      .then(() => {
        console.log("done");
      });
  };

  return (
    <div className="page" >
     <h2 className="title" >Pending articles</h2> 
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
            <td>{dateFormat(column.date_of_creation, "mmmm dS, yyyy")}</td>
            <td className="decision" >
            
              <div  onClick={()=>{handleAccept(column.id)}} >pass to review</div> 
              <div onClick={()=>{handleDecline(column.id)}} >Decline</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );

}

export default PendingArticlesTable;
