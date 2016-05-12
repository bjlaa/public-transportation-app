import React from 'react';

var defaultSchedule = 'Le métro circule tous les jours de la semaine, y compris le dimanche et les jours fériés. Passages du Métro ligne 1 tous les... : en journée : 2 à 4 min, en soirée : 5 à 7 min, le samedi : 3 à 8 min et le dimanche : 3 à 8 min';


class SearchAnswer extends React.Component {
  render() {
  	if(this.props.nextMetros) {
	  	var timeList = this.props.nextMetros.map(function(metro) {
	  	  return (
	  	  	<div className='time-item' key={metro.message}>
	  	  	  <div className='item-destination'>{metro.destination}</div>
	  		  <div className='item-message'>{metro.message}</div>
	  		</div>
	      )  	  	
	  	});
	}
  	
    return (
      	<div className='search-answer'>
          <div>The next metros for this destination are:</div>
          <div className='time-list'>
          	{timeList}
          </div>
        </div>
    )
  }
}


export default SearchAnswer;