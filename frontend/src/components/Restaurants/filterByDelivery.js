import React,{useState} from 'react';
import CardElement from '../Card';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import {useHistory} from 'react-router-dom';
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
var emails=[];
var addresses=[];
axios({
        method:'get',
        url:'http://localhost:5000/api/businesses/filterByDelivery',
       
      }).catch(error => {
        console.log(error.response.data)
      }).then(response => {
        lengths=response.data.length;
        for(var i=0;i<lengths;i++){
          
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

function Restaurants(){
    const history=useHistory();
  const [deliveryBool, setDeliveryBool] = useState("Delivery Services");
  const [delivery,setDelivery]=useState(1);
  const changeBool = (key) => {
    if (key === 2) {
      setDeliveryBool("Delivery Services")
    } 
    setDelivery(key);

    
  };
    return(
      <div>
      <div style={{paddingTop:"3%",textAlign:'center'}}>
      <h3>RESTAURANTS</h3>
      </div>
      <div style={{float:"right",paddingRight:"1%"}}>
       <Dropdown style={{paddingTop:'4%',paddingBottom:'4%'}}>

  <Dropdown.Toggle variant="primary" id="dropdown-basic">
    {deliveryBool}
  </Dropdown.Toggle>
 <Dropdown.Menu>
    
    <Dropdown.Item 
    eventKey="2" onClick={() => changeBool(2)}>Delivery Services</Dropdown.Item>
    
  </Dropdown.Menu>
  
</Dropdown>
</div>
  <CardElement lengthh={lengths} names={names} category={types} location={locs} image={images} phone={phones} times={timing}
    latitude={lats} longitude={lngs} del={dels} email={emails} address={addresses}
  />
</div>
    )
}

export default Restaurants;