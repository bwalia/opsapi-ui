import React from "react";
import {
  BooleanField,
  CloneButton,
  Datagrid,
  DateField,
  List as RaList,
  TextField,
  SearchInput,
  TextInput,
  BooleanInput,
  EditButton,
  ShowButton,
  DeleteButton,
  BulkDeleteButton,
  BulkExportButton,
  ChipField,
  ReferenceArrayField,
  SingleFieldList,
} from "react-admin";
import { Chip } from "@mui/material";

const documentFilters = [
  <SearchInput source="q" alwaysOn placeholder="Search by title or slug" />,
  <BooleanInput source="status" label="Published" />,
  <TextInput source="slug" />,
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
      filters={documentFilters}
      sort={{ field: "published_date", order: "DESC" }}
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
        <TextField source="title" label="Title" />
        <TextField source="slug" label="Slug" />
        <TextField source="sub_title" label="Subtitle" />
        <DateField source="published_date" label="Published Date" showTime />
        <BooleanField
          source="status"
          label="Status"
          valueLabelTrue="Published"
          valueLabelFalse="Draft"
          TrueIcon={() => <Chip label="Published" color="success" size="small" />}
          FalseIcon={() => <Chip label="Draft" color="default" size="small" />}
        />
        <ReferenceArrayField source="tags" reference="tags" label="Tags">
          <SingleFieldList>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ReferenceArrayField>
        <ShowButton />
        <EditButton />
        <CloneButton />
        <DeleteButton />
      </Datagrid>
    </RaList>
  );
};

export default List;
