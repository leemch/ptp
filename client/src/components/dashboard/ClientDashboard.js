import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentMacros, deleteAccount} from "../../actions/clientActions";
import ProfileHeader from '../profile/ProfileHeader'
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import isEmpty from "../../validation/isEmpty"


class Dashboard extends Component {

	componentDidMount(){

			this.props.getCurrentMacros();
		
	}

	render() {
		const {fat, protein, carbs} = this.props.macros;
		const {profile} = this.props;

		let dashboardContent;
				dashboardContent = (
					
					<div>

					<div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    <img className="rounded-circle" src={profile.user.avatar} alt="" />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="display-4 text-center">{profile.user.name}</h1>
                  <p className="lead text-center">{profile.status}{isEmpty(profile.company) ? null : (<span> at {profile.company}</span>)}</p>
                  {isEmpty(profile.company) ? null : (<p>{profile.location}</p>)}
                  <p>

                  {isEmpty(profile.website) ? null : (
                  	<a className="text-white p-2" href={profile.website} target="_blank">
                      <i className="fas fa-globe fa-2x"></i>
                    </a>
                  )}
                  

                    {isEmpty(profile.social.twitter) ? null : (
                      <a className="text-white p-2" href={profile.social.twitter} target="_blank">
                        <i className="fab fa-twitter fa-2x"></i>
                      </a>
                    )}
                    {isEmpty(profile.social.facebook) ? null : (
                      <a className="text-white p-2" href={profile.social.facebook} target="_blank">
                        <i className="fab fa-facebook fa-2x"></i>
                      </a>
                    )}
                    {isEmpty(profile.social.linkedin) ? null : (
                      <a className="text-white p-2" href={profile.social.linkedin} target="_blank">
                        <i className="fab fa-linkedin fa-2x"></i>
                      </a>
                    )}
                    {isEmpty(profile.social.instagram) ? null : (
                      <a className="text-white p-2" href={profile.social.instagram} target="_blank">
                        <i className="fab fa-instagram fa-2x"></i>
                      </a>
                    )}
                    {isEmpty(profile.social.youtube) ? null : (
                      <a className="text-white p-2" href={profile.social.youtube} target="_blank">
                        <i className="fab fa-youtube fa-2x"></i>
                      </a>
                    )}
                
                  

                  </p>
                </div>
              </div>
            </div>
          </div>
					Current Macros:
					<br/>
					Fat: {fat}, Protein: {protein}, Carbs: {carbs}
					<br />

					Training Split:
					
					<Link className="btn btn-primary" to={`/client_login/${profile.user._id}`}>
					<i className="fas fa-share-square fa-2x" aria-hidden="true"></i>
						Send Progress Update
					</Link>

					</div>
				);

		return(
				<div className="container">
							{dashboardContent}
				</div>
		)
	}


}

Dashboard.propTypes = {
	getCurrentMacros: PropTypes.func.isRequired,
	macros: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	macros: state.client.macros,
});

export default connect(mapStateToProps, {getCurrentMacros, deleteAccount})(Dashboard);