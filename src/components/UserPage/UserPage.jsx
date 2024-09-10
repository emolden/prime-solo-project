import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
// ???????????????????Upload Profile Picture???????????????????????????????
function UserPage() {
  // dispatch


  const user = useSelector((store) => store.user);
  //call the current teams reducer

  //use UseEffect to fetch users current teams
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
        <div>
          {/* Will need to map through teams here */}
          <div>
            <h4>Pocket Square</h4>
            {/* will need to map thorugh player names here */}
            <ol>
              <li>Player 1</li>
              <li>Player 1</li>
              <li>Player 1</li>
              <li>Player 1</li>
              <li>Player 1</li>
            </ol>
          </div>
        </div>
      </section>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
