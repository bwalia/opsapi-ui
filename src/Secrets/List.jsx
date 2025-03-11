import React from 'react';
import { List as RaList, SimpleList } from 'react-admin';

const List = () => {
    return (
        <RaList>
            <SimpleList
                primaryText={record => record.role_name}
                secondaryText={`role`}
                tertiaryText={record => new Date(record.created_at).toLocaleDateString()}
                linkType={record => record.canEdit ? "edit" : "show"}
            />
        </RaList>
    )
}

export default List