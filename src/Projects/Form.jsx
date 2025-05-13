import React from 'react';
import { SimpleForm, TextInput, DateInput, required, NumberInput, BooleanInput } from 'react-admin';
import { Grid, Box } from '@mui/material';

const Form = () => {
  return (
    <SimpleForm>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="name" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DateInput source="start_date" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DateInput source="deadline_date" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <NumberInput source="budget" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <BooleanInput source="active" validate={[required()]} />
          </Grid>
        </Grid>
      </Box>
    </SimpleForm>
  )
}

export default Form