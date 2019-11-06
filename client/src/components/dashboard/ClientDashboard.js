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

  state = {
    macros: {
		fat: 0,
		protein: 0,
		carbs: 0
	}
  }

	componentDidMount(){

      console.log(this.props.getCurrentMacros());
		
	}

	render() {
		const {fat, protein, carbs} = this.state.macros;
		const {profile} = this.props;

		let dashboardContent;
				dashboardContent = (
					
					<div className="row">

          <div className="col-md-6">
					<h3 className="text-center text-info">Nutrition</h3>
					
					<div className="table-responsive">
						<table className="table table-striped table-lg table-bordered table-dark padding-4">
						<thead>
							<tr>
							<th>Macronutrients</th>
							<th>Goal</th>
							</tr>
						</thead>
						<tbody>
							<tr>
							<td>Protein</td>
							<td>{protein}g</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
							<td>Fat</td>
							<td>{fat}g</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
							<td>Carbohydrates</td>
							<td>{carbs}g</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
							<td>Your calorie goal</td>
							<td>{(fat*9)+(protein*3)+(carbs*3)} Calories</td>
							</tr>
						</tbody>

						</table>
					</div>

				</div>


				<div className="col-md-6">
					<h3 className="text-center text-info">Training</h3>

					<div className="table-responsive">
						<table className="table table-striped table-lg table-bordered table-dark padding-4">
						<tbody>
							<tr>
							<td>Calories to burn:</td>
							<td></td>
							</tr>
						</tbody>
						<tbody>
							<tr>
							<td>Strength goals:</td>
							<td></td>
							</tr>
						</tbody>

						</table>
					</div>
					
				</div>
					
					<Link className="btn btn-primary" to={`/progress_add/`}>
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