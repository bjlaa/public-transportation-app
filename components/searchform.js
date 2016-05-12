import React from 'react';

class SearchForm extends React.Component {
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.createTimeStamp();
    var departArray = JSON.parse('['+this.refs.departure.value+']');
    var destiArray = JSON.parse('['+this.refs.destination.value+']');
    var departureOrder = departArray[0];
    var departureId = departArray[1];
    var destinationOrder = destiArray[0];
    var destinationId = destiArray[1];

    this.props.loadNextMetros(departureOrder, departureId, destinationOrder, destinationId);
  }

  testDisabling(e) {
    e.preventDefault();
    console.log('testing');
    this.props.unableSubmit();

    var departArray = JSON.parse('['+this.refs.departure.value+']');
    var destiArray = JSON.parse('['+this.refs.destination.value+']');
    var departureId = departArray[1];
    var destinationId = destiArray[1];
    console.log(departureId, destinationId);

    if(departureId === destinationId) {
      this.props.disableSubmit();
    }
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
      	<form className='search-form' onChange={this.testDisabling.bind(this)} onSubmit={this.handleSubmit.bind(this)}>

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
            <input className='submit-button' type='submit' value='Submit' disabled={this.props.submitState}/>
          </div>

      	</form>
    )
  }
}


export default SearchForm;