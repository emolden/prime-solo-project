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

  //sends a dispatch to GET_LEAGUE_DATA upon page load
  useEffect (() => {
    console.log('info page loaded')
      dispatch({ type: 'GET_LEAGUE_DATA'})
  },[dispatch]);

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

  const processRowUpdate = useCallback(
    
    async (newRow) => {
      console.log( 'in processRowUPdate function and newRow is: ', newRow);
      dispatch({ type: 'UPDATE_PLAYER_DATA', paylaod: newRow});
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      return response;
    },
    [mutateRow],
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log('in handleProcessRowUpdateError function and error is: ', error);
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);


  

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
      editable: true,
    },
    {
      field: 'hitting',
      headerName: 'Hitting',
      width: 110,
      editable: true,
    },
    {
      field: 'league',
      headerName: 'League',
      width: 110,
      editable: true,
    },
    {
      field: 'registration_type',
      headerName: 'registionType',
      width: 110,
      editable: true,
    },
    {
      field: 'small_group_input',
      headerName: 'Group input',
      width: 110,
      editable: true,
    },
    {
      field: 'team_name_input',
      headerName: 'Team input',
      width: 110,
      editable: true,
    },
    {
      field: 'team',
      headerName: 'Team',
      width: 110,
      editable: true,
    },
    {
      field: 'positions',
      headerName: 'Position',
      width: 110,
      editable: true,
    },
    {
      field: 'pitcher',
      headerName: 'Pitcher',
      type: 'boolean',
      width: 160,
      editable: true,
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
