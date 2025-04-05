"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typograpy from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import AddEmployee from "./AddEmployee/AddEmployee";
import Filter from "./Fiter/Filter";

function HeaderPage() {
  return (
    <Box
      sx={{
        height: "10%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typograpy
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          Staff
        </Typograpy>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <AddEmployee/>
        <Filter />
      </Box>
    </Box>
  );
}

export default HeaderPage;
