import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import BusinessDelete from "./businessdeletemodal";
import axios from "axios";
import Table from "react-bootstrap/Table";
import BusinessUpdate from "./businessupdatemodal";

var names = [];
var types = [];
var timing = [];
var phones = [];
var locs = [];
var lats = [];
var lngs = [];
var dels = [];
var lengths;
var images = [];
var ids = [];
var emails = [];
var addresses=[];
axios({
  method: "get",
  url: "http://localhost:5000/api/businesses/business",
})
  .catch((error) => {
    console.log(error.response.data);
  })
  .then((response) => {
    lengths = response.data.length;
    for (var i = 0; i < lengths; i++) {
      ids.push(response.data[i]._id);
      names.push(response.data[i].name);
      types.push(response.data[i].type);
      timing.push(response.data[i].timings);
      phones.push(response.data[i].phone);
      locs.push(response.data[i].location);
      lats.push(response.data[i].latitude);
      lngs.push(response.data[i].longitude);
      dels.push(response.data[i].delivery);
      emails.push(response.data[i]?.email);
      images.push(response.data[i].businessImage);
      addresses.push(response.data[i]?.address);
    }
  });
function BusinessList() {
  React.useEffect(() => {
    
  })
  const [id, setId] = useState(null);
  const [namee, setName] = useState(null);
  const [typess, setType] = useState(null);
  const [timingss, setTiming] = useState(null);
  const [phoness, setPhone] = useState(null);
  const [locss, setLoc] = useState(null);
  const [latss, setLat] = useState(null);
  const [lngss, setLng] = useState(null);
  const [delss, setDel] = useState(null);
  const [imagess, setImage] = useState(null);
  const [emailss, setEmail] = useState(null);
  const [addressess,setAddress] = useState(null);
  const [showModal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <>
      <BusinessDelete
        show={showModal}
        user={namee}
        id={id}
        closeModal={() => setModal(false)}
      />
      <BusinessUpdate
        show={updateModal}
        prevName={namee}
        prevType={typess}
        prevTime={timingss}
        prevPhone={phoness}
        prevLoc={locss}
        prevLat={latss}
        prevLng={lngss}
        prevDel={delss}
        prevImage={imagess}
        prevEmail={emailss}
        prevAddress={addressess}
        closeModal={() => setUpdateModal(false)}
      />

      <Grid container sx={{ gap: 5 }}>
        <Grid item xs={8} md={5} lg={10} style={{ margin: "auto" }}>
          <div style={{ paddingTop: "5%" }}>
            <Table striped bordered hover>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th colSpan="11">BUSINESSES</th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Timings</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Address</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Delivery</th>
                  <th>Image</th>
                  <th style={{ color: "blue" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: lengths }).map((_, index) => (
                  <tr>
                    <td>{index}</td>
                    <td key={index}>{names[index]}</td>
                    <td key={index}> {types[index]}</td>
                    <td key={index}> {timing[index]}</td>
                    <td key={index}> {phones[index]}</td>
                    <td key={index}> {emails[index]}</td>
                    <td key={index}> {locs[index]}</td>
                    <td key={index}>{addresses[index]}</td>
                    <td key={index}> {lats[index]}</td>
                    <td key={index}> {lngs[index]}</td>
                    <td key={index}> {dels[index]}</td>
                    <td key={index}>
                      {" "}
                      <img
                        style={{ width: "40px" }}
                        src={images[index]}
                        alt="business"
                      ></img>
                    </td>
                    <td>
                      {" "}
                      <img
                        onClick={() => {
                          setName(names[index]);
                          setEmail(emails[index]);
                          setType(types[index]);
                          setTiming(timing[index]);
                          setPhone(phones[index]);
                          setLoc(locs[index]);
                          setLat(lats[index]);
                          setLng(lngs[index]);
                          setDel(dels[index]);
                          setImage(images[index]);
                          setAddress(addresses[index]);
                          setUpdateModal(true);
                        }}
                        className="btn"
                        style={{ pointer: "cursor", width: "50px" }}
                        src="https://img.icons8.com/ios/50/000000/edit--v1.png"
                        alt="edit"
                      />
                      &nbsp;&nbsp;
                      <img
                        onClick={() => {
                          setId(ids[index]);
                          setName(names[index]);
                          setModal(true);
                        }}
                        className="btn"
                        style={{ pointer: "cursor", width: "50px" }}
                        src="https://img.icons8.com/flat-round/64/000000/delete-sign.png"
                        alt="delete"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default BusinessList;
