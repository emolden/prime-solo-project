import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import convertISOtoDisplayable from '../../Helpers/dateFormatter';
import './UserPage.css';
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
  const [birthdate, setBirthdate] = useState(convertISOtoDisplayable(user.birthdate))

  //use UseEffect to fetch users current teams 
  useEffect (() => {
    //dispatch to user saga
    dispatch({
      type: 'FETCH_CURRENT_TEAMS',
        payload: user.id
    })
  }, []);

  // enters into editable form mode
  const enterEditForm = () => {
    setEditForm(!editForm);
  }

  // leaves editable form mode
  // saves the data in the database
  const leaveEditForm = () => {
    setEditForm(!editForm)
    //dispatch to the user saga
    dispatch({
      type: 'UPDATE_PLAYER_INFORMATION',
      payload: {
                user_id: user.id,
                username: username,
                name: name,
                email: email,
                phone_number: phone,
                birthdate: birthdate
      }
    })
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <div className="user-sections">
      <div >

        <div>
          {/*********** user profile *****************/}
          {!editForm &&
            <div className="user-profile">
              <h3>User Profile</h3>
              <p>Name: {user.name}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phone_number}</p>
              <p>Birthdate: {convertISOtoDisplayable(user.birthdate)}</p>
              <button className="btn" onClick={enterEditForm}>Edit Profile Info</button>
            </div>
          }
        </div>

        <div>
          {/*********** This is the editable version of the user profile *************/}
          {editForm &&
            <div className='edit-user-profile'>
              <h3>User Profile</h3>
              <span className="edit-inputs">
                <p>Name:</p> 
                <input
                  value = {name}
                  onChange={(e) => setName(e.target.value)} 
                />
              </span>
              <span className="edit-inputs">
                <p>Username:</p> 
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </span>
              <span className="edit-inputs">
                <p>Email:</p>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              <span className="edit-inputs">
                <p>Phone Number:</p>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </span>
              <span className="edit-inputs">
                <p>Birthdate:</p>
                <input
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </span>
              <button className="btn" onClick={leaveEditForm}>Save Profile Info</button>
            </div>
          }
        </div>
      </div>
      {/*****Lists the current teams and players associated with the user *********************/}
      <div className="current-teams">
        <h3>Your Current Teams</h3>
          {currentTeams.map((team) => {
            return(
              <div>
                <h4>{team.teamName}</h4>
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
          </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
