import React, { useState } from "react";
import "./HeroSection.css";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function HeroSection() {
  var lengths;
  var count = 0;
  const history = useHistory();
  const [searched, setSearched] = useState(null);
  const [searchedId, setsearchedId] = useState([]);
  const [searchedName, setsearchedName] = useState([]);
  const [searchedType, setsearchedType] = useState([]);
  const [searchedTime, setsearchedTime] = useState([]);
  const [searchedPhone, setsearchedPhone] = useState([]);
  const [searchedLoc, setsearchedLoc] = useState([]);
  const [searchedLat, setsearchedLat] = useState([]);
  const [searchedLng, setsearchedLng] = useState([]);
  const [searchedDel, setsearchedDel] = useState([]);
  const [searchedImg, setsearchedImg] = useState([]);
  const [searchedEmail, setsearchedEmail] = useState([]);
  const [searchedAddress,setSearchedAddress] = useState([]);
  const [total, setTotal] = useState(null);
  function handleChange(event) {
    setSearched(event.target.value);
  }

  function handleRoute() {
    const data = searched;
    axios
      .get("http://localhost:5000/api/businesses/searchBusiness/" + data, {
        params: { name: data },
      })
      .catch((err) => console.log(err.response))
      .then((response) => {
        lengths = response.data.length;
        console.log(response);
        for (var i = 0; i < lengths; i++) {
          setsearchedId(response.data[i]._id);
          setsearchedName(response.data[i].name);
          setsearchedType(response.data[i].type);
          setsearchedTime(response.data[i].timings);
          setsearchedPhone(response.data[i].phone);
          setsearchedLoc(response.data[i].location);
          setsearchedLat(response.data[i].latitude);
          setsearchedLng(response.data[i].longitude);
          setsearchedDel(response.data[i].delivery);
          setsearchedImg(response.data[i].businessImage);
          setsearchedEmail(response.data[i]?.email);
          setSearchedAddress(response.data[i]?.address);
          count++;
        }
        setTotal(count);
        if (searchedName.length > 0) {
          history.push({
            pathname: "/venues",
            state: {
              resId: searchedId,
              resName: searchedName,
              resType: searchedType,
              resTime: searchedTime,
              resPhone: searchedPhone,
              resLoc: searchedLoc,
              resLat: searchedLat,
              resLng: searchedLng,
              resDel: searchedDel,
              resImg: searchedImg,
              resTotal: total,
              resEmail: searchedEmail,
              resAddress: searchedAddress,
            },
          });
        }
      });
  }

  return (
    <div className="container-fluid" id="sec-con">
      <h2>Search & Live & Explore</h2>

      <div className="search-container">
        <input
          type="text"
          name="search"
          placeholder="(E.g: KFC)"
          class="search-input"
          onChange={handleChange}
        ></input>

    
          <img
            onClick={() => handleRoute()}
             src="https://img.icons8.com/material-rounded/24/000000/search.png"
          />
      
      </div>

      <div className="buttonLinks">
        <Button style={{ fontSize: "large" }}>
          <Link to={"/restaurants"} style={{ color: "black" }}>
            Restaurants
          </Link>
        </Button>
        <Button style={{ fontSize: "large" }}>
          <Link to={"/medical"} style={{ color: "black" }}>
            Medical Clinics
          </Link>
        </Button>
        <Button style={{ fontSize: "large" }}>
          <Link to={"/fitness"} style={{ color: "black" }}>
            Outdoors & Recreation
          </Link>
        </Button>
        <Button style={{ fontSize: "large" }}>
          <Link to={"/car-repair"} style={{ color: "black" }}>
            Car Repair
          </Link>
        </Button>
        <Button style={{ fontSize: "large" }}>
          <Link to={"/grocery-stores"} style={{ color: "black" }}>
            Grocery Stores
          </Link>
        </Button>
        <Button style={{ fontSize: "large" }}>
          <Link to={"/others"} style={{ color: "black" }}>
            Others
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
