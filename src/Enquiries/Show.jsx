import React from "react";
import {
  Show as RaShow,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
} from "react-admin";

const Show = () => {
  return (
    <RaShow>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="email" />
        <RichTextField source="comments" />
        <DateField source="created_at" />
      </SimpleShowLayout>
    </RaShow>
  );
};

export default Show;
