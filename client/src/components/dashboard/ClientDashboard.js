import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentMacros, deleteAccount} from "../../actions/clientActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";


class Dashboard extends Component {


	componentDidMount() {
		this.props.getCurrentMacros();
	}

	render() {
		const {fat, protein, carbs} = this.props.macros;

		let dashboardContent;
				dashboardContent = (
					<div>
					Current Macros:
					<br/>
					Fat: {fat}, Protein: {protein}, Carbs: {carbs}

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