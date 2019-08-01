import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import BootstrapTheme from '@fullcalendar/bootstrap';
import Spinner from "../common/Spinner";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProgressUpdates} from "../../actions/progressUpdateActions";


// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/bootstrap/main.css";

class CalendarApp extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [],
    loading: true

  };



  componentDidMount() {

    this.props.getProgressUpdates(this.props.match.params.client_id);

  }

  componentDidUpdate(prevProps, prevState, snapshot){

    if (this.props.progressUpdate !== prevProps.progressUpdate) {
      let newUpdates = [];


      
      this.props.progressUpdate.progressUpdates.map(update => {
        console.log(update.date);

        let stringToDate = new Date(update.date);
        const dd = String(stringToDate.getDate()).padStart(2, '0');
        const mm = String(stringToDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = stringToDate.getFullYear();
        let progressDate = yyyy + '-' + mm + '-' + dd;
        console.log(progressDate);

        newUpdates.push({
          // creates a new array
          title: "Progress update posted",
          start: progressDate,
          allDay: true
        })
      });

      this.setState({
        calendarEvents: newUpdates
      });
    }
  }



  render() {
    const {loading} = this.props.progressUpdate;
    let calendarContent;
    if(loading){
      calendarContent = <Spinner />
    }
    else{
      calendarContent = (<FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                          left: "prev,next today",
                          center: "title",
                          right: ""
                        }}
                        plugins={[ BootstrapTheme, dayGridPlugin, interactionPlugin]}
                        ref={this.calendarComponentRef}
                        weekends={this.state.calendarWeekends}
                        events={this.state.calendarEvents}
                        dateClick={this.handleDateClick}
                      />);
    }


    return (
      <div className="demo-app">
        <div className="demo-app-top">

        </div>
        <div className="demo-app-calendar">
            {calendarContent}
        </div>
      </div>
    );
  }




  handleDateClick = arg => {

    
    
  };
}

CalendarApp.propTypes = {
  getProgressUpdates: PropTypes.func.isRequired,
  progressUpdate: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	progressUpdate: state.progressUpdate
});

export default connect(mapStateToProps, {getProgressUpdates} )(CalendarApp);
