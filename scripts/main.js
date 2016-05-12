import React from 'react';
import ReactDOM from 'react-dom';
import idb from '../idbpromised.js';
import Moment from 'moment';


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
    /*
      This creates in our state two objects:

      * searchstate, which we will use to determine which component to load 
      in case of valid fetching of our data or if there is a network error

      * stationNames, in which we will store our data fetched and use it 
      throughout the app

      * submitState unables or disables our form's submit button in case the
      departure and destinations are the same

      * directionRoute will let us display the direction when the search result 
      appears

      * time will let us store the time at the moment of the search allowing us
      to calculate the departure and arrival time by using Moment.js and 
      the numberStations
    */
  	this.state = {
  		searchState: 'search', 
      stationNames: '',
      submitState: false,
      directionRoute: '',
      time: '',
      numberStations: ''
  	}
  }

  componentWillMount() {
    /*
      This registers our service worker
    */
    if(navigator.serviceWorker) {
      navigator.serviceWorker.register('./sw.js', {scope: '/'});
      navigator.serviceWorker.addEventListener('message', function(message) {
        console.log(message);
      })
    }
  }

  componentDidMount() {

    var self = this;
    /*
      This fetches data about our stations from the RATP API
    */
    fetch('http://api-ratp.pierre-grimaud.fr/v2/metros/1/stations')
    .then(r => r.json())
    .then(data => this.setState({stationNames: data.response.stations}))
    .then(function() {
      var stations = self.state.stationNames;
      self.dbPromise().then(function(db) {
        var tx = db.transaction('stationsStore', 'readwrite');
        var store = tx.objectStore('stationsStore');
        /*
          This makes sure the store is empty in order not to have doubles
        */
        store.clear();
        /*
          This stores the fetched data in our store
        */
        stations.forEach(function(station) {
          store.put(station);
        });
      });    
    })
    .catch(function() {
      /*
        This gets our station names from our IDB store in case of network error
      */
      self.dbPromise().then(function(db) {
        console.log('starting to get from db');
        var tx = db.transaction('stationsStore');
        var store = tx.objectStore('stationsStore');
        return store.getAll();
      }).then(function(stationsDB) {
        self.setState({stationNames: stationsDB});
      });
    });
  }

  componentDidUpdate() {
    if(this.state.stationNames[0].order){
      return null;
    } else {
      this.addOrderNumber();      
    }
  }

  dbPromise() {
    return idb.open('PTApp-db5', 1, function(upgradeDb) {
      switch(upgradeDb.oldVersion) {
        case 0:
          var stationsStore = upgradeDb.createObjectStore('stationsStore', {keyPath: 'number', autoIncrement: true});
        case 1:
          upgradeDb.createObjectStore('lastRouteSearched', {keyPath:'number', autoIncrement: true});
      }
      
    });
  }
  /*
    This is a test: you can use this function in order to communicate with 
    the service worker by sending messages

  sendMessage(message) {
    return new Promise(function(resolve, reject) {
      var messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = function(event) {
        if(event.data.error) {
          reject(event.data.error);
        } else {
          console.log(event);
          resolve(event.data);
        }
      }
      navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);    
    });
    
  }*/


/*
  This function helps putting the stations in the right order
  and determine in which direction the user is going on the subway line
*/
  addOrderNumber() {
    var stationOrder =[6, 18, 24, 10, 7, 25, 15, 11, 2, 9, 19, 8, 16, 
                        1, 4, 14, 21, 13, 3, 22, 5, 20, 23, 17, 12];

    var orderedStations = this.state.stationNames.slice();
    for(var i = 0; i < orderedStations.length; i++) {
      orderedStations[i]['order'] = stationOrder[i];
    }
    this.setState({stationNames: orderedStations});
  }


/*
  This function fetches the next subways from the RATP API
*/
  loadNextMetros(departureOrder, departureId, destinationOrder, destinationId) {
    var self = this;


    var result = departureOrder - destinationOrder;
    var numberStations = Math.abs(result);
    this.setState({numberStations: numberStations});


    var direction;
    if(result > 0) {
      direction ='la+defense';
      this.setState({directionRoute: 'La Defense'});
    } else if(result < 0) {
      direction = 'chateau+de+vincennes';
      this.setState({directionRoute: 'Chateau de Vincennes'});
    } 



    fetch('http://api-ratp.pierre-grimaud.fr/v2/metros/1/stations/' 
      + departureId +'?destination='+ direction +'')
    .then(r => r.json())
    .then(data => this.setState({nextMetros: data.response.schedules}))
    .then(this.setState({searchState: 'answer'}))
    /*
      in case of error, load the error component displaying the approximate
      time schedule
    */
    .catch(function(error) {
      console.log(error);
      self.setState({searchState: 'error'});
    });

  }
  unableSubmit() {
    this.setState({submitState: false});
  }

  disableSubmit() {
    this.setState({submitState: true});
  }

  createTimeStamp() {
    var timeNow = Moment();
    this.setState({time: timeNow});
  }

  render() {
  	return (
  	  <div>
  	  	<Header />
  	  	<SearchContainer 
        numberStations={this.state.numberStations}
        time={this.state.time}
        createTimeStamp={this.createTimeStamp.bind(this)}
        directionRoute={this.state.directionRoute}
        submitState = {this.state.submitState}
        unableSubmit={this.unableSubmit.bind(this)}
        disableSubmit={this.disableSubmit.bind(this)}
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