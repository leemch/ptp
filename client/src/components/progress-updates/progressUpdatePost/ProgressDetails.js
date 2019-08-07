import React, {Component} from 'react';



class ProgressDetails extends Component {
	render(){
		const {experience, education} = this.props;



		return(
			<div className="row">
				<div className="col-md-6">
					<h3 className="text-center text-info">Nutrition</h3>
					
					<div className="table-responsive">
						<table className="table table-striped table-lg table-bordered table-dark padding-4">
						<thead>
							<tr>
							<th>Macro</th>
							<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							<tr>
							<td>Protein</td>
							<td>{}</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
							<td>Fat</td>
							<td>{}</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
							<td>Carbohydrates</td>
							<td>{}</td>
							</tr>
						</tbody>

						</table>
					</div>

				</div>


				<div className="col-md-6">
					<h3 className="text-center text-info">Training</h3>
					
				</div>
			</div>
		
		)
	}
}
export default ProgressDetails;