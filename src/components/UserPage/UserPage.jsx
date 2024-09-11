import React, { useState } from 'react';
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

  const [editForm, setEditForm] = useState(false);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone_number)
  const [birthdate, setBirthdate] = useState(user.birthdate)

  //use UseEffect to fetch users current teams
  useEffect (() => {
    dispatch({
      type: 'FETCH_CURRENT_TEAMS',
        payload: user.id
    })
  }, []);

  const enterEditForm = () => {
    setEditForm(!editForm);
  }

  const leaveEditForm = () => {
    setEditForm(!editForm)
    // console.log({name, username, email, phone, birthdate})
    dispatch({
      type: 'UPDATE_USER_INFO',
      payload: {
        name, username, email, phone, birthdate
      }
    })
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <section>
        <div>
          <img></img>
        </div>
        {!editForm &&
        <div>
          <h3>User Profile</h3>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phone_number}</p>
          <p>Birthdate: {user.birthdate}</p>
          {/* need to give the user the ability to edit when button is clicked */}
          <button onClick={enterEditForm}>Edit Profile Info</button>
        </div>
        }
        {editForm &&
        <div>
        <h3>User Profile</h3>
        <p>Name:</p> 
        <input
          value = {name}
          onChange={(e) => setName(e.target.value)} 
        />
        <p>Username:</p> 
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Email:</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Phone Number:</p>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <p>Birthdate:</p>
        <input
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        {/* need to give the user the ability to edit when button is clicked */}
        <button onClick={leaveEditForm}>Save Profile Info</button>
      </div>
        }
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
