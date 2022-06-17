import React, { useEffect, useState, useContext } from "react";
import Home from "./components/accueil/Home";
import Account from "./components/account/Account";
import My from "./components/my articales/My";
import MainConf from "./components/conference/MainConf";
import CreateConf from "./components/conference/CreateConf";
import EditConf from "./components/conference/EditConf";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Conf from "./components/conference/Conf";
import Login2 from "./pages/Login2";
import Account2 from "./pages/Account2";
import PendingArticlesTable from "./components/articles/PendingArticlesTable";
import ReviewResultTable from "./components/articles/ReviewResultTable";
import AcceptedArticlesTable from "./components/articles/AcceptedArticlesTable";
import AssignArticles from "./components/articles/AssignArticles";
import Form from "./pages/Form";
import Admin from "./pages/Admin";
import AdminMain from "./pages/AdminMain";
import Layout from "./components/Layout";
import Confirm from "./pages/Confirm";
import RequireAuth from "./RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import ApplyForm from "./components/conference/ApplyForm";
import { socket, SocketContext } from "./socket";
import { notifications } from "./data";

function App() {
  // const socket = useContext(SocketContext);
  const [not, setNot] = useState(notifications);

  useEffect(() => {
    socket.onmessage = function (e) {
      // let x = e.json();
      // console.log(x);
      // console.log(e["data"]);
      const obj = JSON.parse(e["data"]);
      // console.log(obj.notifications);
      setNot(obj.notifications);
      console.log(not);
    };

    // socket.onopen = function (e) {
    //   console.log(e);
    //   // setNot();
    // };
  }, [socket]);
  const [bool, setBool] = useState(false);
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route element={<RequireAuth bool={bool} />}>
            <Route path="/account" element={<Account />} />
            <Route path="/pending/:id" element={<PendingArticlesTable />} />
            <Route path="/reviewing/:id" element={<ReviewResultTable />} />
            <Route path="/accepted/:id" element={<AcceptedArticlesTable />} />
            <Route path="/table/:id" element={<AssignArticles />} />
            <Route path="My" element={<My />} />
            <Route path="/Conf/:id/ApplyForm" element={<ApplyForm />} />
            <Route path="CreateConf" element={<CreateConf />} />
            <Route path="/EditConf/:id" element={<EditConf />} />
          </Route>

          <Route element={<RequireAuth bool={!bool} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="Conf/:id" element={<Conf />} />

          <Route path="/confirm" element={<Confirm />} />
          <Route path="/signup" element={<Form />} />
          <Route path="/login" element={<Login2 />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="MainConf" element={<MainConf />} />
          {/* <Route path="/account" element={<Account/>}/> */}
        </Route>
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
