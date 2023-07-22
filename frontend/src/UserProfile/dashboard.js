import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';



function UserDash(props){
    const [roleName,setRoleName]=useState(null);
    useEffect(() => {
  axios.post('http://localhost:5000/api/users/getUserById',{_id:props?.userId})
  .then((res) => {
      setRoleName(res?.data[0]?.role);
  })
  .catch((err) => console.log(err))
    },[props?.userId])
    return (
      <div>
        <div className="d-flex" id="wrapper">
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <button className="btn btn-link mt-2" id="menu-toggle"></button>
              <h1 className="mt-2 text-primary">
                {roleName ? roleName : "User"} Dashboard
              </h1>
              <div className="row px-2">
                {roleName && roleName == "Customer" ? (
                  <div className="col-sm-4 p-sm-2 col-md-6">
                    <div className="card bg-info text-white shadow-lg">
                      <div className="card-body">
                        <h5 className="card-title">Reviews</h5>
                        <p className="card-text">Manage Added Reviews</p>
                        <Link
                          to={"/reviewsAddedByUser"}
                          className="btn btn-light"
                        >
                          Go to Reviews
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-sm-4 p-sm-2 col-md-6">
                    <div className="card bg-secondary text-white shadow-lg">
                      <div className="card-body">
                        <h5 className="card-title">Businesses</h5>
                        <p className="card-text">Manage Added Businesses</p>
                        <Link
                          to={"/businessAddedByUser"}
                          className="btn btn-light"
                        >
                          Go to Businesses
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserDash;