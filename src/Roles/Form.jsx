import React from 'react';
import { SimpleForm, TextInput, DateInput, required } from 'react-admin';
import { Grid2, Box } from '@mui/material';

const Form = () => {
  return (
    <SimpleForm>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="username" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput type='email' source="email" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="first_name" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="last_name" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="phone_no" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput type='password' source="password" validate={[required()]} />
          </Grid2>
        </Grid2>
      </Box>
    </SimpleForm>
  )
}

export default Form