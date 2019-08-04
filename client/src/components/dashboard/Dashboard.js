import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentProfile, getProfileById, deleteAccount} from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import ClientDashboard from "./ClientDashboard";
import ClientList from "./client-list/ClientList";
import axios from "axios";

//import {Header, Icon} from "semantic-ui-react";


class Dashboard extends Component {

	state = {
		photos: {}
	}


	componentDidMount() {

		if(this.props.auth.user.isTrainer){
			this.props.getCurrentProfile();
			const id = '5c980b03602eba1d149749df';
			const date = '07-18-2019';
			const num = 1;
			axios.get(`/api/progress_updates/photos/${id}/${date}/${num}`)
			.then(result => {this.setState({photos: result.data})});
		}
		else {
			this.props.getProfileById(this.props.auth.user.current_trainer);
		}
	}

	onDeleteClick(event){
		this.props.deleteAccount();
	}

	render() {
		const {user} = this.props.auth;
		const {profile, loading} = this.props.profile;

		let dashboardContent;

		if(user.isTrainer){
			if(profile === null || loading){
				dashboardContent = <Spinner />;
			}
			else {
				// Check if logged in user has profile data
				if(Object.keys(profile).length > 0){
					dashboardContent = (
						<div>
						<p className="lead text-muted"> Welcome <Link to={'/profile/' + profile.handle}>{user.name} </Link> 
						</p>
						{/* <ProfileActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />
						<div style={{marginBottom: "60px"}} />
						<button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger"> Delete my Account</button> */}
						{/* <Link to="/client_list" className="btn btn-success">My Clients</Link>  */}
						<ClientList />

						</div>
					);
				}
				else {
					// User is logged in but has no profile
					dashboardContent = (
						<div>
							<p className="lead text-muted"> Welcome {user.name} </p>
							<p>You have not yet set up a profile, please add some info</p>
							<Link to="/create-profile" className="btn btn-lg btn-info">
								Create Profile
							</Link>
						</div>
						);
				}
			}
		}
		else {
			if(profile === null || loading){
				dashboardContent = <Spinner />;
			} else {
				dashboardContent = (
					<div>
					{<ClientDashboard profile={profile}/>}

					</div>
				);
			}
		}

		return(

			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
						
							<h1 className="center"> Dashboard</h1>
							{dashboardContent}

						</div>
					</div>
				</div>
			</div>


		)
	}


}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	getProfileById: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile, getProfileById, deleteAccount})(Dashboard);