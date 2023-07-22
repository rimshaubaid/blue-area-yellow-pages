import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import axios from "axios";
import AddedModal from "./addedModal";
import { useHistory } from "react-router-dom";

import setAuthToken from "../../utils/setAuthToken";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import jwt_decode from "jwt-decode";
import "react-notifications/lib/notifications.css";
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  var decoded = jwt_decode(token);
}
function BusinessEntry() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [method, setMethod] = useState(1);
  const [methodText, setMethodText] = useState("BUSINESS TYPE");
  const [deliveryBool, setDeliveryBool] = useState("SELECT ONE");
  const [delivery, setDelivery] = useState(1);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [email, setEmail] = useState(null);
  const [location, setLocation] = useState(null);
  const [address,setAddress] = useState(null);
  const [image, setImage] = useState({
    file: [],
    filePreview: null,
  });
  const [time, setTime] = useState(null);
  const [phone, setPhone] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const changeBool = (key) => {
    if (key === 1) {
      setDeliveryBool("Yes");
    } else {
      setDeliveryBool("No");
    }
    setDelivery(key);
  };

  function handleName(event) {
    setName(event.target.value);
  }
 
  function handleAddress(event){
    setAddress(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePhone(event) {
    setPhone(event.target.value);
  }

  function handleType(event) {
    setType(event.target.value);
  }

  function handleLoc(event) {
    setLocation(event.target.value);
  }

  function handleTime(event) {
    setTime(event.target.value);
  }
  function handleLat(event) {
    setLat(event.target.value);
  }
  function handleImage(event) {
    setImage({
      file: event.target.files[0],
      filePreview: URL.createObjectURL(event.target.files[0]),
    });
  }

  function handleLng(event) {
    setLng(event.target.value);
  }
  function handleClick() {
    console.log("phone", phone.length);
    if (localStorage.jwtToken) {
      let formdata = new FormData();
      if (
        name &&
        type &&
        location &&
        phone.length > 7 &&
        time &&
        email &&
        deliveryBool &&
        image.file
        && address
      ) {
        formdata.append("userId", decoded.id);
        formdata.append("name", name);
        formdata.append("type", type);
        formdata.append("location", location);
        formdata.append("phone", phone);
        formdata.append("timings", time);
        formdata.append("email", email);
        formdata.append("delivery", deliveryBool);
        formdata.append("address",address);
        formdata.append("latitude", lat?lat:0);
        formdata.append("longitude", lng?lng:0);
        formdata.append("businessImage", image.file);

        axios
          .post("http://localhost:5000/api/businesses/business", formdata)

          .then((res) => {
            NotificationManager.success(
              "Success",
              "Business Added Successfully!"
            );
            window.location.reload();
          })
          .catch((err) => console.log(err.response));
      } else if (phone.length < 7) {
        NotificationManager.error(
          "",
          "Number length should be greater than 7",
          3000
        );
      } else {
        NotificationManager.error("", "Please fill all the fields!", 3000);
      }
      //console.log("form data", formdata);
    } else {
      NotificationManager.error("", "You need to log in first!", 3000);
    }
  }
  return (
    <div className="container" style={{ backgroundColor: "whitesmoke" }}>
      <NotificationContainer />
      <AddedModal show={show} closeModal={() => setShow(false)} />
      <h3
        style={{ paddingTop: "4%", paddingBottom: "4%", textAlign: "center" }}
      >
        ENTER BUSINESS DETAILS
      </h3>
      <form enctype="multipart/form-data">
        <InputGroup size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg">
            Enter Business Name
          </InputGroup.Text>
          <FormControl
            onChange={handleName}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup style={{ paddingTop: "2%" }}>
          <label for="cars"></label>
          <InputGroup.Text id="inputGroup-sizing-lg">
            Select Business Type
          </InputGroup.Text>
          <select name="cars" id="cars" onChange={handleType}>
            <option value="restaurant">Restaurant</option>
            <option value="medical clinic">Medical Clinic</option>
            <option value="outdoor & recreation">Outdoor & Recreation</option>
            <option value="car repair">Car Repair</option>
            <option value="grocery store">Grocery Store</option>
            <option value="others">Others</option>
          </select>
        </InputGroup>
        <InputGroup style={{ paddingTop: "2%" }}>
          <InputGroup.Text id="inputGroup-sizing-lg">
            Select Business Location Area
          </InputGroup.Text>
          <label for="cars"></label>

          <select name="cars" id="cars" onChange={handleLoc}>
            <option value="F6">F6</option>
            <option value="F7">F7</option>
            <option value="F8">F8</option>

            <option value="G6">G6</option>
            <option value="G7">G7</option>
            <option value="G8">G8</option>
          </select>
        </InputGroup>
        <InputGroup
          style={{ paddingTop: "4%" }}
          size="lg"
          min="7"
          type="number"
        >
          <InputGroup.Text id="inputGroup-sizing-lg">
            Enter Address
          </InputGroup.Text>
          <FormControl
            onChange={handleAddress}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>   
        <div className="row">
          <div className="col-md-6">
            <InputGroup style={{ paddingTop: "5%" }} size="lg">
              <InputGroup.Text id="inputGroup-sizing-lg">
                Enter Latitude
              </InputGroup.Text>
              <FormControl
                onChange={handleLat}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </div>
          <div className="col-md-6">
            <InputGroup
              className="col-md-6"
              style={{ paddingTop: "5%" }}
              size="lg"
            >
              <InputGroup.Text id="inputGroup-sizing-lg">
                Enter Longitude
              </InputGroup.Text>
              <FormControl
                onChange={handleLng}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </div>
        </div>
        <InputGroup
          style={{ paddingTop: "4%" }}
          size="lg"
          min="7"
          type="number"
        >
          <InputGroup.Text id="inputGroup-sizing-lg">
            Enter Business Contact Number
          </InputGroup.Text>
          <FormControl
            onChange={handlePhone}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup style={{ paddingTop: "4%" }} size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg">
            Enter Business Email Address
          </InputGroup.Text>
          <FormControl
            onChange={handleEmail}
            placeHolder="abc@xyz.com"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup style={{ paddingTop: "4%" }} size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg">
            Enter Business Timings
          </InputGroup.Text>
          <FormControl
            onChange={handleTime}
            placeHolder="11:00 AM TO 12:00AM"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>

        <Dropdown style={{ paddingTop: "4%", paddingBottom: "4%" }}>
          <h4>Do you provide delivery services?</h4>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {deliveryBool}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1" onClick={() => changeBool(1)}>
              Yes
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => changeBool(2)}>
              No
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          onChange={handleImage}
          required
        />

        <div
          style={{
            paddingTop: "4%",
            paddingBottom: "4%",
            textAlign: "center",
          }}
        >
          <Button onClick={handleClick} size="lg" variant="success">
            SUBMIT
          </Button>{" "}
          <Button
            onClick={() => {
              history.push("/");
            }}
            size="lg"
            variant="success"
          >
            CANCEL
          </Button>{" "}
        </div>
      </form>
    </div>
  );
}

export default BusinessEntry;
