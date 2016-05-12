import React from 'react';
import SearchForm from '../components/searchform.js';
import SearchAnswer from '../components/searchanswer.js';
import SearchAnswerError from '../components/searchanswererror.js';

class SearchContainer extends React.Component {
  render() {
  	var renderedDiv;
  	var searchState = this.props.searchState;
  	switch (searchState){
  	  case 'search':
  	  	renderedDiv = <SearchForm 
                      createTimeStamp={this.props.createTimeStamp}
                      submitState = {this.props.submitState}
                      unableSubmit={this.props.unableSubmit}
                      disableSubmit={this.props.disableSubmit}
                      loadNextMetros={this.props.loadNextMetros}
                      stationNames={this.props.stationNames}
                      responseTest={this.props.responseTest}/>
  	  	break;
  	  case 'answer':
  	    renderedDiv = <SearchAnswer
                      numberStations={this.props.numberStations}
                      time={this.props.time}
                      directionRoute={this.props.directionRoute} 
                      nextMetros={this.props.nextMetros}/>
  	    break;
      case 'error':
        renderedDiv = <SearchAnswerError />
  	}


    return (
      <div className='search'>
        {renderedDiv}
      </div>
    )
  }
}


export default SearchContainer;