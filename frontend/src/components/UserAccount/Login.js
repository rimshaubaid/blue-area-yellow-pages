import React,{Component} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import classnames from 'classnames';

  class Login extends Component {
    constructor(){
      super();
      this.state={
        email:"",
        password:"",
        errors:{}
      };
    }
    
    componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  
    componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

    
    onChange = e =>{
      this.setState({[e.target.id]:e.target.value});
    };

    onSubmit = e => {
      e.preventDefault();

      const userData = {
        email:this.state.email,
        password:this.state.password
      };

      this.props.loginUser(userData);
    };

    render(){
      const {errors}=this.state;
  return (
<div className="col-md-12">
<h3>Log in</h3>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
            <input
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
              type="email"
              className={classnames("form-control", {
                    invalid: errors.email || errors.emailnotfound
                  })}
              id="email"
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
            <input
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
              type="password"
              className={classnames("form-control", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
              id="password"
              
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block" >
              <span>Login</span>
            </button>
          </div>

        </form>
         <p>Not a member? <Link to={"/register"}>Sign up</Link></p>
     </div>
  );
    }

};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);