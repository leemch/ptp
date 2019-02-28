import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import ProgressUpdateForm from "./PostsForm";
import ProgressUpdateFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getProgressUpdates } from "../../actions/postActions";


class ProgressUpdates extends Component {


	componentDidMount(){
		this.props.getPosts();
	}

	render(){

	const {progressUpdates, loading} = this.props.progressUpdate;
	let progressUpdateContent;

	if(progressUpdates === null || loading){
		progressUpdateContent = (<Spinner />);
	} else {
		progressUpdateContent = <ProgressUpdateFeed posts={progressUpdates} />;
	}

		return(
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<ProgressUpdateForm />
							{progressUpdateContent}
						
						</div>
						
					</div>
				</div>

			</div>
		)
	}
}

ProgressUpdates.propTypes = {
	progressUpdate: PropTypes.object.isRequired,
	getProgressUpdates: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	progressUpdate: state.progressUpdate
});

export default connect(mapStateToProps, {getProgressUpdates})(ProgressUpdates);