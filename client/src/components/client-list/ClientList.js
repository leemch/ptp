import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Spinner from "../common/Spinner";
import ClientItem from "./ClientItem";
import axios from "axios";
import SearchBox from "./SearchBox";




class ClientList extends Component {


	state = {
        clients: [],
        loading: true
    }

    componentDidMount() {
        axios.get("/api/users/clients")
        .then(res => this.setState({
			clients: res.data,
			loading: false
		})
        )
        .catch(err => console.error(err))
    }

render() {
	const {clients, loading} = this.state;
	let clientItems;

	if(clients === null || loading){
		clientItems = <Spinner />;
	}else {
		if(clients.length > 0){
			
			clientItems = clients.map(client =>(
				<ClientItem key={client.client._id} client={client} />
			));
		} else {
			clientItems = <h4>No clients found...</h4>
		}
	}

		return(
			<div className="clients">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Your Clients</h1>
							<p className="lead text-center">
								View and manage your clients
							</p>
							<SearchBox />
							{clientItems}

						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ClientList;