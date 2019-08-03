import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
//import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

import Spinner from "../../common/Spinner";
import { getProgressUpdate } from "../../../actions/progressUpdateActions";


class Post extends Component {


	componentDidMount(){
		this.props.getProgressUpdate(this.props.match.params.id);
	}

	render(){
		const {progressUpdate, loading} = this.props.post;
		let postContent;

		//if(progressUpdate === null || loading || Object.keys(progressUpdate).length === 0) {
		//	postContent = <Spinner />
		//} else {
		//	postContent = null//<div><PostItem post={post} showActions={false} /></div>
		//}
		postContent = (
			<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" >
				<ol class="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				</ol>
				<div class="carousel-inner">
					<div class="carousel-item active">
					<img 
					src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Frainerzitelmann%2Ffiles%2F2019%2F05%2FGettyImages-481406443-1200x1785.jpg" 
					class="d-block w-100" alt="..." />
					</div>
					<div class="carousel-item">
					<img src="https://www.rollingstone.com/wp-content/uploads/2018/06/rs-180639-481673993.jpg?crop=900:600&w=1910" class="d-block w-100" alt="..." />
					</div>
					<div class="carousel-item">
					<img src="https://midsizeinsider.com/wp-content/uploads/2018/10/arnold-schwarzenegger-gym.jpg" class="d-block w-100" alt="..." />
					</div>
					</div>
				<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>	
		)

		return(
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
						<Link to="/progress_feed/123" className="btn btn-light mb-3" >
							Back to Calendar
						</Link>	
						{postContent}
						<CommentForm postId={progressUpdate._id} />
						<CommentFeed postId={progressUpdate._id} comments={progressUpdate.comments} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}


Post.propTypes = {
	progressUpdate: PropTypes.object.isRequired,
	getProgressUpdate: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	post: state.progressUpdate
});

export default connect(mapStateToProps, {getProgressUpdate})(Post);