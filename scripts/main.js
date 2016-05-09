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
  		searchState: 'search', 
      stationNames: '',
  	}
  }

  componentWillMount() {
    if(navigator.serviceWorker) {
      navigator.serviceWorker.register('./sw.js', {scope: '/'}).then(function(reg) {
        if(!navigator.serviceWorker.controller) {
          return
        }
        if(reg.waiting) {
          console.log('waiting');
          /*updateready*/
          return;
        }
        if(reg.installing) {
          console.log('installing')
          /*trackinstalling*/
          return;
        }
      });

      navigator.serviceWorker.addEventListener('controllerchange', function() {
        window.location.reload();
      });
    }
  }

  componentDidMount() {
    fetch('http://api-ratp.pierre-grimaud.fr/v2/metros/1/stations')
    .then(r => r.json())
    .then(data => this.setState({stationNames: data.response.stations}));
  }

  componentDidUpdate() {
    if(this.state.stationNames[0].order){
      return null;
    } else {
      this.addOrderNumber();      
    }
  }

  showUpdateReady() {
    /* add refresh/dismiss button to app + onclick event*/
    /* 
      if(answer != 'refresh') return;
      worker.postMessage({action: 'skipWaiting'});
     */
  }

  updateVersion() {

  }

  addOrderNumber() {
    var stationOrder =[6, 18, 24, 10, 7, 25, 15, 11, 2, 9, 19, 8, 16, 
                        1, 4, 14, 21, 13, 3, 22, 5, 20, 23, 17, 12];

    var orderedStations = this.state.stationNames.slice();
    for(var i = 0; i < orderedStations.length; i++) {
      orderedStations[i]['order'] = stationOrder[i];
    }
    this.setState({stationNames: orderedStations});
  }

  loadNextMetros(departureOrder, departureId, destination) {
    var result = departureOrder - destination;
    var direction;
    if(result < 0) {
      direction ='la+defense';
    } else if(result > 0) {
      direction = 'chateau+de+vincennes';
    } else if(result = 0) {

    }
    fetch('http://api-ratp.pierre-grimaud.fr/v2/metros/1/stations/' 
      + departureId +'?destination='+ direction +'')
    .then(r => r.json())
    .then(data => this.setState({nextMetros: data.response.schedules}))
    .then(this.setState({searchState: 'answer'}));

  }

  render() {
  	return (
  	  <div>
  	  	<Header />
  	  	<SearchContainer 
        nextMetros={this.state.nextMetros}
        loadNextMetros={this.loadNextMetros.bind(this)}
        stationNames={this.state.stationNames}
        responseTest={this.state.responseTest} 
        searchState={this.state.searchState} />
  	  </div>
  	)
  }
}


var main= document.querySelector("#main");
ReactDOM.render(<App />, main);