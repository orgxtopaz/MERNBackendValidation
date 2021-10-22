import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes
import $ from "jquery";

import "./component.css";
// import "../../server/routes/user.routes";

import { useEffect } from "react"; //a hook that GIVES  "side-effects"
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import { useForm } from "react-hook-form"; //custom hook for managing forms with ease.
import * as yup from "yup"; //for validation
import { yupResolver } from "@hookform/resolvers/yup"; //Define object schema and its validation.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.

// IMPORT MATERIAL UI METHODS / COMPONENTS DESIGN
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@mui/material/Button";

////--------------

///IMPORT DATEPICKER FOR OUR DATE

import "react-datepicker/dist/react-datepicker.css";

///------------------

////TABLE
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

///-------------

function Forms() {
  //HERE THE onSubmit will grab the object which has the data coming from the form (called by the handleSubmit).

  //  // NO USE
  //  ///HERE ARE THE VARIABLES WHICH GET OR STORE THE DATA THAT IS INPUTED
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userList, setUserList] = useState([]);
  const [errorList, setErrorList] = useState([]);

  /// ADD DATA TO DATABASE----------------------------------------

  //FOR THE DATE VALIDATION MIN AND MAX

  const maxDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  // const minDate = new Date().toJSON().split("T")[0];

  const addUser = (e) => {
    e.preventDefault();

    console.log(errorList);

    //CURRENT DATE
    const today = new Date();
    const currentDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() > 8
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)) +
      "-" +
      (today.getDate() > 9 ? today.getDate() : "0" + today.getDate());

    //IF CURRENT DATE IS EQUAL TO THE DATE PICKED BY THE USER/ ALREADY FORMATTED.
    if (currentDate === date) {
      //THIS DATE FORMAT WILL BE INSERTED IF THE DATE INPUTTED BY THE USER IS EQUAL TO THE CURRENT DATE
      var dateInserted = new Date();
      const dateFormatted =
        (dateInserted.getMonth() > 8
          ? dateInserted.getMonth() + 1
          : "0" + (dateInserted.getMonth() + 1)) +
        "/" +
        (dateInserted.getDate() > 9
          ? dateInserted.getDate()
          : "0" + dateInserted.getDate()) +
        "/" +
        dateInserted.getFullYear();

      Axios.post("http://localhost:5000/add", {
        fullname: fullname,
        email: email,
        date: dateFormatted,
        location: location,
        contactNumber: contactNumber,
      })
        .then(() => {
          setUserList([
            ...userList,
            {
              fullname: fullname,
              email: email,
              date: dateFormatted,
              location: location,
              contactNumber: contactNumber,
            },
          ]);
          window.location.reload();
          // HERE WE WILL FETCH THE ERROR MESSAGE FROM BACK END AND STORE IT IN AN ARRAY!
        })
        .catch((err) => setErrorList(err.response.data));
    } else {
      alert("Registered date field accept current date");
    }
  };

  const [userId, setUserId] = useState("");
  console.log(userId);
  // console.log(userId)

  let columns = [
    {
      field: `_id`,
      headerName: "ID",
      width: 70,
      className: "userId",
      headerAlign: "center",
    },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 140,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 140,
      headerAlign: "center",
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 130,
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      width: 100,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "date",
      headerName: "Registered Date",
      width: 130,
      headerAlign: "center",
    },

    {
      field: "actionview",
      headerName: ".",
      width: 50,
      //grid renders values into the cells as strings
      // WHEN THE CELL IS RENDER WE THEN PASS DATA INSIDE PARA MAKA KUHA TAS ROW._ID
      renderCell: (data) => (
        <strong>
          <Link to={`/View/${data.row._id}`}>
            {" "}
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "20px", color: "#343a40" }}
            ></i>
          </Link>
        </strong>
      ),
    },
    {
      field: "actionupdate",
      headerName: ".",
      width: 50,
      //grid renders values into the cells as strings
      // WHEN THE CELL IS RENDER WE THEN PASS DATA INSIDE PARA MAKA KUHA TAS ROW._ID
      renderCell: (data) => (
        <strong>
          <Link to={`/Update/${data.row._id}*${data.row.contactNumber}*${data.row.email}*${data.row.location}`}>
            {" "}
            <i
              className="bi bi-pen-fill"
              style={{ fontSize: "20px", color: "#343a40" }}
            ></i>
          </Link>
        </strong>
      ),
    },
    {
      field: "actiondelete",
      headerName: ".",
      width: 50,
      //grid renders values into the cells as strings
      // WHEN THE CELL IS RENDER WE THEN PASS DATA INSIDE PARA MAKA KUHA TAS ROW._ID
      renderCell: (data) => (
        <strong>
          <Link to={`/Delete/${data.row._id}`}>
            {" "}
            <i
              className="bi bi-trash-fill"
              style={{ fontSize: "20px", color: "#343a40" }}
            ></i>
          </Link>
        </strong>
      ),
    },
  ];

  //  RETRIEVE/SHOW Users Data---------------------------------------

  // IF PAGE IS LOADED THEN THIS WILL HAPPEN WITH THE USE OF useEffect display on table

  const isLoaded = [true];
  useEffect(() => {
    if (isLoaded) {
      Axios.get("http://localhost:5000/").then((response) => {
        setUserList(response.data);
      });
    }
  }, isLoaded);

  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <div>
          <div className="row d-flex w-100 p-3 ">
            <div className="col-lg-1 col-xl-11 w-100 p-3">
              <div
                className="card text-black w-100 p-3"
                style={{ borderRadius: "5px" }}
              >
                <div className="card-body p-md-1 w-100 p-3">
                  <div className="row ">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"></p>

                      <form className="mx-1 mx-md-5">
                        <label className="form-label" htmlFor="form3Example1c">
                          Full Name
                        </label>
                        <div className="d-flex flex-row align-items-center">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <i
                                className="bi bi-person-circle  input-group-text"
                                id="basic-addon1"
                                style={{
                                  fontSize: "1rem",
                                  backgroundColor: "#1E88E5",
                                }}
                              ></i>
                            </div>

                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                placeholder="Last Name , First Name Middle Initial"
                                onChange={(event) => {
                                  setfullname(event.target.value);
                                }}
                                name="fullname"
                              />
                                <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.fullname}
                   
                              </small>
                            </div>
                            
                          </div>
                        
                        </div>
                        <label className="form-label" htmlFor="form3Example1c">
                          Email Address
                        </label>
                        <div className="d-flex flex-row align-items-center">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <i
                                className="bi bi-envelope-fill input-group-text"
                                id="basic-addon1"
                                style={{
                                  fontSize: "1rem",
                                  backgroundColor: "#1E88E5",
                                }}
                              ></i>
                            </div>

                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                placeholder="example@email.com"
                                type="text"
                                onChange={(event) => {
                                  setEmail(event.target.value);
                                }}
                                required
                                name="email"
                              />

                              <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                                {errorList.email}
                              </small>
                            </div>
                          </div>
                        </div>
                        <label className="form-label" htmlFor="form3Example1c">
                          Contact Number
                        </label>
                        <div className="d-flex flex-row align-items-center">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <i
                                className="bi bi-telephone-fill input-group-text"
                                id="basic-addon1"
                                style={{
                                  fontSize: "1rem",
                                  backgroundColor: "#1E88E5",
                                }}
                              ></i>
                            </div>

                            <div className="form-outline flex-fill mb-0">
                              <input
                                id="form3Example4c"
                                className="form-control"
                                type="text"
                                placeholder="09334399999"
                                onChange={(event) => {
                                  setContactNumber(event.target.value);
                                }}
                                name="contactNumber"
                              />

                              <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                                {errorList.contactNumber}
                              </small>
                            </div>
                          </div>
                        </div>
                        <label className="form-label" htmlFor="form3Example1c">
                          Select Location
                        </label>
                        <div className="d-flex flex-row align-items-center">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <i
                                className="bi bi-geo-alt-fill input-group-text"
                                id="basic-addon1"
                                style={{
                                  fontSize: "1rem",
                                  backgroundColor: "#1E88E5",
                                }}
                              ></i>
                            </div>

                            <div className="form-outline flex-fill mb-0">
                              <select
                                className="form-select custom-select mr-sm-2 form-control"
                                id="inlineFormCustomSelect form3Example4cd"
                                aria-label="Default select example"
                                onChange={(event) => {
                                  setLocation(event.target.value);
                                }}
                                name="location"
                                placeholder=""
                              >
                                <option value="" hidden>
                                  Select Location
                                </option>
                                <option value="Manila">Manila</option>
                                <option value="Cebu">Cebu</option>
                              </select>

                              <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                                {errorList.location}
                              </small>
                            </div>
                          </div>
                        </div>
                        <label className="form-label" htmlFor="form3Example1c">
                          Registered Date
                        </label>
                        <div className="d-flex flex-row align-items-center">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <i
                                className="bi bi-calendar-check-fill input-group-text"
                                id="basic-addon1"
                                style={{
                                  fontSize: "1rem",
                                  backgroundColor: "#1E88E5",
                                }}
                              ></i>
                            </div>

                            <div className="form-outline flex-fill mb-0">
                              <input
                                id="form3Example4cd"
                                className="form-control"
                                type="date"
                                name="date"
                                max={maxDate}
                                min={maxDate}
                                placeholder="Choose Date"
                                format="MM-dd-yyyy"
                                onChange={(event) => {
                                  setDate(event.target.value);
                                }}
                              />

                              <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                                {errorList.dateFormatted}
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="Submit"
                            className="btn  btn-lg bi bi-arrow-up-circle-fill"
                            onClick={addUser}
                          ></button>
                        </div>

                        {/*HERE WE MAP THE ERROR MESSAGE AND DIPLAY THEM  */}
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOW USER DATA ON TABLE GAMIT ANG DATA GRID */}
      <a link href="/ViewReports" style={{marginLeft:"950px",color:"red",marginTop:"-510px",position:"absolute"}}> View Reports</a>
      <div
        style={{
          height: 400,
          width: "70%",
          marginTop: "-480px",
          float: "right",
        }}
      >
        {/* data grid include filtering, columns. */}
        
        <DataGrid
          rows={userList}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}

          // checkboxSelection
        />
      </div>
    </>
  );
}

export default Forms;
