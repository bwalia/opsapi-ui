import React from 'react';
import { SimpleForm, TextInput, DateInput, required, NumberInput, BooleanInput } from 'react-admin';
import { Grid2, Box } from '@mui/material';

const Form = () => {
  return (
    <SimpleForm>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="name" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <DateInput source="start_date" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <DateInput source="deadline_date" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <NumberInput source="budget" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <BooleanInput source="active" validate={[required()]} />
          </Grid2>
        </Grid2>
      </Box>
    </SimpleForm>
  )
}

export default Form