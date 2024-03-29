import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from "../common/Spinner";
import {getProfiles} from "../../actions/profileActions"
import ProfileItem from "./ProfileItem";





class Profiles extends Component {

	componentDidMount() {
		this.props.getProfiles();
	}

render() {
	const {profiles, loading} = this.props.profile;
	let profileItems;

	if(profiles === null || loading){
		profileItems = <Spinner />;
	}else {
		if(profiles.length > 0){
			profileItems = profiles.map(profile =>(
				<ProfileItem key={profile._id} profile={profile} />
			));
		} else {
			profileItems = <h4>No profiles found...</h4>
		}
	}

		return(
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Trainer Profiles</h1>
							<p className="lead text-center">
								Browse and connect with Trainers
							</p>
							{profileItems}

						</div>
					</div>
				</div>
			</div>
		);
	}



}




Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);