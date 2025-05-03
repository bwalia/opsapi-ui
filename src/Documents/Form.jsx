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
} from "react-admin";
import { Grid2, Box } from "@mui/material";
import CreateTags from "../components/CreateTags";
// import { RichTextInput } from "ra-input-rich-text";

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
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="title" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="sub_title" validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextInput source="slug" />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <ReferenceArrayInput source="tags" reference="tags">
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
                  return newTag.data;
                }}
              />
            </ReferenceArrayInput>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="meta_title" />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            {/* <TextInput source="meta_description" multiline /> */}
            {/* <RichTextInput source="meta_description" /> */}
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="meta_keywords" multiline />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="excerpt" multiline />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <TextInput source="content" multiline validate={[required()]} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12 }}>
            <BooleanInput source="status" />
          </Grid2>
        </Grid2>
      </Box>
    </SimpleForm>
  );
};

export default Form;
