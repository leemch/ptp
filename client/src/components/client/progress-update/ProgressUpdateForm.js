import React, {Component} from 'react';
import {connect} from "react-redux";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import InputGroup from "../../common/InputGroup";
//import {addPost} from "../../actions/postActions";
import PropTypes from "prop-types";
import axios from 'axios';

import { FilePond, registerPlugin  } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);



class ProgressUpdateForm extends Component {

	constructor(props){
		super(props);
		this.state = {
            photos: [],
            fat: "",
            protein: "",
            carbs: "",
            weight: "",
			notes: "",
			errors: {},
			files: [],
			success : false,
      		url : ""
		}
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	componentWillReceiveProps(newProps) {
		if(newProps.errors) {
			this.setState({
				errors: newProps.errors
			});
		}
	}

	onSubmit = e => {
		e.preventDefault();
		const {user} = this.props.auth;

		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};

		this.props.addPost(newPost);
		this.setState({text: ""});
	}


	handleInit() {
        console.log('FilePond instance has initialised', this.pond);
	}

	handleChange = (ev) => {
		this.setState({success: false, url : ""});
		
	  }
	

	// Perform the upload
	handleUpload = (ev) => {

		ev.preventDefault();

		let file = this.state.files[0];
		// Split the filename to get the name and type
		let fileParts = this.state.files[0].name.split('.');
		let fileName = fileParts[0];
		let fileType = fileParts[1];
		console.log("Preparing the upload");
		axios.post(`http://localhost:5000/sign_s3`,{
		  fileName : fileName,
			fileType : fileType,
		})


		.then(response => {
		  var returnData = response.data.data.returnData;
			var signedRequest = returnData.signedRequest;
			


		  var url = returnData.url;
		  this.setState({url: url})
			console.log("Recieved a signed request " + signedRequest);
			

		  
		 // Put the fileType in the headers for the upload
		  var options = {
			headers: {
				'Content-Type': fileType,
			}
			
		  };
		  axios.put(signedRequest,file,options)
		  .then(result => {
			console.log("Response from s3")
			this.setState({success: true});
		  })
		  .catch(error => {
			alert("ERROR " + JSON.stringify(error));
		  })
		})
		.catch(error => {
		  alert(JSON.stringify(error));
		})


	  }



	render(){
		
		const {errors} = this.state;

		const success_message = () => (
			<div style={{padding:50}}>
				<h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
				<a href={this.state.url}>Access the file here</a>
				<br/>
			</div>
		);

		return(
			<div className="add-progress">
				<div className="container">
					<div className="row">
						<div className="col md-8 m-auto">
							<h1 className="display-4 text-center"> Add Progress Update</h1>
							<p className="lead text-center">
								Add info about your progress update.
							</p>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.handleUpload}>
                                    <div>
									
									<center>
										<h1>Upload your photos</h1>
										{this.state.success ? <success_message /> : null}
										<br/>
									</center>

									<FilePond ref={ref => this.pond = ref}
											files={this.state.files}
											allowMultiple={true}
											maxFiles={5}
											//server="/api"
											oninit={() => this.handleInit() }
											onupdatefiles={(fileItems) => {
												// Set current file objects to this.state
												this.setState({
													files: fileItems.map(fileItem => fileItem.file)
												});
												console.log(this.state.files);
											}}>
									</FilePond>

									



                                        <InputGroup 
                                            placeholder="Weight"
                                            name="weight"
                                            icon="fas fa-weight"
                                            value={this.state.weight}
                                            onChange={this.onChange}
                                            error={errors.weight}
                                        />
                                        <InputGroup 
                                            placeholder="Protein"
                                            name="protein"
                                            icon="fas fa-utensils"
                                            value={this.state.protein}
                                            onChange={this.onChange}
                                            error={errors.protein}
                                        />
                                        <InputGroup 
                                            placeholder="Fat"
                                            name="fat"
                                            icon="fas fa-utensils"
                                            value={this.state.fat}
                                            onChange={this.onChange}
                                            error={errors.fat}
                                        />
                                        <InputGroup 
                                            placeholder="Carbohydrates"
                                            name="carbs"
                                            icon="fas fa-utensils"
                                            value={this.state.carbs}
                                            onChange={this.onChange}
                                            error={errors.carbs}
                                        />

										<TextAreaFieldGroup placeholder = "Notes" name="notes" value={this.state.notes} onChange={this.onChange} error={errors.notes}
										info="Tell your trainer some details about this progress update." />
                                        
                                    </div>



								<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
							</form>

						</div>
					</div>
				</div>

			</div>

		)
	}
}

ProgressUpdateForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {})(ProgressUpdateForm);