import React from 'react';

class SearchAnswer extends React.Component {
  render() {
  	if(this.props.nextMetros) {
	  	var timeList = this.props.nextMetros.map(function(metro) {
	  	  return (
	  	  	<div className='time-item'>
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