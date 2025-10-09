import React from 'react';
import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  required,
  AutocompleteInput,
  BooleanInput,
  email,
  minLength,
  PasswordInput,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@mui/material';

const validateEmail = [required(), email()];
const validatePassword = [required(), minLength(8, 'Password must be at least 8 characters')];

const Form = () => {
  return (
    <SimpleForm sx={{ maxWidth: 900, margin: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Personal Information
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <TextInput source="first_name" validate={[required()]} fullWidth />
              <TextInput source="last_name" validate={[required()]} fullWidth />
              <TextInput source="username" validate={[required()]} fullWidth />
              <TextInput source="phone_no" validate={[required()]} fullWidth label="Phone Number" />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Account Details
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <TextInput type="email" source="email" validate={validateEmail} fullWidth />
              <PasswordInput source="password" validate={validatePassword} fullWidth />
              <ReferenceInput source="roles" reference="roles" fullWidth>
                <AutocompleteInput optionText="role_name" fullWidth />
              </ReferenceInput>
              <BooleanInput source="active" label="Active" defaultValue={true} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </SimpleForm>
  );
};

export default Form;
