import React from "react";
import {
  SimpleForm,
  TextInput,
  DateInput,
  required,
  BooleanInput,
  ReferenceInput,
  useCreate,
  SelectArrayInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  FileInput,
  FileField,
} from "react-admin";
import { Grid, Box } from "@mui/material";
// import { height, width } from "@mui/system";
import { RichTextInput } from "ra-input-rich-text";

const Form = () => {
  const secretTags = localStorage.getItem("secrets.tags") || "";
  const [create] = useCreate();
  const [choices, setChoices] = React.useState([]);
  React.useEffect(() => {
    if (secretTags && secretTags != "undefined") {
      const tags = JSON.parse(secretTags);
      const prevTags = tags.map((tag) => {
        return { id: tag, name: tag };
      });
      setChoices(prevTags);
    }
  }, [secretTags]);
  return (
    <SimpleForm>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="title" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="sub_title" validate={[required()]} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInput source="slug" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReferenceArrayInput source="tags" reference="tags" fullWidth>
              <AutocompleteArrayInput
                optionText="name"
                fullWidth
                create={(filter) => {
                  const name = filter;
                  return {
                    label: `Create "${name}"`,
                    value: name,
                  };
                }}
                onCreate={async (inputValue) => {
                  const newTag = await create("tags", {
                    data: { name: inputValue },
                  });
                  return newTag;
                }}
              />
            </ReferenceArrayInput>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <FileInput source="cover_image">
              <FileField source="src" title="Cover Image" />
            </FileInput>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextInput source="meta_title" />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <RichTextInput source="meta_description" />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextInput source="meta_keywords" multiline />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <RichTextInput source="excerpt" />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <RichTextInput
              source="content"
              sx={{
                "& .RaRichTextInput-editorContent > .ProseMirror": {
                  height: "50vh",
                },
              }}
              validate={[required()]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <BooleanInput source="status" />
          </Grid>
        </Grid>
      </Box>
    </SimpleForm>
  );
};

export default Form;
