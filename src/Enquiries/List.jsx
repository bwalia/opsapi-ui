import React from "react";
import {
  List as RaList,
  Datagrid,
  TextField,
  DateField,
  SearchInput,
  TextInput,
  EmailField,
  ShowButton,
  DeleteButton,
  BulkDeleteButton,
  BulkExportButton,
} from "react-admin";

const enquiryFilters = [
  <SearchInput source="q" alwaysOn placeholder="Search enquiries..." />,
  <TextInput source="name" />,
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
      filters={enquiryFilters}
      sort={{ field: "created_at", order: "DESC" }}
      perPage={25}
      sx={{
        "& .RaList-content": {
          boxShadow: "none",
          border: "1px solid rgba(224, 224, 224, 1)",
        },
      }}
    >
      <Datagrid
        bulkActionButtons={<BulkActionButtons />}
        sx={{
          "& .RaDatagrid-headerCell": {
            fontWeight: 700,
            backgroundColor: "#f5f5f5",
          },
          "& .RaDatagrid-row:hover": {
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <TextField source="name" label="Name" />
        <EmailField source="email" label="Email" />
        <DateField source="created_at" label="Created" showTime />
        <ShowButton />
        <DeleteButton />
      </Datagrid>
    </RaList>
  );
};

export default List;
