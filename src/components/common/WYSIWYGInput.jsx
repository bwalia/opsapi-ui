import React, { useRef } from "react";
import { useInput, useTheme } from "react-admin";
import { useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import JoditEditor from "jodit-react";

const WYSIWYGInput = ({ source, label, validate, ...rest }) => {
  const editor = useRef(null);
  const {
    field: { value, onChange },
    fieldState: { error },
    isRequired,
  } = useInput({ source, validate, ...rest });

  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === "dark";

  const config = {
    readonly: false,
    height: 300,
    theme: isDark ? "dark" : "default",
    toolbarSticky: false,
    toolbarAdaptive: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "link",
      "|",
      "source",
    ],
    style: {
      backgroundColor: isDark ? "#1e1e1e" : "#fff",
      color: isDark ? "#fff" : "#000",
      fontSize: "14px",
      fontFamily: muiTheme.typography.fontFamily,
    },
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: 8,
            fontWeight: 600,
            color: muiTheme.palette.text.primary,
          }}
        >
          {label} {isRequired && "*"}
        </label>
      )}
      <JoditEditor
        ref={editor}
        value={value || ""}
        config={config}
        onBlur={(newContent) => onChange(newContent)}
      />
      {error && (
        <span style={{ color: "red", fontSize: 12 }}>{error.message}</span>
      )}
    </div>
  );
};

export default WYSIWYGInput;
