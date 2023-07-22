import Grid from "@mui/material/Grid";
import React from "react";

import axios from "axios";
import Table from "react-bootstrap/Table";

import DeleteModal from "./userdeletemodal";

var names = [];
var emails = [];
var passwords = [];
var lengthOfVenues = [];
var roles = [];
var ids = [];
axios({
  method: "post",
  url: "http://localhost:5000/api/users/users",
})
  .catch((error) => {
    console.log(error.response);
  })
  .then((response) => {
    if (response) {
      lengthOfVenues = response.data.length;
      for (var i = 0; i < lengthOfVenues; i++) {
        ids.push(response.data[i]._id);
        names.push(response.data[i].name);
        emails.push(response.data[i].email);
        passwords.push(response.data[i].password);
        roles.push(response.data[i].role);
      }
    }
  });
function UserList() {
  const [showModal, setModal] = React.useState(false);
  const [namee, setName] = React.useState(null);
  const [emaill, setEmail] = React.useState(null);
  return (
    <>
      <DeleteModal
        useremail={emaill}
        show={showModal}
        user={namee}
        closeModal={() => setModal(false)}
      />
      <Grid container sx={{ gap: 5 }}>
        <Grid item xs={8} md={5} lg={10} style={{ margin: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th colSpan="10">USERS</th>
              </tr>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th style={{ color: "blue" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: lengthOfVenues }).map((_, index) => (
                <tr>
                  <td>{index}</td>
                  <td key={index}>{names[index]}</td>
                  <td key={index}> {emails[index]}</td>
                  <td key={index}> {passwords[index]}</td>
                  <td key={index}>
                    {ids[index] === "61800f18af5bed165383f065"
                      ? "Admin"
                      : roles[index]}
                  </td>
                  <td
                    onClick={() => {
                      setEmail(emails[index]);
                      setName(names[index]);
                      setModal(true);
                    }}
                  >
                    <img
                      className="btn"
                      style={{ pointer: "cursor", width: "60px" }}
                      src="https://img.icons8.com/flat-round/64/000000/delete-sign.png"
                      alt="delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}

export default UserList;
