import React from 'react';

class SearchForm extends React.Component {
  render() {
    return (
      	<form className='search-form' action="">

      	  <label htmlFor='departure'>
            <div className='departure'>
              <div>Departure:</div>
              <select name='departure' id='departure'></select>
              </div>
      	  </label>

      	  <label htmlFor='destination'>
      	  	<div>Destination:</div>
      	  	<select name='destination' id='destination'></select>
      	  </label>
      	  <input type='submit' value='Submit'/>
      	</form>
    )
  }
}


export default SearchForm;