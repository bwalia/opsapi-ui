import React from 'react';
import {
  List as RaList,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  SearchInput,
  TextInput,
  BooleanInput,
  EditButton,
  ShowButton,
  DeleteButton,
  BulkDeleteButton,
  BulkExportButton,
  EmailField,
} from 'react-admin';
import { Chip } from '@mui/material';

const userFilters = [
  <SearchInput source="q" alwaysOn placeholder="Search users..." />,
  <BooleanInput source="active" label="Active" />,
  <TextInput source="email" />,
];

const BulkActionButtons = () => (
  <>
    <BulkExportButton />
    <BulkDeleteButton />
  </>
);

const List = () => {
  return (
    <RaList
      filters={userFilters}
      sort={{ field: 'updated_at', order: 'DESC' }}
      perPage={25}
      sx={{
        '& .RaList-content': {
          boxShadow: 'none',
          border: '1px solid rgba(224, 224, 224, 1)',
        },
      }}
    >
      <Datagrid
        bulkActionButtons={<BulkActionButtons />}
        sx={{
          '& .RaDatagrid-headerCell': {
            fontWeight: 700,
            backgroundColor: '#f5f5f5',
          },
          '& .RaDatagrid-row:hover': {
            backgroundColor: '#f9f9f9',
          },
        }}
      >
        <TextField source="first_name" label="First Name" />
        <TextField source="last_name" label="Last Name" />
        <TextField source="username" label="Username" />
        <EmailField source="email" label="Email" />
        <DateField source="updated_at" label="Last Updated" showTime />
        <BooleanField
          source="active"
          label="Status"
          valueLabelTrue="Active"
          valueLabelFalse="Inactive"
          TrueIcon={() => <Chip label="Active" color="success" size="small" />}
          FalseIcon={() => <Chip label="Inactive" color="default" size="small" />}
        />
        <ShowButton />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </RaList>
  );
};

export default List;