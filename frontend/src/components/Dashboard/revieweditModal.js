import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ReactStars from "react-rating-stars-component";

function UpdateReview(props) {
  const [rev, setReview] = useState(null);
  const [ratee, setRate] = useState(null);

  const history = useHistory();
  function handleUpdate() {
    const data = { reviewId: props.reviewId, review: rev, rate: ratee };
    axios
      .patch("http://localhost:5000/api/reviews/update", data)
      .then((res) => {
        history.push("/dashboard");
        window.location.reload();
      })
      .catch((err) => console.log(err.response));
  }
  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  function handleChange(event) {
    setReview(event.target.value);
  }

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
          <h4>Update Review</h4>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingTop: "2%" }}>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#fdd700"
          />
          <InputGroup style={{ paddingTop: "4%" }} size="lg">
            <FormControl
              onChange={handleChange}
              placeHolder="Write a Review..."
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <div style={{ marginTop: "1%", float: "right" }}>
            <Button onClick={handleUpdate} size="lg" variant="success">
              SUBMIT
            </Button>{" "}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateReview;
