"use client";
import React, { useState } from "react";
import { Box, Grid, TextField, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function AppointmentFilter({ onSearch }) {
  const [filters, setFilters] = useState({
    identity: "",
    patientName: "",
    phone: "",
    staffCode: "",
    staffName: "",
  });

  const handleChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSearch = () => {
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
            value={filters.patientName}
            onChange={handleChange("patientName")}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Số điện thoại"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.phone}
            onChange={handleChange("phone")}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Mã nhân viên"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.staffCode}
            onChange={handleChange("staffCode")}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Tên nhân viên"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.staffName}
            onChange={handleChange("staffName")}
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
