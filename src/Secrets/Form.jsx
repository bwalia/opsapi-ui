import React from 'react';
import { SimpleForm, TextInput, DateInput, required } from 'react-admin';
import { Grid2, Box } from '@mui/material';

const Form = () => {
  return (
    <SimpleForm>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="name" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="secret" multiline rows={5} validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="description" multiline rows={5} />
          </Grid2>
        </Grid2>
      </Box>
    </SimpleForm>
  )
}

export default Form