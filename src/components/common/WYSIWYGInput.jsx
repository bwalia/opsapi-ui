import React, { useRef, useMemo } from "react";
import { useInput, useTheme } from "react-admin";
import { useMediaQuery, useTheme as useMuiTheme, Box, Typography } from "@mui/material";
import JoditEditor from "jodit-react";

const WYSIWYGInput = ({ source, label, validate, height = 500, ...rest }) => {
  const editor = useRef(null);
  const {
    field: { value, onChange },
    fieldState: { error },
    isRequired,
  } = useInput({ source, validate, ...rest });

  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === "dark";

  const config = useMemo(
    () => ({
      readonly: false,
      height: height,
      theme: isDark ? "dark" : "default",
      toolbarSticky: true,
      toolbarAdaptive: true,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "superscript",
        "subscript",
        "|",
        "ul",
        "ol",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "|",
        "symbol",
        "fullsize",
        "print",
      ],
      buttonsMD: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "|",
        "image",
        "link",
        "|",
        "align",
        "|",
        "undo",
        "redo",
        "|",
        "source",
      ],
      buttonsSM: [
        "bold",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "image",
        "link",
        "|",
        "source",
      ],
      buttonsXS: [
        "bold",
        "italic",
        "|",
        "image",
        "link",
        "|",
        "source",
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
      removeButtons: ["file"],
      disablePlugins: "mobile",
      style: {
        backgroundColor: isDark ? "#1e1e1e" : "#fff",
        color: isDark ? "#fff" : "#000",
        fontSize: "14px",
        fontFamily: muiTheme.typography.fontFamily,
      },
      enter: "P",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      processPasteHTML: true,
      beautyHTML: true,
      toolbarButtonSize: "middle",
      colors: {
        greyscale: ["#000000", "#434343", "#666666", "#999999", "#B7B7B7", "#CCCCCC", "#D9D9D9", "#EFEFEF", "#F3F3F3", "#FFFFFF"],
        palette: ["#980000", "#FF0000", "#FF9900", "#FFFF00", "#00F0F0", "#00FFFF", "#4A86E8", "#0000FF", "#9900FF", "#FF00FF"],
        full: [
          "#E6B8AF", "#F4CCCC", "#FCE5CD", "#FFF2CC", "#D9EAD3", "#D0E0E3", "#C9DAF8", "#CFE2F3", "#D9D2E9", "#EAD1DC",
          "#DD7E6B", "#EA9999", "#F9CB9C", "#FFE599", "#B6D7A8", "#A2C4C9", "#A4C2F4", "#9FC5E8", "#B4A7D6", "#D5A6BD",
          "#CC4125", "#E06666", "#F6B26B", "#FFD966", "#93C47D", "#76A5AF", "#6D9EEB", "#6FA8DC", "#8E7CC3", "#C27BA0",
          "#A61C00", "#CC0000", "#E69138", "#F1C232", "#6AA84F", "#45818E", "#3C78D8", "#3D85C6", "#674EA7", "#A64D79",
          "#85200C", "#990000", "#B45F06", "#BF9000", "#38761D", "#134F5C", "#1155CC", "#0B5394", "#351C75", "#733554",
          "#5B0F00", "#660000", "#783F04", "#7F6000", "#274E13", "#0C343D", "#1C4587", "#073763", "#20124D", "#4C1130",
        ],
      },
    }),
    [isDark, muiTheme.typography.fontFamily, height]
  );

  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      {label && (
        <Typography
          variant="body2"
          sx={{
            display: "block",
            mb: 1,
            fontWeight: 500,
            color: muiTheme.palette.text.primary,
          }}
        >
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      <Box
        sx={{
          border: error ? "1px solid red" : `1px solid ${isDark ? "#444" : "#ddd"}`,
          borderRadius: 1,
          overflow: "hidden",
          "& .jodit-container": {
            border: "none",
          },
          "& .jodit-workplace": {
            backgroundColor: isDark ? "#1e1e1e" : "#fff",
          },
          "& .jodit-wysiwyg": {
            minHeight: `${height}px`,
            padding: "16px",
            lineHeight: 1.6,
          },
        }}
      >
        <JoditEditor
          ref={editor}
          value={value || ""}
          config={config}
          onBlur={(newContent) => onChange(newContent)}
          onChange={(newContent) => {
            // Real-time updates for better UX
          }}
        />
      </Box>
      {error && (
        <Typography
          variant="caption"
          sx={{
            color: "error.main",
            display: "block",
            mt: 0.5,
          }}
        >
          {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default WYSIWYGInput;
