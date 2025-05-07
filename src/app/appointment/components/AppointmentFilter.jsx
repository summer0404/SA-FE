"use client";
import React, { useState } from "react";
import { Box, Grid, TextField, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function AppointmentFilter({ onSearch }) {
  const [filters, setFilters] = useState({
    identity: "",
    fullName: "",
    phoneNumber: "",
    doctorCode: "",
    doctorName: "",
  });

  const handleChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSearch = () => {
    console.log(filters);
    onSearch?.(filters); // Gọi callback nếu có
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box mb={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <TextField
            label="Tên bệnh nhân"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.fullName}
            onChange={handleChange("fullName")}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Số điện thoại"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.phoneNumber}
            onChange={handleChange("phoneNumber")}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Mã nhân viên"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.doctorCode}
            onChange={handleChange("doctorCode")}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Tên nhân viên"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.doctorName}
            onChange={handleChange("doctorName")}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Tooltip title="Tìm kiếm">
            <IconButton color="primary" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
