import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";

import Card from "../../common/Card";
import CardList from "../../common/CardList";
import SearchBox from "../../common/SearchBox";
import Scroll from "../../common/Scroll";
import {getCurrentClients} from "../../../actions/trainerActions";


class ClientList extends Component {


    state = {
        clients: [],
        loading: true
    }

    componentDidMount() {
        axios.get("/api/users/clients")
        .then(res => this.setState({clients: res.data})
        )
        .catch(err => console.error(err))
    }


    render(){

        const {clients} = this.state;

        return(
            <div>
            <SearchBox />
            <Scroll>
                <CardList clients={clients} />
            </Scroll>
            </div>
        );
    }
}

ClientList.propTypes = {
    getCurrentClients: PropTypes.func.isRequired,
    clients: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    clients: state.trainer.clients
});

export default connect(mapStateToProps, {getCurrentClients})(ClientList);