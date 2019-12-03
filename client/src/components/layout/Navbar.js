import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {clearCurrentProfile} from "../../actions/profileActions";
//import {Image} from "semantic-ui-react";

class Navbar extends Component {

onLogoutClick(event) {
  event.preventDefault();
  this.props.clearCurrentProfile();
  this.props.logoutUser();
}

	render() {

    const {isAuthenticated, user} = this.props.auth;

    const authLinks = (
      <div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown mr-3">
            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
              <i className="fas fa-user"></i> Welcome
            </a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/">
                  <i className="fas fa-user-circle"></i>
                  Profile
                </Link>
                <Link className="dropdown-item" to="/">
                  <i className="fas fa-cog"></i>
                  Settings
                </Link>
                <Link className="dropdown-item" to="/client_list">
                  My Clients
                </Link>
                <Link className="dropdown-item" to="/dashboard">
                  Dashboard
                </Link>
              </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="" onClick={this.onLogoutClick.bind(this)}>
              <img className="rounded-circle" src={user.avatar} alt={user.name} style= {{width: "25px", marginRight: "5px"}} title="You must have a gravatar connected to your email to display an image."/>
              Logout <i className="fas fa-user-times"></i>              
            </a>
          </li>
        </ul>
      </div>
        



      );

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      );

		return(
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4 p-0">
      <div className="container">

        <Link className="navbar-brand" to="/">
        <img style={{width: '80px'}} src="http://u.cubeupload.com/leemch/ptplogo.png" /> PhysiqueTrainerPro</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item px-2">
              <Link className="nav-link" to="/profiles"> Trainers </Link>
            </li> 
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
  </nav>
		)
	}
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(Navbar);