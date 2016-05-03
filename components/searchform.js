import React from 'react';

class SearchForm extends React.Component {
  
  handleSubmit(e) {
    e.preventDefault();
    var departure = this.refs.departure.value;
    var destination = this.refs.destination.value;
    this.props.loadNextMetros(departure, destination);
  }

  render() {
    var stationList;
    if(this.props.stationNames) {
      stationList = this.props.stationNames.response.stations.map(function(station) {
        return <option key={station.id} value={station.id}>{station.name}</option>
      });      
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
                {stationList}
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