import React, { useEffect, useState } from "react";
import "./popup.css"
import DatePicker from "react-datepicker";
import axios from "axios";

import { format } from "date-fns";
import { useParams } from "react-router-dom";


const Popup = (props) => {
  const {id}=useParams();
  const [textarea, setTextarea] = useState("");
  const [bool,setbool]=useState(false);
  const handleChange = (event) => {
    setTextarea(event.target.value);
  };
  // const initialValues = {
  //   modification: "",
  // };
  const handlesDead = (date) => {
    setdeadline(date);
  };
  // const [form,setform]=useState(initialValues)
  const [deadline,setdeadline]=useState(new Date())
  let host = "http://127.0.0.1:8000";
 
 useEffect((e)=>{
  let objet={
    modification:textarea.toString(),
    deadline:format(deadline, "yyyy-MM-dd hh:mm:ss.sss"),
    article:id, 
     }

  axios.post(host+"/articles/request_to_edit",objet)
  .then((resp)=>{
    console.log(resp)
  }
 )
},[bool]);
 


  return (
    <div className="popup-box">
      <div className="box">
        <button className="close-icon" onClick={props.handelclickclose}>
          x
        </button>
        <div className="popp">
          <div className="poppp">
          <textarea
                name="description"
                className="spec_artt"
                value={textarea}
                placeholder="Comment"
                onChange={handleChange}
              />
          </div>
          <div className="space_btn2">
              <div className="Submit_divv">
                <div className="Submit_btnn">
                  <DatePicker
                     placeholderText="        YYYY/MM/JJ"
                     className="datess"
                     value={deadline}
                     onChange={handlesDead}
                     selected={deadline}
                
                  />
                </div>
                <div className="Edit_divv">
                <button className="Edit_btnn" 
                onClick={()=>setbool(!bool)}
                >
                  <p>Confirm</p>
                </button>
              </div>
              </div>
              
              </div>
          </div>
        </div>
        
      </div>

  );
};

export default Popup;
