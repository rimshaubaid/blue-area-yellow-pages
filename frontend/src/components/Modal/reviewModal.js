import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";

function ReviewModal(props) {
  //console.log('reviewmodal',props);
  return (
    <Modal
      show={props.show}
      onHide={props.closeModal}
      dialogClassName="modal-lg lg"
      contentClassName="lg"
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
        <Table striped bordered hover>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th colSpan="11">Reviews</th>
            </tr>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Review</th>
              <th>Rate</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: props.totalProp }).map((_, index) => (
              <tr>
                <td>{index}</td>
                <td key={index}>{props.userProp[index]}</td>
                <td key={index}> {props.reviewProp[index]}</td>
                <td key={index}> {props.rateProp[index]}</td>
                <td key={index}> {props.dateProp[index]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ReviewModal;
