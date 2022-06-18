import "./Modal.css";
import "../conference/CreateConf.css";
import "../conference/Conf.css";
import "../conference/MainConf.css";

import ChatIcon from "@mui/icons-material/Chat";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";

import { notifications } from "../../data";
import { useState } from "react";
import axios from "axios";

function Modal({ setOpenModal }) {
  const [accepted, setAccepted] = useState(false);
  const [refused, setRefused] = useState(false);
  const host = "http://127.0.0.1:8000";
  const handleAccept = (conf_id, id) => {
    axios
      .post(host + "/conferences/accept_to_review/" + conf_id, {
        status: "accepted",
        // id: id,
      })
      .then((resp) => console.log("this is the resp " + resp));
    setAccepted(true);
  };
  const handleRefuse = (conf_id, id) => {
    axios
      .post(host + "/conferences/accept_to_review/" + conf_id, {
        status: "accepted",
        // id: id,
      })
      .then((resp) => console.log("this is the resp " + resp));
    setRefused(true);
  };
  const [notif, setNotif] = useState(notifications);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <CancelRoundedIcon
            fontSize="large"
            onClick={() => setOpenModal(false)}
          />
        </div>
        <div className="gg">
          {notif.map((nott) => {
            const { conference_id, id } = nott;
            console.log(conference_id);
            console.log(id);
            return (
              <div className="notificationDiv">
                <div className="icon">
                  <CircleNotificationsRoundedIcon
                    onClick={() => console.log("clicked")}
                    fontSize="large"
                  />
                </div>
                <div className="subject">{nott.subject}</div>

                {nott.type === "invitation" && (
                  <div className="icons">
                    {!refused && (
                      <div className="check">
                        <CheckCircleRoundedIcon
                          onClick={() => {
                            handleAccept(conference_id, id);
                            // console.log("clicked");
                          }}
                          color="red"
                          fontSize="large"
                        />
                      </div>
                    )}
                    {!accepted && (
                      <div className="uncheck">
                        <CancelRoundedIcon
                          onClick={() => {
                            handleRefuse(conference_id, id);
                          }}
                          fontSize="large"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div> */}
      </div>
    </div>
  );
}

export default Modal;
