import React,{useState} from 'react';
import CardElement from '../Card';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Dropdown from "react-bootstrap/Dropdown";
//const url='https://api.foursquare.com/v2/venues/explore?client_id=OL13ASXYN4COGYLRTTMGADOVWBFAIOMMO1GVT4SXCAR1SCR5&client_secret=YV4ZXXOZUAEMXUU03ZZ4ACPL4RKT4DNAGMLNAIW34XOXSSDG&v=20180323&limit=1&ll=33.71761,73.06956';
 var names=[];
var types=[];
var timing=[];
var phones=[];
var locs=[];
var lats=[];
var lngs=[];
var dels=[];
var lengths;
var images=[];
var ids=[];
var emails=[];
var addresses=[];
axios({
        method:'get',
        url:'http://localhost:5000/api/businesses/hospitals',
       
      }).catch(error => {
        console.log(error.response.data)
      }).then(response => {
        lengths=response.data.length;
        for(var i=0;i<lengths;i++){
          ids.push(response.data[i]._id);
          names.push(response.data[i].name);
          types.push(response.data[i].type);
          timing.push(response.data[i].timings);
          phones.push(response.data[i].phone);
          locs.push(response.data[i].location);
          lats.push(response.data[i].latitude);
          lngs.push(response.data[i].longitude);
          dels.push(response.data[i].delivery);
          images.push(response.data[i].businessImage)
          emails.push(response.data[i]?.email);
          addresses.push(response.data[i]?.address);
        }
      })

function Medical(){
  const history=useHistory();
  const [deliveryBool, setDeliveryBool] = useState("FILTER BY DELIVERY");
  const [locationServices, setLocationServices] =
    useState("FILTER BY LOCATION");
  const [delivery, setDelivery] = useState(1);
  const locationBool = (key) => {
    if (key === 1) {
      setLocationServices("F6");

      history.push({
        pathname: "/filterByLoc",
        state: { detail: "F6",type:"medical clinic" },
      });
    } else if (key === 2) {
      setLocationServices("F7");
      history.push({
        pathname: "/filterByLoc",
        state: { detail: "F7" ,type:"medical clinic"},
      });
    } else if (key === 3) {
      setLocationServices("F8");
      history.push({
        pathname: "/filterByLoc",
        state: { detail: "F8" ,type:"medical clinic"},
      });
    } else if (key === 4) {
      setLocationServices("G6");
      history.push({
        pathname: "/filterByLoc",
        state: { detail: "G6", type: "medical clinic" },
      });
    } else if (key === 5) {
      setLocationServices("G7");
      history.push({
        pathname: "/filterByLoc",
        state: { detail: "G7", type: "medical clinic" },
      });
    } else if (key === 6) {
      setLocationServices("G8");
      history.push({
        pathname: "/filterByLoc",
        state: { detail: "G8" ,type:"medical clinic"},
      });
    }
  };
  const changeBool = (key) => {
    if (key === 2) {
      setDeliveryBool("Delivery Services");
    }
    setDelivery(key);
  };
    return (
      <div>
        <div style={{ paddingTop: "3%", textAlign: "center" }}>
          <h3>HOSPITALS</h3>
        </div>
        <div style={{ float: "right", paddingRight: "1%" }}>
          <Dropdown style={{ paddingTop: "4%", paddingBottom: "4%" }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {deliveryBool}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="2"
                onClick={() => {
                  changeBool(2);
                  history.push("/filterByDelivery");
                }}
              >
                Delivery Services
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div style={{ float: "right", paddingRight: "1%" }}>
          <Dropdown style={{ paddingTop: "4%", paddingBottom: "4%" }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {locationServices}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="1"
                onClick={() => {
                  locationBool(1);
                }}
              >
                F6
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={() => {
                  locationBool(2);
                }}
              >
                F7
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="3"
                onClick={() => {
                  locationBool(3);
                }}
              >
                F8
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="4"
                onClick={() => {
                  locationBool(4);
                }}
              >
                G6
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="5"
                onClick={() => {
                  locationBool(5);
                }}
              >
                G7
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="6"
                onClick={() => {
                  locationBool(6);
                }}
              >
                G8
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <CardElement
          id={ids}
          lengthh={lengths}
          names={names}
          category={types}
          location={locs}
          image={images}
          phone={phones}
          times={timing}
          latitude={lats}
          longitude={lngs}
          del={dels}
          email={emails}
          address={addresses}
        />
      </div>
    );
}

export default Medical;