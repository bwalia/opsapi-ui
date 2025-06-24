import React from "react";
import { List as RaList, SimpleList } from "react-admin";

const List = () => {
  return (
    <RaList>
      <SimpleList
        primaryText={(record) => record.name}
        secondaryText={(record) => record.email}
        tertiaryText={(record) =>
          new Date(record.created_at).toLocaleDateString()
        }
        rowClick="show"
      />
    </RaList>
  );
};

export default List;
