import React, {Component} from 'react';
import {Link} from "react-router-dom";
import isEmpty from "../../validation/isEmpty";





class ClientItem extends Component {
	render() {
		const {client} = this.props;
		const {clientAuth} = client;

		return(
			<div className="card card-body bg-light mb-3">
				<div className="row">
					<div className="col-2">
						<img src={client.client.avatar} className="rounded-circle" alt="avatar" />
					</div>
					<div className="col-lg-6 col-md-4 col-8">
						<h3>{client.client.name}</h3>
						<Link to={`/client/${client.handle}`} className="btn btn-info">
							Manage Client
						</Link>
					</div>
					<div className="col-md-4 d-none d-md-block">
							<h4>Updates</h4>
										<i className="fa fa-check pr-1" />
										New progress update available.
						</div>

				</div>

			</div>
		)
	}

}

export default ClientItem;