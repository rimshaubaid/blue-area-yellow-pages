import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

function DeleteUser(props) {
  const history = useHistory();
  function handleClick(idx) {
    const data = { name: props.user };
    axios
      .post("http://localhost:5000/api/businesses/delete", data)
      .then((res) => {
        axios.post("http://localhost:5000/api/reviews/deleteByBusiness", {
          businessId: props.id,
        });
        history.push("/dashboard");
        window.location.reload();
      })
      .catch((err) => console.log(err.response));
  }
  return (
    <Modal
      show={props.show}
      onHide={props.closeModal}
      dialogClassName="modal-sm sm"
      contentClassName="sm"
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
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to delete Business {props.user}?</h5>

        <div className="row">
          <div className="col-md-6">
            <Button onClick={() => handleClick()}>Yes</Button>
          </div>
          <div className="col-md-6">
            <Button onClick={props.closeModal}>No</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteUser;
