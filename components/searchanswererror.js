import React from 'react';

var defaultSchedule = 'Le métro circule tous les jours de la semaine, y compris le dimanche et les jours fériés. Passages du Métro ligne 1 tous les... : en journée : 2 à 4 min, en soirée : 5 à 7 min, le samedi : 3 à 8 min et le dimanche : 3 à 8 min';


class SearchAnswerError extends React.Component {
  render() {
    return (
      	<div className='search-answer-error'>
          <div className='sorry-message'>Sorry, there seems to be an error with the network.
          You will find below the approximate waiting time.</div>
          <div className='approximate-schedule'>
            Le métro circule tous les jours de la semaine, 
            y compris le dimanche et les jours fériés. 
            Passages du Métro ligne 1 tous les... : 
            en journée : 2 à 4 min, en soirée : 5 à 7 min, 
            le samedi : 3 à 8 min et le dimanche : 3 à 8 min.
            (daytime: 2 to 4 min, evening: 5 to 7 min,
            saturday: 3 to 8 min, sunday: 3 to 8 min)
          </div>
        </div>
    )
  }
}


export default SearchAnswerError;