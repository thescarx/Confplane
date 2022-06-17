import React, { useState, useEffect } from "react";
import "./Articles.css";
import axios from "axios";
import CommentIcon from '@mui/icons-material/Comment';
import RapportPop from './RapportPop';
import { useParams } from "react-router-dom";


function ReviewResultTable() {
  const [pop,setPop]=useState(false)
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
    axios
      .get("http://localhost:8000/articles/listforchairman/path/?conference_id="+id+"&status=accepted to review")
      .then((response) => setData(response["data"]));
  }, [bool]);

  return (
    <div className="page" >
      <h2 className="title" >Review results</h2>
       <table className="table-content">
      <thead>
        <tr>
          <th>Articles</th>
          <th>Author name</th>
          <th>Score</th>
          <th>Accept/Decline</th>
        </tr>
      </thead>

      <tbody>
        {data.map((column, i) => (
          <tr key={i}>
            <td> {column.title} </td>
            <td> {column.user_id} </td>
             <td  >
             
               {column.report_set.length===3 
                ?  <div className="column_note" > 
                  {column.report_set.map(rep=>rep.score).reduce((prev,curr)=>prev+curr  ,0)}/100 
                  <CommentIcon onClick={()=>{setPop(true)}} />
                  <RapportPop data={column.reviewers} trigger={pop} pop={pop} setPop={setPop} />
                  </div>
                :  <div className="column_note" >
                  { column.report_set.length}/3
                  <CommentIcon onClick={()=>{setPop(true)}}  />
                  <RapportPop data={column.reviewers} trigger={pop} pop={pop} setPop={setPop} />
                </div>
              
              
               
                 }
  


            </td>
            <td className="decision" >
              <div>Accept</div> <div>Decline</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
     </div>
  );
}

export default ReviewResultTable;
