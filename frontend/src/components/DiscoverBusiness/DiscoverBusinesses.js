import React from 'react';
import './DiscoverBusinesses.css'
import {Link} from 'react-router-dom';



export default function DiscoverBusinesses(props){
    return(
  <div style={{paddingBottom:"4%"}} className="container-fluid" id="discover-con">
<h1>DISCOVER BUSINESSES IN BLUE AREA</h1>
<button type="button" className="btn btn-success"><Link style={{color:"white"}} to={'/maps'}>DISCOVER</Link></button>
  </div>
    )
}

