import React from "react";
import {
  BooleanField,
  CloneButton,
  Datagrid,
  DateField,
  List as RaList,
  SimpleList,
  TextField,
} from "react-admin";

const List = () => {
  return (
    <RaList>
      <Datagrid>
        <TextField source="title" />
        <TextField source="slug" />
        <DateField source="published_date" />
        <TextField source="sub_title" />
        <BooleanField source="status" />
        <CloneButton />
      </Datagrid>
    </RaList>
  );
};

export default List;
