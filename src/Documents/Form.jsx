import React from "react";
import {
  SimpleForm,
  TextInput,
  DateInput,
  required,
  BooleanInput,
  useCreate,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ImageInput,
  ImageField,
} from "react-admin";
import { Box, Card, CardContent, Typography } from "@mui/material";
import WYSIWYGInput from "../components/common/WYSIWYGInput";

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
    <SimpleForm sx={{ maxWidth: 1200, margin: "auto" }}>
      <Box sx={{ width: "100%" }}>
        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Basic Information
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <TextInput source="title" validate={[required()]} fullWidth />
              <TextInput source="sub_title" validate={[required()]} fullWidth />
              <TextInput source="slug" fullWidth helperText="Leave blank to auto-generate from title" />
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
              <DateInput source="published_date" fullWidth />
              <BooleanInput source="status" label="Published" />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Cover Image
            </Typography>
            <ImageInput source="cover_image" accept="image/*">
              <ImageField source="src" title="Cover Image" />
            </ImageInput>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              SEO Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextInput source="meta_title" fullWidth helperText="Recommended: 50-60 characters" />
              <TextInput
                source="meta_description"
                multiline
                rows={3}
                fullWidth
                helperText="Recommended: 150-160 characters"
              />
              <TextInput
                source="meta_keywords"
                multiline
                rows={2}
                fullWidth
                helperText="Comma-separated keywords"
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Content
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextInput
                source="excerpt"
                multiline
                rows={4}
                fullWidth
                label="Excerpt"
                helperText="Brief summary of the document"
              />
              <WYSIWYGInput
                source="content"
                label="Content"
                validate={required("Content is required")}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </SimpleForm>
  );
};

export default Form;
