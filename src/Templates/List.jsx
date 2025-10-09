import React from 'react';
import {
  List as RaList,
  Datagrid,
  TextField,
  DateField,
  SearchInput,
  TextInput,
  EditButton,
  ShowButton,
  DeleteButton,
  BulkDeleteButton,
  BulkExportButton,
} from 'react-admin';

const templateFilters = [
  <SearchInput source="q" alwaysOn placeholder="Search templates..." />,
  <TextInput source="code" />,
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
      filters={templateFilters}
      sort={{ field: 'created_at', order: 'DESC' }}
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
        <TextField source="code" label="Code" />
        <TextField source="description" label="Description" />
        <DateField source="created_at" label="Created" showTime />
        <ShowButton />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </RaList>
  );
};

export default List;