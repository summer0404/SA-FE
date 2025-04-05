"use client";
import Tooltip from "@mui/material/Tooltip";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function Filter() {
  return (
    <Tooltip title="Filter" arrow>
      <FilterAltIcon
        sx={{
          backgroundColor: "#CA79C6",
          padding: "10px",
          fontSize: "3rem",
          borderRadius: "10%",
          color: "white",
          cursor: "pointer",
          "&:hover": {
            color: "black",
          },
        }}
      />
    </Tooltip>
  );
}

export default Filter;
