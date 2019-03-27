import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {Link} from "react-router-dom";
import {deleteProgressUpdate, addLike, removeLike} from "../../actions/progressUpdateActions";


class ProgressUpdateItem extends Component {


	onDeleteClick(id) {
		this.props.deletePost(id);
	}

	onLikeClick(id) {
		this.props.addLike(id);
	}

	onUnlikeClick(id) {
		this.props.removeLike(id);
	}

	findUserLike(likes) {
		const {auth} = this.props;
		if(likes.filter(like => like.user === auth.user.id).length > 0){
			return true;
		} else {
			return false;
		}
	}



	render(){
		const {progressUpdate, auth, showActions} = this.props;
		return(
			<div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={progressUpdate.avatar}
                      alt="" />
                  </a>
                  <br />
                  <p className="text-center">{progressUpdate.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{progressUpdate.text}</p>


                  {showActions ? (<span>

                  	<button type="button" className="btn btn-light mr-1" onClick={this.onLikeClick.bind(this, progressUpdate._id)}>
                    <i className={classnames("fas fa-thumbs-up", {
                    	"text-info": this.findUserLike(progressUpdate.likes)
                    })} />
                    <span className="badge badge-light">{progressUpdate.likes.length}</span>
                  </button>
                  <button type="button" className="btn btn-light mr-1" onClick={this.onUnlikeClick.bind(this, progressUpdate._id)}>
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/progressUpdate/${progressUpdate._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
					
					{progressUpdate.user === auth.user.id ? (
						<button onClick={this.onDeleteClick.bind(this, progressUpdate._id)} type="button" className="btn btn-danger mr-1">
							<i className="fas fa-times" />
						</button>
					) : null}

                  </span>) : null}

                </div>
              </div>
            </div>
		)
	}
}

ProgressUpdateItem.defaultProps = {
	showActions: true
}

ProgressUpdateItem.propTypes = {
	progressUpdate: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteProgressUpdate: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {deleteProgressUpdate, addLike, removeLike})(ProgressUpdateItem);