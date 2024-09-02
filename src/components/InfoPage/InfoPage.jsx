import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {

  const dispatch = useDispatch()

  const leagueData = useSelector((store) => store.leagueData);

  //sends a dispatch to GET_LEAGUE_DATA upon page load
  useEffect (() => {
    console.log('info page loaded')
      dispatch({ type: 'GET_LEAGUE_DATA'})
  },);


  return (
    <div className="container">
      <p>Info Page</p>
      <ul>
        {leagueData.map((person) => {
          return (
            <li>{person.name}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default InfoPage;
