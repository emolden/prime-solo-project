import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { 
  DataGrid, 
  GridToolbar,
  GridCellEditStopReasons,
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

//??????????????????? let admin be able to create/edit/delete teams ????????????????????
//??????????????????? let admin be able to create/edit/delete leagues ??????????????????
//??????????????????? let admin be able to see data from previous years ????????????????
//??????????????????? let admin be able to see the data as charts ??????????????????????
//???????????????????? delete snackbar ?????????????????????????????????????????????????

function AdminPage() {

  const dispatch = useDispatch()

  const [snackbar, setSnackbar] = useState(null);

  // the snackbar is closed by resetting the snackbar value
  const handleCloseSnackbar = () => setSnackbar(null);

  // leagueData is an array of objects containing the registered users/players
  // an example object is:
  //{
  //  id: 1,
  //  league_id: 2,
  //  team_id: 3,
  //  user_team_id: 1,
  //  user_id: 1,
  //  name: Alice Walker,
  //  email: alice.walker@example.com,
  //  phone_number: 123-456-7890,
  //  birthdate: 1990-06-15,
  //  captain: false,
  //  small_group_input: anna and becca,
  //  registration_type: Small Group,
  //  team_name_input: Queen Bees,
  //  hitting: 2,
  //  fielding: 1,
  //  league: Bronze,
  //  team: null,
  //  positions: infield
  //}
  const leagueData = useSelector((store) => store.leagueData);
  // teamData is an array of objects containing all the teams 
  // an example object is: {id: 1, name: Storm Hawks, league_id: 1}
  const teamData = useSelector((store) => store.teamData);

  //on page load
  useEffect (() => {
    console.log('info page loaded')
    //sends a dispatch to admin saga
    dispatch({ type: 'GET_LEAGUE_DATA'})
  },[]);

  //function is called when a row is updated
  const useFakeMutation = () => {
    // console.log('in useFakeMutation function')
    return useCallback(
      (user) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            // console.log('in useFakeMutation function and user is: ', user);
            // if the updated row name is left blank
            // reject the edit and display an error in the snackbar
            if (user.name?.trim() === '') {
              reject(new Error('Error while saving user: name cannot be empty.'));
            } 
            // if the row name is not blank
            // accept the edits
            else {
              //dispatch to admin saga -> request updated league data after row is updated
              dispatch({ type: 'GET_LEAGUE_DATA'}) // 👈 HACKY (?) FIX for weird race condition around DELETE thing...
              resolve({ ...user, name: user.name?.toUpperCase() });
            }
          }, 200);
        }),
      [],
    );
  };
  const mutateRow = useFakeMutation();

  //function is called when a row is updated
  const processRowUpdate = async (newRow) => {
      // console.log( 'in processRowUPdate function and newRow and teamData reducer are: ', newRow);
    
      //dispatches the updated row as a payload to admin saga
      dispatch({ type: 'CHANGE_PLAYER_TEAM', payload: newRow});

      const response = await mutateRow(newRow);
      
      // if the new row edits are accepted set successful snackbar message
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      return response;
    }
  
  // is called when there is an error updating the row
  const handleProcessRowUpdateError = useCallback((error) => {
    console.log('in handleProcessRowUpdateError function and error is: ', error);
    // if there was an error updating the row set the error snackbar message
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  //will need to upate this function to only show team options within the league selected
  const teamDropdownOptions = (teamArray) => {
    let dropdown = ['DELETE'];

    // captures the team names as strings in an array
    let teamOptions = teamArray.map((team) => { return (team.name)})

    //returns an array of team name strings with a 'DELETE' string
    return dropdown.concat(teamOptions);
  }
  

  const columns = [
    // field references a key in a row object
    // headerName is what is desplayed on the dom
    // width is the set width but it can be adjusted by the user
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'phone_number',
      headerName: 'Phone number',
      width: 110,
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      width: 110,
    },
    {
      field: 'fielding',
      headerName: 'Fielding',
      width: 110,
      type: 'number',
    },
    {
      field: 'hitting',
      headerName: 'Hitting',
      width: 110,
    },
    {
      field: 'league',
      headerName: 'League',
      width: 110,
    },
    {
      field: 'registration_type',
      headerName: 'registionType',
      width: 110,
    },
    {
      field: 'small_group_input',
      headerName: 'Group input',
      width: 110,
    },
    {
      field: 'team_name_input',
      headerName: 'Team input',
      width: 110,
    },
    {
      field: 'team',
      headerName: 'Team',
      width: 110,
      editable: true,
      type: 'singleSelect',
      valueOptions: teamDropdownOptions(teamData)
    },
    {
      field: 'positions',
      headerName: 'Position',
      width: 110,
    },
    {
      field: 'pitcher',
      headerName: 'Pitcher',
      type: 'boolean',
      width: 160,
    },
    {
      field: 'captain',
      headerName: 'Captain',
      type: 'boolean',
      width: 160,
      editable: true,
    },
  ];
  
  


  return (
    <div className="container">
      <h2>League Data</h2>
      <ul>
        
      </ul>
      {/* Box is the entire data table */}
      <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        // GriedToolbar is a type of toolbar that displays 
        slots={{ toolbar: GridToolbar }} 
        // when a user double clicks on a cell, all the cells in the row that
        // are editable can be changed
        editMode="row"
        // all the object values with keys from leagueData that match column field keys 
        // are displayed in the grid
        rows={leagueData}
        // column headers come from the columns variable
        columns={columns}
        // is called when the user hits enter or clicks somewhere else after editing a row
        processRowUpdate={processRowUpdate}
        // is called when there is an error updating the row
        onProcessRowUpdateError={handleProcessRowUpdateError}
        initialState={{
          pagination: {
            paginationModel: {
              // 15 rows are shown at a time
              pageSize: 15,
            },
          },
        }}
        // the user can choose to show 5, 10, or 15 rows at a time
        pageSizeOptions={[5, 10, 15]}
        // row editing stops when the user clicks off the row
        disableRowSelectionOnClick
      />
      {/* when a row us updated the snackbar is displayed */}
      {!!snackbar && (
        <Snackbar
          open
          //position of the snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
    </div>
  );
}

export default AdminPage;
