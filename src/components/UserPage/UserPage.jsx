import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
// ???????????????????Upload Profile Picture???????????????????????????????
function UserPage() {
  const dispatch = useDispatch();


  const user = useSelector((store) => store.user);
  //call the current teams reducer
  // [ {
  //      teamName: 'Storm Hawks', 
  //      players: [
  //                {id: 7, name: 'Charlotte Smitth', team_name: 'Storm Hawks'}
  //                ]
  //  }]
  const currentTeams = useSelector((store) => store.currentTeams);

  //use UseEffect to fetch users current teams
  useEffect (() => {
    dispatch({
      type: 'FETCH_CURRENT_TEAMS',
        payload: user.id
    })
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <section>
        <div>
          <img></img>
        </div>
        <div>
          <h3>User Profile</h3>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phone_number}</p>
          <p>Birthdate: {user.birthdate}</p>
          {/* need to give the user the ability to edit when button is clicked */}
          <button>Edit Profile Info</button>
        </div>
      </section>
      <section>
        <h3>Your Current Teams</h3>
          {/* Will need to map through teams here */}
          {currentTeams.map((team) => {
            return(
              <div>
                <h4>{team.teamName}</h4>
                {/* will need to map thorugh player names here */}
                <ol>
                  {team.players.map((player) => {
                    return (
                        <li>{player.name}</li>
                    )
                  })}
                </ol>
              </div>
              )
          })}
      </section>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
