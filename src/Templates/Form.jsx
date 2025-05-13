import React from "react";
import {
  SimpleForm,
  TextInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  required,
} from "react-admin";
import { Grid, Box } from "@mui/material";

export const formatFunc = (tags) => tags.map((tag) => tag.id);

export const parseFunc = (tagIds) => tagIds.map((id) => ({ id }));

const Form = () => {
  return (
    <SimpleForm>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="code" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="template_type" />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <ReferenceArrayInput reference="projects" source="projects" label="Projects">
              <AutocompleteArrayInput
                optionText={"name"}
                format={formatFunc}
                parse={parseFunc}
                filterToQuery={(q) => ({ name: q })}
              />
            </ReferenceArrayInput>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextInput
              source="template_content"
              multiline
              rows={20}
              validate={[required()]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextInput source="description" multiline rows={4} />
          </Grid>
        </Grid>
      </Box>
    </SimpleForm>
  );
};

export default Form;
