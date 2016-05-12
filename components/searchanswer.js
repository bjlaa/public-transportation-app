import React from 'react';
import Moment from 'moment';

var defaultSchedule = 'Le métro circule tous les jours de la semaine, y compris le dimanche et les jours fériés. Passages du Métro ligne 1 tous les... : en journée : 2 à 4 min, en soirée : 5 à 7 min, le samedi : 3 à 8 min et le dimanche : 3 à 8 min';


class SearchAnswer extends React.Component {
  render() {
    var currentTime = this.props.time;
    var formattedCurrentTime = Moment(this.props.time).format('LT');

  	if(this.props.nextMetros) {


      var direction = this.props.directionRoute;
      /*
        This is calculated using the approximate minutes per 
        station travelled ratio (the functionnality wasn't delivered 
        in the API)
      */
      var minutesToAdd = (this.props.numberStations*3) / 2;

	  	var timeList = this.props.nextMetros.map(function(metro) {

        var min = metro.message.split('');
        /*
          This adds to our time the data fetched from the API stored
          in our state (nextMetros) and allows us to show the next
          departures/arrivals
        */
        var departure = Moment(currentTime).add(min[0], 'minutes');

        var departureTime = Moment(departure).format('LT');
        console.log(departureTime);

        var arrival = Moment(currentTime).add(minutesToAdd, 'minutes').add(min[0], 'minutes');
        var arrivalTime = Moment(arrival).format('LT');

	  	  return (
	  	  	<div className='time-item' key={metro.message}>
	  	  	  <div className='item-destination'>Direction: {direction}</div>
	  		    <div className='item-message'>Departure at: {departureTime} in {metro.message}</div>
            <div className='item-message'>Arrival at: {arrivalTime}</div>
	  		  </div>
	      )  	  	
	  	});


	  }
  	
    return (
      	<div className='search-answer'>
          <div>The next subways for this destination are:</div>
          <div className='time-list'>
          	{timeList}
          </div>
        </div>
    )
  }
}


export default SearchAnswer;