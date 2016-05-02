import React from 'react';
import ReactDOM from 'react-dom';

/*
  Components imports
*/

import Header from '../components/header.js';
import SearchContainer from '../components/searchcontainer.js';

/*
  App component
  <App />
*/


class App extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		searchState: 'search'
  	}
  }
  render() {
  	return (
  	  <div>
  	  	<Header />
  	  	<SearchContainer searchState={this.state.searchState} />
  	  </div>
  	)
  }
}


var main= document.querySelector("#main");
ReactDOM.render(<App />, main);