"use client";
import React, { useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  Tooltip,
  MenuItem,
  Box,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { StaffSpecialty } from "@/common/enums";

export default function StaffFilter({ onSearch }) {
  const [filters, setFilters] = useState({
    code: "",
    firstname: "",
    lastname: "",
    specialty: "",
  });

  const handleChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSearch = () => {
    onSearch?.(filters); // chỉ gọi API khi bấm nút
  };

  const handleClear = () => {
    const resetFilters = {
      code: "",
      firstname: "",
      lastname: "",
      specialty: "",
    };
    setFilters(resetFilters);
    onSearch?.(resetFilters); // gọi API khi xóa lọc
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // gọi API khi nhấn Enter
    }
  };

  return (
    <Box mb={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <TextField
            label="Mã nhân viên"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.code}
            onChange={handleChange("code")}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Họ và tên đệm"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.firstname}
            onChange={handleChange("firstname")}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Tên"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.lastname}
            onChange={handleChange("lastname")}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        {/* <Grid item xs={12} sm={3} sx={{ width: "300px" }}>
          <Autocomplete
            disablePortal
            value={filters.specialty} 
            onChange={handleChange("specialty")} // Xử lý khi người dùng chọn giá trị
            options={[
              { label: 'The Godfather', id: 1 },
              { label: 'Pulp Fiction', id: 2 },
            ]} 
            sx={{ width: "100%" }} 
            renderInput={(params) => (
              <TextField {...params} label="Khoa" size="small" />
            )}
            onKeyDown={handleKeyDown} // Lắng nghe sự kiện KeyDown
          />
        </Grid> */}

        <Grid item xs={12} sm={6} md={2}>
          <Box display="flex" justifyContent="start" alignItems="center">
            <Tooltip title="Tìm kiếm">
              <IconButton color="primary" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xoá bộ lọc">
              <IconButton onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
