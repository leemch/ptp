import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";

class Landing extends Component {

componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }
  }
  
	render() {
		return(

      
    <div>
      <header className="landing">
        <div className="dark-overlay">
          <div className="landing-inner container">
            <div className="row">
                <div className="col-lg-8">
                  <h1 className="display-4">Invite clients and <strong>track their progress</strong></h1>
                  <div className="d-flex">
                    <div className="p-4 align-self-start">
                      <i className="fas fa-check fa-2x"></i>
                    </div>
                    <div className="p-4 align-self-end">
                      lorem 12312312312312312wsfwfwslfkshflkjsdhfjksdhflkjsdhdfsjl
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="p-4 align-self-start">
                      <i className="fas fa-check fa-2x"></i>
                    </div>
                    <div className="p-4 align-self-end">
                      lorem 12312312312312312wsfwfwslfkshflkjsdhfjksdhflkjsdhdfsjl
                    </div>
                  </div>


                  <div className="d-flex">
                      <div className="p-4 align-self-start">
                        <i className="fas fa-check fa-2x"></i>
                      </div>
                      <div className="p-4 align-self-end">
                        lorem 12312312312312312wsfwfwslfkshflkjsdhfjksdhflkjsdhdfsjl
                      </div>
                  </div>
                </div>
                
                <div className="col-lg-4">
                  <div className="card bg-primary text-center card-form">
                    <div className="card-body">
                      <h3>Sign Up Today</h3>
                      <p>Please fill out this form to register</p>
                      <form>
                        <div className="form-group">
                          <input type="text" className="form-control form-control-lg" placeholder="Username" />
                        </div>
                        <div className="form-group">
                          <input type="email" className="form-control form-control-lg" placeholder="Email" />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control form-control-lg" placeholder="Password" />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control form-control-lg" placeholder="Password2" />
                        </div>
                        <input type="submit" value="Submit" className="btn btn-outline-light btn-block" />
                      </form>
                    </div>
                  </div>
                </div>             
            </div>
          </div>
        </div>

      </header>

      
        <section id="explore-head-section">
          <div className="container">
            <div className="row">
              <div className="col text-center py-5">
                <h1 className="display-4">Explore</h1>
                <p className="lead">Lorem i[sum asdasdasdasdasdasdasdasdasdasd</p>
                <a href="#" className="btn btn-outline-secondary">Find Out More</a>
              </div>

            </div>
          </div>
        </section>

        <section id="explore-section" className="bg-light text-muted py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img className="img-fluid mb-3 rounded-circle" src="img/explore-section1.jpg" alt="" />
              </div>
              <div className="col-md-6">
              <h3>Explore and Connect</h3>
              <p>Lorem adfigadfiageoiryiasdfgisgfigskugfukfjhgfjhgfjhgfjhgfg</p>
              <div className="d-flex">
                <div className="p-4 align-self-start">
                  <i className="fas fa-check fa-2x"></i>
                </div>
                <div className="p-4 align-self-end">
                Lorem adfigadfiageoiryiasdf
                </div>
              </div>
              <div className="d-flex">
                <div className="p-4 align-self-start">
                  <i className="fas fa-check fa-2x"></i>
                </div>
                <div className="p-4 align-self-end">
                Lorem adfigadfiageoiryiasdf
                </div>
              </div>

              </div>
            </div>
          </div>
        </section>


    </div>

		/*<div className="landing">
    <div className="dark-overlay landing-inner text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
           
            <h1 className="display-3 mb-4">Physique Trainer Pro
            </h1>
            <p className="lead"> Create a trainer profile and get clients to sign up with you.</p>
            <hr />
            <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
            <Link to="/login" className="btn btn-lg btn-light">Login</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  */

		)
	}
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);