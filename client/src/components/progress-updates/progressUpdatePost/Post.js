import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
//import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

import MacroChart from './MacroChart'
import ProgressDetails from './ProgressDetails'

import Spinner from "../../common/Spinner";
import { getProgressUpdate } from "../../../actions/progressUpdateActions";


class Post extends Component {

	state = {
		protein: 0,
		carbs: 0,
		fat: 0
	}

	componentDidMount(){
		//console.log(this.props.match.params.id);
		this.props.getProgressUpdate(this.props.match.params.id);
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if (this.props.progressUpdate.progressUpdate.macros !== prevProps.progressUpdate.progressUpdate.macros) {
			this.setState({
				protein: this.props.progressUpdate.progressUpdate.macros.protein,
				carbs: this.props.progressUpdate.progressUpdate.macros.carbs,
				fat: this.props.progressUpdate.progressUpdate.macros.fat
			})
		}
	}

	render(){
		const {progressUpdate, loading} = this.props.progressUpdate;
		let stringToDate = new Date(progressUpdate.date);
    	const dd = String(stringToDate.getDate()).padStart(2, '0');
        const mm = String(stringToDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = stringToDate.getFullYear();
		let progressDate = yyyy + '-' + mm + '-' + dd;
		
		let postContent;

		if(progressUpdate === null || loading || Object.keys(progressUpdate).length === 0) {
			postContent = <Spinner />
		} else {
			postContent = (
				<div id="carouselExampleIndicators" className="carousel slide" data-interval="false">
					<ol className="carousel-indicators">
						<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
					</ol>
					<div className="carousel-inner">
						<div className="carousel-item active">
						<img 
						src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Frainerzitelmann%2Ffiles%2F2019%2F05%2FGettyImages-481406443-1200x1785.jpg" 
						className="d-block w-100" alt="..." />
						</div>
						<div className="carousel-item">
						<img src="https://www.rollingstone.com/wp-content/uploads/2018/06/rs-180639-481673993.jpg?crop=900:600&w=1910" className="d-block w-100" alt="..." />
						</div>
						<div className="carousel-item">
						<img src="https://midsizeinsider.com/wp-content/uploads/2018/10/arnold-schwarzenegger-gym.jpg" className="d-block w-100" alt="..." />
						</div>
						</div>
					<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="sr-only">Next</span>
					</a>
				</div>
				
				
			)
			//<div><PostItem post={post} showActions={false} /></div>
		}


		return(
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
						
						<Link to="/progress_feed/123" className="btn btn-light mb-3" >
							Back to Calendar
						</Link>

						<h1 className="display-4 text-center"> Check In Date: {progressDate}</h1>
						
						{postContent}

						
						<ProgressDetails fat={this.state.fat} protein={this.state.protein} carbs={this.state.carbs}/>
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
	progressUpdate: state.progressUpdate
});

export default connect(mapStateToProps, {getProgressUpdate})(Post);