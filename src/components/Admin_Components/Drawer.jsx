import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

export function DemoPageContent({ pathname, children }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
  
      {children} 
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  children: PropTypes.node,
};
