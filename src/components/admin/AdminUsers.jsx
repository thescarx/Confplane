import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Admin.css";
import SearchIcon from "@mui/icons-material/Search";
import {
  faLock,
  faLockOpen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function AdminUsers() {
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

  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/listforadmin/path")
      .then((response) => setData(response["data"]));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/listforadmin/path?search=" + q)
      .then((response) => setData(response["data"]));
  }, [q]);

  const [bool, setBool] = useState(false);
  
  const handleDelete = (id) => {
    axios.delete("http://localhost:8000/users/admin/" + id).then((response) => {
      if (response.status == 200) {
        setBool(!bool);
        console.log("done");
      }
    });
  };
  const handleBlock = (id) => {
    axios
      .put("http://localhost:8000/users/admin/" + id, { is_active: false })
      .then((response) => {
        if (response.status == 200) {
          setBool(!bool);
        }
      });
  };
  const handleDeblock = (id) => {
    axios
      .put("http://localhost:8000/users/admin/" + id, { is_active: true })
      .then((response) => {
        if (response.status == 200) {
          setBool(!bool);
        }
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/listforadmin/path")
      .then((response) => setData(response["data"]));
  }, [bool]);

  return (
    <div className="page-users">
      <div className="filter_user">
        <div className="inputcomplet-users">
          <SearchIcon />
          <input
            placeholder="Search"
            className="inputfilter-users"
            type="text"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
          />
        </div>
      </div>

   
      <table className="sss" cellPadding="0" cellSpacing="0" >
      <thead>
        <tr>
          <th> <div className="hdr" >Username</div> </th>
          <th> <div className="hdr" >Actions</div> </th>
          <th> <div className="hdr" > Profile</div></th>
        </tr>
      </thead>

      <tbody>
        {data.map((column, i) => (
          <tr key={i}>
            <td>
              <div>{column.first_name} {column.family_name}</div>
              
            </td>
            <td className="icons">
              <div className="actions" >
              {column.is_active ? (
                <div className="act" ><FontAwesomeIcon
                icon={faLock}
                className="icon-close"
                onClick={() => handleBlock(column.id)}
              /></div>
                
              ) : (
                <div className="act" ><FontAwesomeIcon
                icon={faLockOpen}
                className="icon-open"
                onClick={() => handleDeblock(column.id)}
              /></div>
                
              )}
                <div className="act" > <FontAwesomeIcon
                icon={faTrashCan}
                className="icon-delete"
                onClick={() => {
                  handleDelete(column.id);
                }}
              />
              </div></div>
             
             
            </td>
            <td>  <div> lien vers profile</div></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
export default AdminUsers;
