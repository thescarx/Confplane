import React, { useEffect, useState,useRef } from "react";
import "./edit_art.css";
import { useNavigate ,useParams } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { saveAs } from "file-saver";
import axios from "axios";
import DownloadIcon from '@mui/icons-material/Download';
var idd='x'

function Edit_art() {
    axios.interceptors.request.use(
        (config) => {
          config.headers.authorization =
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1MjUxMDg2LCJpYXQiOjE2NTUyMTUwODYsImp0aSI6ImNjMmI2MzA2ZjhiNjRmMTBhZjE4ZTg3ZDIzMThiYjM5IiwidXNlcl9pZCI6IjQ4ZWYyMGU3LWQwNWItNGYxMS1iZmUxLTFhMTU1MjFkNDA3OSJ9.dSea2jjy08WS3ce7aIIBJO1Eq7jcIUsm49zU5UTcVa4";
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    const{id}=useParams();
    console.log(id)
    let host = "http://127.0.0.1:8000";
  let navigate = useNavigate();
  let navigate_2 = useNavigate();
////////first part right

  const [item,setartt]=useState({});
  useEffect(()=>{
    let url2=host+"/articles/"+id
    axios
    .get(url2)
    .then((artts)=>{
        idd = artts["data"].conference_id
        setartt(artts["data"])
        let url=host+"/report/question/"+idd
        axios.get(url)
        .then((resp)=>{
            setqst(resp["data"])
            console.log(resp["data"])
        })
    })
    .catch((err)=>{
        console.log(err)
    });
  },[])

  const saveFile = (urlll) => {
    saveAs(urlll, "article.pdf");
  };




  const [qst,setqst]=useState([])
//   useEffect(()=>{
//     let url=host+"/report/question/"+idd
//     console.log(url)
//     axios.get(url)
//     .then((hh)=>{
//         setqst(hh["data"]);
//         console.log(hh["data"])
//         console.log(qst)
//     }
//     ).catch((err)=>{
//         console.log(err)
//     }
//     )
//   },[])
 
const Question =({data})=>{
    return(
        <div>
        {data.map((q)=>{
            return(
                <div className="qst_box">
                    <div className="qs">
                {q.question}
                </div>
                <div className="chek">
                <form action="" method="post">
                    <input type="radio" name="joke" value="YES" /> YES
                    <input type="radio" name="joke" value="No" /> NO
                </form>
                </div>
                </div>
            )
        })}
        </div>
    )
}



  return (
    <div className="edit_page">
      <div className="fornav">
        <nav className="navbar_11">
          <ul className="navbar_list_11">
            <Link to="/" className="link">
              <li className="list_item_11">Home</li>
            </Link>

            <li
              className="list_item_11"
              onClick={() => {
                navigate_2("/MainConf");
              }}
            >
              Conferences
            </li>

            <Link to="/#footer" smooth className="link">
              <li className="list_item_11">About us</li>
            </Link>
            <Link to="/#footer" smooth className="link">
              <li className="list_item_11">Contact us</li>{" "}
            </Link>

            <li
              className="list_item_11"
              onClick={() => {
                navigate("/account");
              }}
            >
              Account
            </li>
          </ul>
        </nav>
      </div>

      <div className="edit_content">
        <div className="edit_r">
            <div className="infoart">
                <div className="titre_art">
                    {item.title}
                    </div>
                     <div className="down_art">
                     <div className="down_f"><DownloadIcon className="hh"/></div><div className="pp"><p onClick={()=>saveFile(item.article_url)}>Download article</p> </div> 
                     </div>
                     <div className="descrep_part">
                        {item.description}
                     </div>

                     <div className="catego">
                        {item.categories}
                     </div>

                     <div className="autho">
                        {/* {item.authors.map(
                            (cle)=>{
                           
                            }
                        )} */}
                       
                     </div>
                </div>
        </div>
        <div className="edit_l">
            <div className="qsss">
            <Question data={qst}/>
            </div>
            <div className="cmm">
                jj
            </div>
           
        </div>
      </div>
    </div>
  );
}

export default Edit_art;
