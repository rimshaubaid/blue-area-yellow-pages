import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import GoogleMapReact from "google-map-react";
import ReactStars from "react-rating-stars-component";
import BusinessUpdate from "../Dashboard/businessupdatemodal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ReviewModal from "./reviewModal";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  var decoded = jwt_decode(token);
}

const ChooseModal = (props) => {
  var names = [];
  var times = [];
  var reviews = [];
  var stars = [];
  var lengths;
  var count = 0;
  const history = useHistory();
  //for updating
  const [totalReview, setTotal] = useState(null);
  const [updatedModal, setUpdateModal] = useState(null);
  const [businessIdd, setBusinessId] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [time, setTime] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address,setAddress] = useState(null);
  const [loc, setLoc] = useState(null);
  const [email,setEmail]=useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [del, setDel] = useState(null);
  const [img, setImg] = useState(null);
  const [rev, setReview] = useState(null);
  const [ratee, setRate] = useState(null);
  //for reviews
  const [reviewUser, setReviewUser] = useState([]);
  const [reviewReview, setReviewReview] = useState([]);
  const [reviewStar, setReviewStar] = useState([]);
  const [reviewDate, setReviewDate] = useState([]);
  const AnyReactComponent = ({ text }) => (
    <div>
      <img src="https://img.icons8.com/color/48/000000/marker--v1.png" alt="" />
      {text}
    </div>
  );

  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  function handleChange(event) {
    setReview(event.target.value);
  }

  function handleReview() {
    const data = {
      userId: decoded.id,
      businessId: props.id,
      review: rev,
      rate: ratee,
    };
    axios
      .post("http://localhost:5000/api/reviews/addReview", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
    history.push("/");
    window.location.reload();
  }

  function showReview() {
    axios
      .get("http://localhost:5000/api/reviews/getByUser")
      .then((res) => {
        lengths = res.data.length;

        for (var i = 0; i < lengths; i++) {
          if (props.id === res.data[i].businessId._id) {
            count++;
            names.push(res.data[i].userId.name);
            reviews.push(res.data[i]?.review);
            stars.push(res.data[i]?.rate);
            times.push(res.data[i].createdAt);
          }
        }
        setTotal(count);
        setBusinessId(props.id);
        setReviewUser(names);
        setReviewReview(reviews);
        setReviewStar(stars);
        setReviewDate(times);
        setReviewModal(true);
      })
      .catch((err) => console.log(err.response));
  }

  return (
    <>
      <BusinessUpdate
        show={updatedModal}
        closeModal={() => setUpdateModal(false)}
        prevName={name}
        prevType={type}
        prevTime={time}
        prevPhone={phone}
        prevLoc={loc}
        prevLat={lat}
        prevLng={lng}
        prevDel={del}
        prevImage={img}
        prevEmail={email}
        prevAddress={address}
      />
      <ReviewModal
        show={reviewModal}
        closeModal={() => setReviewModal(false)}
        busId={businessIdd}
        userProp={reviewUser}
        reviewProp={reviewReview}
        rateProp={reviewStar}
        dateProp={reviewDate}
        totalProp={totalReview}
      />
      <Modal
        show={props.show}
        onHide={props.closeModal}
        dialogClassName="modal-lg xl"
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
        </Modal.Header>
        <Modal.Body>
          <div className="res-price-box">
            <figure></figure>
            <div className="cnts">
              <div className="head">
                {/*<img
                  onClick={() => {
                    setImg(props.image);
                    setName(props.name);
                    setType(props.category);
                    setTime(props.timing);
                    setPhone(props.phone);
                    setEmail(props.email);
                    setLoc(props.locations);
                    setLat(props?.lats);
                    setLng(props?.lngs);
                    setDel(props.del);
                    setUpdateModal(true);
                  }}
                  style={{ cursor: "pointer", float: "right" }}
                  alt="edit"
                  src="https://img.icons8.com/material-sharp/24/000000/edit--v1.png"
                />*/}
                <h3>{props.name}</h3>
              </div>

              <div className="price">
                <b>Type:</b> {props.category}
              </div>
              <div className="price">
                <b>Timings:</b>
                {props.timing}
              </div>
              <div className="price">
                <b>Contact:</b>
                {props.phone}
              </div>
              <div className="price">
                <b>Email:</b>
                <span style={{cursor:'pointer'}}
                  onClick={() =>
                    window.open ("mailto:yourmail.gmail.com")
                  }
                >
                  {" "}
                  {props?.email}
                </span>
              </div>
              <div className="price">
                <b>Location:</b>
                {props.locations}
              </div>
              <div className="price">
                <b>Address:</b>
                {props?.address}
              </div>
              <br />
              {props?.lats != 0 && props?.lngs != 0 ? (
                <div style={{ height: "40vh", width: "100%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCYSe88Tj9SKG9fM_6e9j03R1Rmob685pU",
                    }}
                    defaultCenter={{ lat: 33.71761, lng: 73.06956 }}
                    defaultZoom={10}
                  >
                    <AnyReactComponent
                      lat={props?.lats}
                      lng={props?.lngs}
                      text={props?.name}
                    />
                  </GoogleMapReact>
                </div>
              ) : (
                ""
              )}
              <div style={{ paddingTop: "2%" }}>
                <p>Have you visited this place? Leave a Review!</p>
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
                  <Button onClick={handleReview} size="lg" variant="success">
                    SUBMIT
                  </Button>{" "}
                </div>
              </div>
              <div style={{ marginTop: "5%" }}>
                <Button
                  onClick={() => {
                    showReview();
                    props.closeModal();
                  }}
                  size="lg"
                  variant="primary"
                >
                  SHOW OTHER REVIEWS
                </Button>{" "}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChooseModal;
