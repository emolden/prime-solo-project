import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

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

  const columns = [
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];
  
  


  return (
    <div className="container">
      <p>Info Page</p>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        // rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
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
