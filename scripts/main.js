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
      responseTest: {
        "stations": [
          {
            "id": "91",
            "name": "Argentine",
            "slug": "argentine"
          },
          {
            "id": "92",
            "name": "Bastille",
            "slug": "bastille"
          },
          {
            "id": "86",
            "name": "Berault",
            "slug": "berault"
          },
          {
            "id": "87",
            "name": "Champs-Élysées - Clemenceau",
            "slug": "champs+elysees+clemenceau"
          },
          {
            "id": "88",
            "name": "Charles de Gaulle - Étoile",
            "slug": "charles+de+gaulle+etoile"
          },
          {
            "id": "89",
            "name": "Chateau De Vincennes",
            "slug": "chateau+de+vincennes"
          },
          {
            "id": "90",
            "name": "Châtelet",
            "slug": "chatelet"
          },
          {
            "id": "83",
            "name": "Concorde",
            "slug": "concorde"
          },
          {
            "id": "84",
            "name": "Esplanade de la Défense",
            "slug": "esplanade+de+la+defense"
          },
          {
            "id": "85",
            "name": "Franklin D. Roosevelt",
            "slug": "franklin+roosevelt"
          },
          {
            "id": "79",
            "name": "Gare de Lyon",
            "slug": "gare+de+lyon"
          },
          {
            "id": "80",
            "name": "George V",
            "slug": "george+v"
          },
          {
            "id": "82",
            "name": "Hôtel de Ville",
            "slug": "hotel+de+ville"
          },
          {
            "id": "81",
            "name": "La Défense",
            "slug": "la+defense"
          },
          {
            "id": "77",
            "name": "Les Sablons",
            "slug": "les+sablons"
          },
          {
            "id": "78",
            "name": "Louvre - Rivoli",
            "slug": "louvre+rivoli"
          },
          {
            "id": "75",
            "name": "Nation",
            "slug": "nation"
          },
          {
            "id": "76",
            "name": "Palais Royal - Musée du Louvre",
            "slug": "palais+royal+musee+du+louvre"
          },
          {
            "id": "72",
            "name": "Pont de Neuilly",
            "slug": "pont+de+neuilly"
          },
          {
            "id": "74",
            "name": "Porte de Vincennes",
            "slug": "porte+de+vincennes"
          },
          {
            "id": "73",
            "name": "Porte Maillot",
            "slug": "porte+maillot"
          },
          {
            "id": "69",
            "name": "Reuilly - Diderot",
            "slug": "reuilly+diderot"
          },
          {
            "id": "70",
            "name": "Saint Mandé",
            "slug": "saint+mande"
          },
          {
            "id": "71",
            "name": "Saint Paul",
            "slug": "saint+paul"
          },
          {
            "id": "68",
            "name": "Tuileries",
            "slug": "tuileries"
          }
        ]
      },
      stationNames: ''
  	}
  }
  componentWillMount() {
    fetch('http://api-ratp.pierre-grimaud.fr/v2/metros/1/stations')
    .then(r => r.json())
    .then(data => this.setState({stationNames: data}));
  }

  loadNextMetros(departure, destination) {
    console.log(departure);
    fetch('http://api-ratp.pierre-grimaud.fr/v2/metros/1/stations/{StationId}?destination={DestinationId}')
  }

  render() {
  	return (
  	  <div>
  	  	<Header />
  	  	<SearchContainer 
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