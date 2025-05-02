import React from 'react';
import { SimpleForm, TextInput, DateInput, required, BooleanInput, ReferenceInput, AutocompleteInput } from 'react-admin';
import { Grid2, Box } from '@mui/material';

const Form = () => {
  return (
    <SimpleForm>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="title" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="sub_title" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="slug" />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
          <ReferenceInput source="user_id" reference="users">
          <AutocompleteInput optionText="first_name" />
          </ReferenceInput>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="meta_title" />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="meta_description" multiline />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="meta_keywords" multiline />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="excerpt" multiline />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="content" multiline validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <BooleanInput source="status" />
          </Grid2>
        </Grid2>
      </Box>
    </SimpleForm>
  )
}

export default Form