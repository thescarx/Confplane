import React, { useEffect, useState, useRef } from "react";
import "./edit_art.css";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { saveAs } from "file-saver";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import Popup from "../popup/Popup";
var idd = "x";

var objett = {};

function Raport() {
  var [dics, setDics] = useState([]);
  const [dic, setDic] = useState([
    //   {
    //   question:"",
    //   answer:null,
    // }
  ]);
  const token = localStorage.getItem("token");
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const { id } = useParams();
  let host = "http://127.0.0.1:8000";
  let navigate = useNavigate();
  let navigate_2 = useNavigate();

  const [raport, setraport] = useState({});
  const [art, setart] = useState({});
  useEffect(() => {
    let url2 = host + "​/report​/report​/" + id;
    axios
      .get(url2)
      .then((artts) => {
        idd = artts["data"].article;
        setraport(artts["data"]);
        let url = host + "/articles/" + idd;
        axios.get(url).then((resp) => {
          setart(resp["data"]);
          console.log(resp["data"]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveFile = (urlll) => {
    saveAs(urlll, "article.pdf");
  };

  const Question = ({ data }) => {
    return (
      <div>
        {data.map((q, i) => {
          return (
            <form>
              <div className="qst_box">
                <div className="qs">
                  <p>. {q.question}</p>
                </div>
                <div className="chek">
                  {q.answers===true}
                  <input
                    type="radio"
                    id="html"
                    name="answer"
                    value="true"
                  />
                    <label for="html">YES</label> {" "}
                  <input
                    type="radio"
                    id="css"
                    name="answer"
                    value="false"
                  />
                    <label for="css">NO</label>
                </div>
              </div>
            </form>
          );
        })}
      </div>
    );
  };

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
              <p>{art.title}</p>
            </div>
            <div className="down_art">
              <div className="down_f">
                <DownloadIcon id="hh" />
              </div>
              <div className="pp">
                <p onClick={() => saveFile(art.article_url)}>
                  Download article
                </p>{" "}
              </div>
            </div>
            <div className="descrep_part">
              <p>{art.description}</p>
            </div>

            <div className="catego">
              <p>{art.categories}</p>
            </div>
          </div>
        </div>
        <div className="edit_l">
          <div className="qsss">
            <div className="give_qst">
              <Question data={raport.answers} />
              <div className="scr_50">
                <div className="scr_p">
                  <p>. From 0 to 50 whats your rating for the article ?</p>
                </div>
                <div className="scr_inp">
                  <div className="scr_inp_inp">
                    <text
                      value={raport.score}
                      className="innp"
                    />
                  </div>
                  <div className="scr_inp_50">/100</div>
                </div>
              </div>
            </div>
          </div>
          <div className="cmm">
            <div className="space_cmnt">
              <textarea
                name="description"
                className="spec_art"
                placeholder={raport.remark}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Raport;
