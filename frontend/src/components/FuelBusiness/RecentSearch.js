import React from 'react';
import './RecentSearch.css';
import {Link} from 'react-router-dom';
function RecentSearch(){
    return(
<div className="container-fluid" id="recentsearch-con">
  <h5>FUEL YOUR BUSINESS WITH YELLOW PAGES</h5>
 <button type="button" className="btn btn-success"><Link style={{color:"white"}} to={'/business-entry'}>GET STARTED</Link></button>

</div>
    )
}

export default RecentSearch;