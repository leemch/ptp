import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import BootstrapTheme from '@fullcalendar/bootstrap';

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProgressUpdates} from "../../actions/progressUpdateActions";


// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/bootstrap/main.css";

class CalendarApp extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: "Event Now", start: new Date() }
    ],
    loading: true

  };


  componentDidMount() {
    this.props.getProgressUpdates(this.props.match.params.client_id);
    console.log(this.props.progressUpdate.progressUpdates);

      this.props.progressUpdate.progressUpdates.map(update => {
        console.log(update.date);
        this.setState({
          calendarEvents: this.state.calendarEvents.concat({
            // creates a new array
            title: "Progress update posted",
            start: update.date,
            allDay: true
          })
        });
      })
      
    
  }


  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-top">

        </div>
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[ BootstrapTheme, dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
        </div>
      </div>
    );
  }




  handleDateClick = arg => {

    this.props.progressUpdate.progressUpdates.map(update => {
      console.log(update.date);
      this.setState({
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: "Progress update posted",
          start: update.date,
          allDay: true
        })
      });
    })
    
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
