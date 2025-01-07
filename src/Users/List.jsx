import React from 'react';
import { List as RaList, Datagrid, TextField, DateField, BooleanField } from 'react-admin';

const List = () => {
    return (
        <RaList>
            <Datagrid>
                <TextField source="first_name" />
                <TextField source="last_name" />
                <TextField source="username" />
                <TextField source="email" />
                <DateField source="updated_at" />
                <BooleanField source="active" />
            </Datagrid>
        </RaList>
    )
}

export default List