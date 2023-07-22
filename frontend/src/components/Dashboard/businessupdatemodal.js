import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";

function UpdateBusiness(props) {
  const [updatedName, setUpdatedName] = useState(props.prevName);
  const [updatedType, setUpdatedType] = useState(props.prevType);
  const [updatedTime, setUpdatedTime] = useState(props.prevTime);
  const [updatedPhone, setUpdatedPhone] = useState(props.prevPhone);
  const [updatedLocation, setUpdatedLocation] = useState(props.updatedLocation);
  const [updatedLat, setUpdatedLat] = useState(props.prevLat);
  const [updatedLng, setUpdatedLng] = useState(props.prevLng);
  const [updatedDel, setUpdatedDel] = useState(props.prevDel);
  const [updatedAddress, setUpdatedAddress] = useState(props.prevAddress);
  const [updatedEmail, setUpdatedEmail] = useState(props?.prevEmail);
  const [updatedImg, setUpdatedImg] = useState({
    file: [],
    filePreview: null,
  });
  const history = useHistory();
  function handleClick() {
    if (localStorage.jwtToken) {
      let formdata = new FormData();
      formdata.append("name", props.prevName);
      formdata.append("newName", updatedName ? updatedName : props.prevName);
      formdata.append("type", updatedType ? updatedType : props.prevType);
      formdata.append(
        "location",
        updatedLocation ? updatedLocation : props.prevLoc
      );
      formdata.append("phone", updatedPhone ? updatedPhone : props.prevPhone);
      formdata.append("address", updatedAddress ? updatedAddress : props?.prevAddress);
      formdata.append("email", updatedEmail ? updatedEmail : props?.prevEmail);
      formdata.append("timings", updatedTime ? updatedTime : props.prevTime);
      formdata.append("delivery", updatedDel ? updatedDel : props.prevDel);
      formdata.append("latitude", updatedLat ? updatedLat : props.prevLat);
      formdata.append("longitude", updatedLng ? updatedLng : props.prevLng);
      formdata.append(
        "businessImage",
        updatedImg.filePreview === null ? props.prevImage : updatedImg.file
      );
      //console.log("form data", formdata);
      axios
        .patch("http://localhost:5000/api/businesses/update", formdata)

        .then((res) => {
          history.push("/dashboard");
          window.location.reload();
        })
        .catch((err) => console.log(err.response));
    } else {
      alert("You need to log in first!");
    }
  }

  function handleName(event) {
    setUpdatedName(event.target.value);
  }

  function handleType(event) {
    setUpdatedType(event.target.value);
  }

  function handleTime(event) {
    setUpdatedTime(event.target.value);
  }

  function handleLoc(event) {
    setUpdatedLocation(event.target.value);
  }

  function handleEmail(event) {
    setUpdatedEmail(event.target.value);
  }
  function handleLat(event) {
    setUpdatedLat(event.target.value);
  }

  function handleLng(event) {
    setUpdatedLng(event.target.value);
  }

  function handleImage(event) {
    setUpdatedImg({
      file: event.target.files[0],
      filePreview: URL.createObjectURL(event.target.files[0]),
    });
  }
  
  function handleAddress(event){
    setUpdatedAddress(event.target.value);
  }

  function handlePhone(event) {
    setUpdatedPhone(event.target.value);
  }

  const changeBool = (key) => {
    if (key === 1) {
      setUpdatedDel("Yes");
    } else {
      setUpdatedDel("No");
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.closeModal}
      dialogClassName="modal-xl xl"
      contentClassName="xl"
    >
      <Modal.Header>
        <button
          type="button"
          className="close"
          onClick={props.closeModal}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div style={{ textAlign: "center", paddingRight: "40%" }}>
          <h4>Update Business</h4>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form
          style={{ paddingRight: "2%", paddingLeft: "2%" }}
          enctype="multipart/form-data"
        >
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Enter Business Name
            </InputGroup.Text>
            <FormControl
              onChange={handleName}
              placeHolder={props.prevName}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>

          <InputGroup style={{ paddingTop: "4%" }} size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Enter Business Type
            </InputGroup.Text>
            <FormControl
              onChange={handleType}
              placeHolder={props.prevType}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>

          <InputGroup style={{ paddingTop: "4%" }} size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Enter Business Location
            </InputGroup.Text>
            <FormControl
              onChange={handleLoc}
              placeHolder={props.prevLoc}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>

           <InputGroup style={{ paddingTop: "4%" }} size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Enter Address
            </InputGroup.Text>
            <FormControl
              onChange={handleAddress}
              placeHolder={props.prevAddress}
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
                  placeHolder={props.prevLat}
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
                  placeHolder={props.prevLng}
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
            </div>
          </div>
          <InputGroup style={{ paddingTop: "4%" }} size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Enter Business Contact Number
            </InputGroup.Text>
            <FormControl
              onChange={handlePhone}
              placeHolder={props.prevPhone}
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
              placeHolder={props?.prevEmail}
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
              placeHolder={props.prevTime}
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>

          <Dropdown style={{ paddingTop: "4%", paddingBottom: "4%" }}>
            <h4>Do you provide delivery services?</h4>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {updatedDel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="1" onClick={() => changeBool(1)}>
                Yes
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeBool(2)} eventKey="2">
                No
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <input
            type="file"
            onChange={handleImage}
            id="image"
            accept="image/png, image/jpeg"
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
              UPDATE BUSINESS
            </Button>{" "}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateBusiness;
