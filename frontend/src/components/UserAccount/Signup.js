import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import classnames from 'classnames';

class Register extends Component {
     constructor(){
       super();
       this.state = {
         name:"",
         email:"",
         password:"",
         password2:"",
         errors:{},
         role:"",
       };
     }

     componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  
     componentWillReceiveProps(nextProps){
       if(nextProps.errors){
         this.setState({
           errors:nextProps.errors
         });
       }
     }
     onChange = e => {
       this.setState({[e.target.id]:e.target.value});
     };

     onSubmit = e => {
       e.preventDefault();
     
     const newUser = {
       name:this.state.name,
       email:this.state.email,
       password:this.state.password,
       password2:this.state.password2,
       role:this.state.role
     };
     console.log('role',this.state.role)
     this.props.registerUser(newUser,this.props.history);
     alert("User Registered!");
    };

    render(){
      const {errors}=this.state;
        return (
           <div className="col-md-12">
                <h3>Sign Up</h3>
           <form noValidate onSubmit={this.onSubmit}>
           
              <div>
              <div className="form-group">
                <label htmlFor="Name">Name</label>
                <span className="red-text">{errors.name}</span>
                <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                  type="text"
                  id="name"
                  className={classnames("form-control",{
                    invalid: errors.name
                  })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
                <input 
                  onChange={this.onChange}
                  type="email"
                  className= {classnames("form-control", {
                    invalid: errors.email
                  })}
                  id="email"
                  value={this.state.email}
                  error={errors.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
                <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                  type="password"
                  className={classnames("form-control", {
                    invalid: errors.password
                  })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                 <span className="red-text">{errors.password2}</span>
                <input
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                  type="password"
                  className={classnames("form-control", {
                    invalid: errors.password2
                  })}
                />
              </div>

              <div className="form-group">
              <label>What Are You?</label>
                <select name="role" id="role" onChange={this.onChange}>
                <option>Select Type</option>
                <option>Customer</option>
                <option>Shopkeeper</option>
               </select>
              </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              </div>
            </div>
            </form>
            <p>Already a member? <Link to={"/login"}>Sign in</Link></p>
            </div>
        );
        }
 }

 Register.propTypes = {
   registerUser:PropTypes.func.isRequired,
   auth:PropTypes.object.isRequired,
   errors:PropTypes.object.isRequired
 };

 const mapStateToProps = state => ({
   auth:state.auth,
   errors:state.errors
 });
 
 export default connect(
   mapStateToProps,
   { registerUser }
 )(withRouter(Register));

