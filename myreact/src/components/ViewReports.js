import React from "react";
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.
import "bootstrap/dist/css/bootstrap.min.css";
import "./view.css";
import { useEffect } from "react"; //a hook that GIVES  "side-effects"
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes

function ViewReports() {
  let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.

  function handleClick() {
    history.push("/"); //GOING BACK TO HOME PAGE / MAIN PAGE
  }

  const [userDetails, setUserDetails] = useState([]);
  const [manila, setManila] = useState([]);
  const [cebu, setCebu] = useState([]);

  const isLoaded = [true];
  //COUNT USER IN Manila and Cebu
  useEffect(() => {
    if (isLoaded) {
      Axios.get(`http://localhost:5000/Manila`).then((response) => {
        setManila(response.data);
      });

      Axios.get(`http://localhost:5000/Cebu`).then((response) => {
        setCebu(response.data);
      });
    }
  }, isLoaded);
  


  ///YEAR OF 2020
  const [jan, setJan] = useState([]);
  const [feb, setFeb] = useState([]);
  const [mar, setMar] = useState([]);
  const [apr, setApr] = useState([]);
  const [may, setMay] = useState([]);
  const [jun, setJun] = useState([]);
  const [jul, setJul] = useState([]);
  const [aug, setAug] = useState([]);
  const [sep, setSep] = useState([]);
  const [oct, setOct] = useState([]);
  const [nov, setNov] = useState([]);
  const [dec, setDec] = useState([]);

  //  RETRIEVE/SHOW SPECIFIC  Users Data by its ID with the use of params---------------------------------------

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const storagearea = [
    setJan,
    setFeb,
    setMar,
    setApr,
    setMay,
    setJun,
    setJul,
    setAug,
    setSep,
    setOct,
    setNov,
    setDec,
  ];
  // IF PAGE IS LOADED THEN THIS WILL HAPPEN WITH THE USE OF useEffect
  useEffect(() => {
    if (isLoaded) {
      for (let i = 0; i < months.length; i++) {
        Axios.get(`http://localhost:5000/${months[i]}`).then((response) => {
          storagearea[i](response.data);
        });
      }
    }
  }, isLoaded);

  //YEAR OF 2021
  const [jan1, setJan1] = useState([]);
  const [feb1, setFeb1] = useState([]);
  const [mar1, setMar1] = useState([]);
  const [apr1, setApr1] = useState([]);
  const [may1, setMay1] = useState([]);
  const [jun1, setJun1] = useState([]);
  const [jul1, setJul1] = useState([]);
  const [aug1, setAug1] = useState([]);
  const [sep1, setSep1] = useState([]);
  const [oct1, setOct1] = useState([]);
  const [nov1, setNov1] = useState([]);
  const [dec1, setDec1] = useState([]);

  //  RETRIEVE/SHOW SPECIFIC  Users Data by its ID with the use of params---------------------------------------

  const months1 = [
    "Jan1",
    "Feb1",
    "Mar1",
    "Apr1",
    "May1",
    "Jun1",
    "Jul1",
    "Aug1",
    "Sep1",
    "Oct1",
    "Nov1",
    "Dec1",
  ];
  const storagearea1 = [
    setJan1,
    setFeb1,
    setMar1,
    setApr1,
    setMay1,
    setJun1,
    setJul1,
    setAug1,
    setSep1,
    setOct1,
    setNov1,
    setDec1,
  ];
  // IF PAGE IS LOADED THEN THIS WILL HAPPEN WITH THE USE OF useEffect
  useEffect(() => {
    if (isLoaded) {
      for (let i = 0; i < months.length; i++) {
        Axios.get(`http://localhost:5000/${months1[i]}`).then((response) => {
          storagearea1[i](response.data);
        });
      }
    }
  }, isLoaded);

  return (
    <>
    <br></br>
    <center>
      <div className="card" style={{ width: "34%" }}>
        <h5 className="card-header" style={{fontFamily:"'Raleway', sans-serif" ,color:"white",backgroundColor:"#343a40"}}>Reports</h5>
        <div className="card-body" style={{backgroundColor: "#1E88E5",color: "white",}}>
          <h5 className="card-title" style={{fontFamily:"'Raleway', sans-serif"}}>
            Number of Registered users in Manila :{manila.length}
          </h5>
          <h5 className="card-title" style={{fontFamily:"'Raleway', sans-serif"}}>
            Number of Registered users in Cebu :{cebu.length}
          </h5>
          <p className="card-title">Resources Registered:</p>
        </div>
      </div>
      </center>
      <br></br>
      <table className="table table-bordered container-sm">
        <thead style={{fontFamily:"'Raleway', sans-serif" ,color:"white",backgroundColor:"#343a40"}}>
          <tr>
            <th scope="col-sm" style={{fontFamily:"'Raleway', sans-serif" }}>Year</th>
            <th scope="col-sm"style={{fontFamily:"'Raleway', sans-serif" }}>Jan</th>
            <th scope="col-sm" style={{fontFamily:"'Raleway', sans-serif" }}>Feb</th>
            <th scope="col-sm" style={{fontFamily:"'Raleway', sans-serif" }}>Mar</th>
            <th scope="col-sm" style={{fontFamily:"'Raleway', sans-serif" }}>Apr</th>
            <th scope="col-sm" style={{fontFamily:"'Raleway', sans-serif" }}>May</th>
            <th scope="col-sm"style={{fontFamily:"'Raleway', sans-serif" }} >Jun</th>
            <th scope="col-sm"style={{fontFamily:"'Raleway', sans-serif" }} >Jul</th>
            <th scope="col-sm" style={{fontFamily:"'Raleway', sans-serif" }} >Aug</th>
            <th scope="col-sm"style={{fontFamily:"'Raleway', sans-serif" }} >Sep</th>
            <th scope="col-sm"style={{fontFamily:"'Raleway', sans-serif" }} >Oct</th>
            <th scope="col-sm" style={{fontFamily:"'Raleway', sans-serif" }}>Nov</th>
            <th scope="col-sm" style={{fontFamily:"'Raleway', sans-serif" }}>Dec</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:"#1E88E5",color:"white"}}>
          <tr>
            <>
              <th scope="col-sm" style={{fontFamily:"'Raleway', sans-serif" }}>2020</th>
              <th scope="col-sm">{jan.length}</th>
              <th scope="col-sm">{feb.length}</th>
              <th scope="col-sm">{mar.length}</th>
              <th scope="col-sm">{apr.length}</th>
              <th scope="col-sm">{may.length}</th>
              <th scope="col-sm">{jun.length}</th>
              <th scope="col-sm">{jul.length}</th>
              <th scope="col-sm">{aug.length}</th>
              <th scope="col-sm">{sep.length}</th>
              <th scope="col-sm">{oct.length}</th>
              <th scope="col-sm">{nov.length}</th>
              <th scope="col-sm">{dec.length}</th>
            </>
          </tr>

          <tr>
            <>
              <th scope="col-sm" style={{fontFamily:"'Raleway', sans-serif" }}>2021</th>
              <th scope="col-sm">{jan1.length}</th>
              <th scope="col-sm">{feb1.length}</th>
              <th scope="col-sm">{mar1.length}</th>
              <th scope="col-sm">{apr1.length}</th>
              <th scope="col-sm">{may1.length}</th>
              <th scope="col-sm">{jun1.length}</th>
              <th scope="col-sm">{jul1.length}</th>
              <th scope="col-sm">{aug1.length}</th>
              <th scope="col-sm">{sep1.length}</th>
              <th scope="col-sm">{oct1.length}</th>
              <th scope="col-sm">{nov1.length}</th>
              <th scope="col-sm">{dec1.length}</th>
            </>
          </tr>
        </tbody>
      </table>

      <Link to="/">
        <i
          className="btn  bi bi-arrow-counterclockwise"
          style={{ fontSize: "40px" }}
        ></i>
      </Link>
    </>
  );
}

export default ViewReports;

