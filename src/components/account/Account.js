import React, { useEffect, useState, useRef, useContext } from "react";
import "./account.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { saveAs } from "file-saver";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import image_down from "./../../img/pdf.png";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LogoutIcon from "@mui/icons-material/Logout";
import { SocketContext } from "../../socket";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Modal from "../Notification/Modal";
import { notifications } from "../../data";

function Account() {
  const [not, setNot] = useState(notifications);
  const socket = useContext(SocketContext)

  // socket.onmessage=function(e){
  //   const obj = JSON.parse(e["data"]);
  //   for (let i = 0; i < obj.notifications.length; i++) {
  //     notifications.push(obj.notifications[i]);
  //     console.log(notifications);
  //   }
  //   setNot(notifications);
  //   console.log("done");
    
  // }

  // console.log("this is the data " + data);
  let host = "http://127.0.0.1:8000";
  let navigate = useNavigate();
  let navigate_2 = useNavigate();
  let navigate_4 = useNavigate();
  let navigate_5 = useNavigate();
  const hiddenFileInput = React.useRef(null);

  const token = localStorage.getItem("token");
  const navigate2 = useNavigate();

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // for upload image

  const [image, setimage] = useState([]);
  const [data_profile, setdata_profile] = useState({});
  let path = "";
  const [bool, setbool] = useState(false);

  // const uploadImage = (e) => {
  //   const data = new FormData();
  //   data.append("profile_picture", e.target.files[0]);
  //   console.log(data);
  //   path = e.target.path;
  //   axios.put(host + "/users/profile", data, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // };

  // useEffect(()=>{
  //  uploadImage()
  // },[bool])

  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    
    axios
      .get(host + "/users/profile")
      .then((reponse) => {
        setdata_profile(reponse["data"]);
        setimage(true);
      })
      .catch((err) => {});
  }, [image]);

  // const refreshPage = ()=>{
  //     window.location.reload();
  //  }
  //my articles
  const [article, setarticle] = useState([]);
  useEffect(() => {
    const socket = new WebSocket(
      "ws://127.0.0.1:8000/ws/socket-server/?token=" + token
    );
    socket.onmessage = function (e) {
      const obj = JSON.parse(e["data"]);
      console.log(obj.notifications.length)
  
      for (let i = 0; i < obj.notifications.length; i++) {
        notifications.push(obj.notifications[i]);
      }
      // console.log("all notifications");

      setNot(obj.notifications);
    };  
    axios
      .get(host + "/articles/list/path")
      .then((artc) => {
        setarticle(artc["data"]);
        console.log(artc["data"]);
      })
      .catch((err) => {});
  }, []);

  const saveFile = (urll) => {
    saveAs(urll, "article.pdf");
  };

  const Getartcl = ({ data }) => {
    const ref = useRef(null);
    return (
      <>
        {data.map((cle) => {
          return (
            <>
              <div
                onClick={() => {
                  navigate_5("/account/EditArticle/" + cle.id);
                }}
                className="confDiv_1"
                ref={ref}
                key={cle.conference_id}
              >
                <div className="info">
                  <div className="test_1">
                    <div className="title_1">{cle.title}</div>
                    <div className="host_1">
                      <h5>
                        {cle.conference_id.title} - {cle.date_of_creation}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="etat">
                  {cle.status === "waiting for authors" ? (
                    <HistoryIcon className="icon1" />
                  ) : cle.status === "accepted" ? (
                    <CheckCircleOutlineIcon className="icon2" />
                  ) : cle.status === "refused" ? (
                    <DoDisturbIcon className="icon3" />
                  ) : cle.status === "accepted to review" ? (
                    <HourglassBottomIcon className="icon4" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="downfile">
                  <img
                    src={image_down}
                    alt=""
                    onClick={() => saveFile(cle.article_url)}
                    className="down"
                  />
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  // my conferences
  const [confs, setconfs] = useState([]);
  useEffect(() => {
    axios
      .get(host + "/conferences/conferences_creator/list/path")
      .then((conf) => {
        setconfs(conf["data"]);
      });
  }, []);

  const Getconfs = ({ data }) => {
    const ref = useRef(null);
    return (
      <>
        {data.map((cle) => {
          return (
            <>
              <div className="confDiv_2" ref={ref} key={cle.id}>
                <div className="info_2">
                  <div className="test_2">
                    <div className="title_2">{cle.title}</div>
                    <div className="host_2">
                      <h5>
                        {cle.name_of_host},{cle.location} - {cle.start_date} ,{" "}
                        {cle.end_date}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="etat_2">
                  {cle.status === "pending" ? (
                    <HistoryIcon className="icon1" />
                  ) : cle.status === "accepted" ? (
                    <CheckCircleOutlineIcon className="icon2" />
                  ) : cle.status === "refused" ? (
                    <DoDisturbIcon className="icon3" />
                  ) : cle.status === "accepted to review" ? (
                    <HourglassBottomIcon className="icon4" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="downfile_2">
                  <img src={host + cle.logo} alt="" className="down" />
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  // waiting for reviewr
  const [waiting, setwaiting] = useState([]);
  useEffect(() => {
    axios.get(host + "/articles/listforreviewer/path").then((reslt) => {
      setwaiting(reslt["data"]);
    });
  }, []);

  const Getwait = ({ data }) => {
    const ref = useRef(null);
    return (
      <>
        {data.map((cle) => {
          const { id } = cle;
          return (
            <>
              <div
                className="confDiv_3"
                key={id}
                onClick={() => navigate_4("/Edit_art/" + id)}
              >
                <div className="info_3">
                  <div className="test_3">
                    <div className="title_3">{cle.title}</div>
                    <div className="host_3">
                      <h5>
                        {cle.conference_id.title} - {cle.start_date}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="downfile_3">
                  <img
                    src={image_down}
                    alt=""
                    onClick={() => saveFile(cle.article_url)}
                    className="down"
                  />
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  //tableau (viewpager)
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <div className="account_page" id="account">
      {!isOpenModal && (
        <nav className="navbar_1">
          <ul className="navbar_list_1">
            <Link to="/" className="link">
              <li className="list_item_1">Home</li>
            </Link>

            <li
              className="list_item_1"
              onClick={() => {
                navigate_2("/MainConf");
              }}
            >
              Conferences
            </li>

            <Link to="/#footer" smooth className="link">
              <li className="list_item_1">About us</li>
            </Link>
            <Link to="/#footer" smooth className="link">
              <li className="list_item_1">Contact us</li>{" "}
            </Link>

            <li
              className="list_item_1"
              onClick={() => {
                navigate("/account");
              }}
            >
              Account
            </li>
            <li
              className="list_item_1"
              onClick={() => {
                navigate("/account");
              }}
            >
              <CircleNotificationsIcon
                onClick={() => setOpenModal(true)}
              ></CircleNotificationsIcon>
            </li>
          </ul>
        </nav>
      )}

      <div className="proff">
        {isOpenModal && <Modal setOpenModal={setOpenModal}></Modal>}
        {!isOpenModal && (
          <div className="container_acc">
            <div className="container_acc_l">
              {/*  ////////////////////////////// */}
              <div className="container_acc_l_logo">
                <div className="form-controll">
                  <input
                    type="file"
                    onChange={() => {
                      setbool(!bool);
                    }}
                    name="file_up"
                  />
                </div>
                <img
                  ref={hiddenFileInput}
                  src={host + data_profile.profile_picture}
                  alt={host + data_profile.profile_picture}
                />

                {/* <input type="file" onClick={uploadImage} />



            <img src={host+data_profile.profile_picture}/> */}
              </div>

              {/* //////////////////////////////////////////////////// */}

              <div className="container_acc_l_info">
                <div className="profile_info_sta">
                  <h1 className="nom">
                    {data_profile.family_name} {data_profile.first_name}
                  </h1>
                  <h6 className="bioo">{data_profile.bio}</h6>
                </div>
                <div className="profile_info_det">
                  <div className="profile_info_det_div">
                    <LocationOnIcon className="icon"></LocationOnIcon>
                    <p>{data_profile.full_adress}</p>
                  </div>
                  <div className="profile_info_det_div">
                    <AlternateEmailIcon className="icon"></AlternateEmailIcon>
                    <p>{data_profile.email}</p>
                  </div>
                  <div className="profile_info_det_div">
                    <PhoneIcon className="icon"></PhoneIcon>
                    <p>{data_profile.phone_number}</p>
                  </div>
                  <div className="profile_info_det_div">
                    <LinkedInIcon className="icon"></LinkedInIcon>
                    <p>{data_profile.linked_in_username}</p>
                  </div>
                  <div className="profile_info_det_div">
                    <LogoutIcon className="icon"></LogoutIcon>
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container_acc_r">
              <div className="bloc-tabs">
                <div
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  My Articles
                </div>
                <div
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Conferences
                </div>
                <div
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(3)}
                >
                  waiting for review
                </div>
              </div>
              <div className="content-tabs">
                <div
                  className={
                    toggleState === 1 ? "content  active-content" : "content"
                  }
                >
                  <Getartcl data={article} />
                </div>

                <div
                  className={
                    toggleState === 2 ? "content  active-content" : "content"
                  }
                >
                  <Getconfs data={confs} />
                </div>

                <div
                  className={
                    toggleState === 3 ? "content  active-content" : "content"
                  }
                >
                  <Getwait data={waiting} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
