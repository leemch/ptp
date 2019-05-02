import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {LoginUser} from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import {Grid, Form, Segment, Button, Header, Message, Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";

class Login extends Component {


constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      loading: false
    }

  }


  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }

    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.LoginUser(user)
  }


	render() {

    const {errors, email, password, loading} = this.state;

		return(
		// 	  <div className="login">
    // <div className="container">
    //   <div className="row">
    //     <div className="col-md-8 m-auto">
    //       <h1 className="display-4 text-center">Log In</h1>
    //       <p className="lead text-center">Sign in to your PhysiqueTrainerPro account</p>
    //       <form onSubmit={this.onSubmit}>
    //         <TextFieldGroup
    //           placeholder="Email Address"
    //           name="email"
    //           type="email"
    //           value={this.state.email}
    //           onChange={this.onChange}
    //           error={errors.email}
    //         />

    //         <TextFieldGroup
    //           placeholder="Password"
    //           name="password"
    //           type="password"
    //           value={this.state.password}
    //           onChange={this.onChange}
    //           error={errors.password}
    //         />
    //         <input type="submit" className="btn btn-info btn-block mt-4" />
    //       </form>
    //     </div>
    //   </div>
    // </div>
      <div>

            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h1" icon color="grey" textAlign="center">
                        <Image src={"../../img/logo1.gif"} />
                        Trainer Sign In
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>


                            <Form.Input 
                            //className={this.handleInputError(errors, 'email')}
                            value={email} fluid name="email" icon="mail" iconPosition="left"
                            placeholder="Email Address" onChange={this.handleChange} type='email'/>

                            <Form.Input 
                            //className={this.handleInputError(errors, 'password')}
                            value={password} fluid name="password" icon="lock" iconPosition="left"
                            placeholder="Password" onChange={this.handleChange} type='password'/>

                            <Button disabled={loading} className={loading ? "loading" : ""} color="grey" fluid size="large">Submit</Button>
                            <Message>Don't have an account? <Link to="/register">Register</Link></Message>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                </Grid.Column>
            </Grid>


  </div>


              

		)
	}
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {LoginUser})(Login);