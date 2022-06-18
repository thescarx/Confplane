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

function Modal({ setOpenModal }) {
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
            console.log(nott.subject);
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
                    <div className="check">
                      <CheckCircleRoundedIcon fontSize="large" />
                    </div>
                    <div className="uncheck">
                      <CancelRoundedIcon fontSize="large" />
                    </div>
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
