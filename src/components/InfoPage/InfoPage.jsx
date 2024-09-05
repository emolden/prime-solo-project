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


// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {

  const dispatch = useDispatch()

  

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  // leagueData is populated from the database with the registered users/players
  // it is an array of objects that contains: id, name, 
  const leagueData = useSelector((store) => store.leagueData);
  const teamData = useSelector((store) => store.teamData);

  //sends a dispatch to GET_LEAGUE_DATA upon page load
  useEffect (() => {
    console.log('info page loaded')
      dispatch({ type: 'GET_LEAGUE_DATA'})
  },[dispatch], [leagueData]);

  const useFakeMutation = () => {
    console.log('in useFakeMutation function')
    return useCallback(
      (user) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (user.name?.trim() === '') {
              reject(new Error('Error while saving user: name cannot be empty.'));
            } else {
              resolve({ ...user, name: user.name?.toUpperCase() });
            }
          }, 200);
        }),
      [],
    );
  };
  const mutateRow = useFakeMutation();

  // const findTeamId = (teamDataArray, newRowObject) => {
  //   for (let i=0; i< teamDataArray.length; i++) {
  //     console.log(teamDataArray[i].name, newRowObject.team)
  //     if(teamDataArray[i].name === newRowObject.team) {
  //       return teamDataArray[i].id;
  //     }
  //   }
  // }

  const processRowUpdate = useCallback(
    
    async (newRow) => {
      console.log( 'in processRowUPdate function and newRow and teamData reducer are: ', newRow);
      // let teamId = findTeamId(teamData, newRow)

      

      // let updatePlayersTeam = {
      //   user_id : newRow.user_id,
      //   team_id : teamId
      // }

      // console.log('in processRowUpdate and updatePlayersTeam is: ')
      //sends the updated row as a payload as a dispatch
      dispatch({ type: 'CHANGE_PLAYER_TEAM', payload: newRow});
      const response = await mutateRow(newRow);
      
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      return response;
    },
    [mutateRow],
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    console.log('in handleProcessRowUpdateError function and error is: ', error);
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  //will need to upate this function to only show team options within the league selected
  const teamDropdownOptions = (teamArray) => {
    let dropdown = ['DELETE'];

    let teamOptions = teamArray.map((team) => { return (team.name)})

    return dropdown.concat(teamOptions);
  }
  

  const columns = [
    // field references a key in a row object
    // headerName is what is desplaye don the dom
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
      <p>Info Page</p>
      <ul>
        
      </ul>
      <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        slots={{ toolbar: GridToolbar }} 
        editMode="row"
        rows={leagueData}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      {!!snackbar && (
        <Snackbar
          open
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

export default InfoPage;
