import React from 'react';
import { SimpleForm, TextInput, ReferenceInput, required, AutocompleteInput } from 'react-admin';
import { Grid, Box } from '@mui/material';

const Form = () => {
  return (
    <SimpleForm>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="username" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput type='email' source="email" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="first_name" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="last_name" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="phone_no" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput type='password' source="password" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ReferenceInput source="roles" reference="roles">
              <AutocompleteInput optionText="role_name" />
            </ReferenceInput>
          </Grid>
        </Grid>
      </Box>
    </SimpleForm>
  )
}

export default Form