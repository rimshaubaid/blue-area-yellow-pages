import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import UserDashboard from "../../UserProfile/dashboard";

import axios from "axios";

var role;

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.reload();
  };

  componentDidMount() {
    const { user } = this.props.auth;
    axios({
      method: "post",
      url: "http://localhost:5000/api/users/users",
    })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (user.id === res.data[i]._id) {
            console.log(res.data[i].name);
            role = res.data[i]?.role;
          }
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              {user.id === "61800f18af5bed165383f065" ? (
                <div>
                  <div className="d-flex" id="wrapper">
                    <div id="page-content-wrapper">
                      <div className="container-fluid">
                        <button
                          className="btn btn-link mt-2"
                          id="menu-toggle"
                        ></button>
                        <h1 className="mt-2 text-primary">Admin Dashboard</h1>
                        <div className="row px-2">
                          <div className="col-sm-4 p-sm-2">
                            <div className="card bg-primary text-white shadow-lg">
                              <div className="card-body">
                                <h5 className="card-title">Users</h5>
                                <p className="card-text">Manage Users</p>
                                <Link to="/users" className="btn btn-light">
                                  {" "}
                                  Go to Users
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4 p-sm-2">
                            <div className="card bg-secondary text-white shadow-lg">
                              <div className="card-body">
                                <h5 className="card-title">Businesses</h5>
                                <p className="card-text">Manage Businesses</p>
                                <Link to="/business" className="btn btn-light">
                                  Go to Businesses
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4 p-sm-2">
                            <div className="card bg-info text-white shadow-lg">
                              <div className="card-body">
                                <h5 className="card-title">Reviews</h5>
                                <p className="card-text">Manage Reviews</p>
                                <Link
                                  to={"/allreviews"}
                                  className="btn btn-light"
                                >
                                  Go to Reviews
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <UserDashboard roleName={role ? role : ""} userId={user.id} />
              )}
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
