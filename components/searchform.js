import React from 'react';

class SearchForm extends React.Component {
  
  handleSubmit(e) {
    e.preventDefault();
    var departArray = JSON.parse('['+this.refs.departure.value+']');
    var destiArray = JSON.parse('['+this.refs.destination.value+']');
    var departureOrder = departArray[0];
    var departureId = departArray[1];
    var destination = destiArray[1];

    
    this.props.loadNextMetros(departureOrder, departureId, destination);
  }

  render() {
    var stationList;
    if(this.props.stationNames) {
      stationList = this.props.stationNames.map(function(station) {
        return <option key={station.id} value={[station.order, station.id]}>{station.name}</option>
      });
      var revStationList = stationList.slice();
      revStationList.reverse();
    }

    return (
      	<form className='search-form' onSubmit={this.handleSubmit.bind(this)}>

      	  <label htmlFor='departure'>
            <div className='departure'>
              <div>Departure:</div>
              <select ref='departure' name='departure' id='departure'>
                {stationList}
              </select>
              </div>
      	  </label>

      	  <label htmlFor='destination'>
            <div className='destination'>
              <div>Destination:</div>
              <select ref='destination' name='destination' id='destination'>
                {revStationList}
              </select>
              </div>
      	  </label>

          <div className='submit'>
            <input className='submit-button' type='submit' value='Submit'/>
          </div>

      	</form>
    )
  }
}


export default SearchForm;