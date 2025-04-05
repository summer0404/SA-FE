"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import EditSquareIcon from "@mui/icons-material/EditSquare";

function EditInfo() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [roleValue, setRoleValue] = useState(""); // State cho role
  const [specialtyValue, setSpecialtyValue] = useState(""); // State cho specialty
  const [stateValue, setStateValue] = useState("123456789"); // State cho state

  const handleSubmit = async () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    // Kiểm tra các trường bắt buộc
    if (roleValue === "Doctor" && !specialtyValue) {
      alert("Specialty is required for Doctors");
      return;
    }

    if (!stateValue) {
      alert("State is required");
      return;
    }

    // Tạo dữ liệu cần gửi
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      role: roleValue,
      specialty: specialtyValue,
      // Các trường khác...
      licenseNumber: document.getElementById("licenseNumber").value,
      state: stateValue,
    };

    try {
      const response = await fetch("https://your-backend-api.com/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Employee added successfully!");
        handleClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  let myStyle = {
    "& .MuiInput-underline:before": {
      borderBottomColor: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#CA79C6",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "black",
    },
    "& .MuiInputLabel-root": {
      color: "black",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#CA79C6",
    },
  };

  const role = [
    {
      value: "Doctor",
      label: "Doctor",
    },
    {
      value: "Medical_Staff",
      label: "Medical Staff",
    },
    {
      value: "Administrative",
      label: "Administrative",
    },
    {
      value: "Reception_Staff",
      label: "Reception Staff",
    },
    {
      value: "Finance_Department",
      label: "Finance Department",
    },
    {
      value: "Accounting_Department",
      label: "Accounting Department",
    },
  ];

  const state = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "On_Leave",
      label: "On Leave",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ];
  return (
    <>
      <Tooltip title="Add employee" arrow>
        <EditSquareIcon
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
          onClick={handleOpen}
        />
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1200,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Update Staff Information
              </Typography>
              <TextField
                id="staffId"
                label="Staff ID"
                variant="standard"
                value={stateValue} // Giá trị Staff ID
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#CA79C6",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "black",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#CA79C6",
                  },
                  width: "40%",
                }}
                slotProps={{
                  htmlInput: false,
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
                {/* Left Box */}
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="standard"
                    fullWidth
                    sx={myStyle}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    sx={myStyle}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <TextField
                      id="role"
                      select
                      label="Select Role"
                      value={roleValue} // Liên kết với state
                      onChange={(e) => setRoleValue(e.target.value)} // Cập nhật state
                      variant="standard"
                      fullWidth
                      sx={myStyle}
                    >
                      {role.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="specialty"
                      label="Specialty"
                      value={specialtyValue} // Liên kết với state
                      onChange={(e) => setSpecialtyValue(e.target.value)} // Cập nhật state
                      variant="standard"
                      fullWidth
                      sx={myStyle}
                      required={roleValue === "Doctor"} // Bắt buộc nếu role là Doctor
                      error={roleValue === "Doctor" && !specialtyValue} // Hiển thị lỗi nếu không nhập
                      helperText={
                        roleValue === "Doctor" && !specialtyValue
                          ? "Specialty is required for Doctors"
                          : ""
                      }
                    />
                  </Box>
                </Box>
                {/* Right Box */}
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="standard"
                    fullWidth
                    sx={myStyle}
                  />
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    variant="standard"
                    fullWidth
                    sx={myStyle}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                    }}
                  >
                    <TextField
                      id="employeeState"
                      select
                      label="Select State"
                      value={stateValue} // Liên kết với state
                      onChange={(e) => setStateValue(e.target.value)} // Cập nhật state
                      variant="standard"
                      fullWidth
                      sx={myStyle}
                      required
                    >
                      {state.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Box>
              </Box>
              {/* License Number */}
              <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
                <TextField
                  id="licenseNumber"
                  fullWidth
                  label="License Number"
                  variant="standard"
                  sx={myStyle}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  px: 5,
                  borderRadius: "10px",
                  backgroundColor: "#CA79C6",
                  "&:hover": {
                    backgroundColor: "#CA79C6",
                  },
                }}
                onClick={handleSubmit} // Gọi hàm handleSubmit
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default EditInfo;
