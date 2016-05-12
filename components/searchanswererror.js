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

          </div>
          
          <div className='approximate-schedule'>
            (Daytime: 2 to 4 min, Evening: 5 to 7 min,
            Saturday: 3 to 8 min, Sunday: 3 to 8 min)
          </div>
        </div>
    )
  }
}


export default SearchAnswerError;