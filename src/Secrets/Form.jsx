import React from 'react';
import { SimpleForm, TextInput, DateInput, required } from 'react-admin';
import { Grid, Box } from '@mui/material';

const Form = () => {
  return (
    <SimpleForm>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextInput source="name" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextInput source="secret" multiline rows={5} validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextInput source="description" multiline rows={5} />
          </Grid>
        </Grid>
      </Box>
    </SimpleForm>
  )
}

export default Form