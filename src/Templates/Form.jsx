import React from "react";
import {
  SimpleForm,
  TextInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  required,
} from "react-admin";
import { Grid2, Box } from "@mui/material";

export const formatFunc = (tags) => tags.map((tag) => tag.id);

export const parseFunc = (tagIds) => tagIds.map((id) => ({ id }));

const Form = () => {
  return (
    <SimpleForm>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="code" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="template_type" />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <ReferenceArrayInput reference="projects" source="projects" label="Projects">
              <AutocompleteArrayInput
                optionText={"name"}
                format={formatFunc}
                parse={parseFunc}
                filterToQuery={(q) => ({ name: q })}
              />
            </ReferenceArrayInput>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput
              source="template_content"
              multiline
              rows={20}
              validate={[required()]}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="description" multiline rows={4} />
          </Grid2>
        </Grid2>
      </Box>
    </SimpleForm>
  );
};

export default Form;
