import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
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

function AddEmployee() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [daysEnabled, setDaysEnabled] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const [employmentDate, setEmploymentDate] = useState(null); // State để lưu giá trị ngày
  const [roleValue, setRoleValue] = useState(""); // State cho role
  const [specialtyValue, setSpecialtyValue] = useState(""); // State cho specialty

  const handleCheckboxChange = (day) => {
    setDaysEnabled((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleSubmit = async () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    // Kiểm tra các trường bắt buộc
    if (!firstName) {
      alert("First Name is required");
      return;
    }
    if (!lastName) {
      alert("Last Name is required");
      return;
    }
    if (!email) {
      alert("Email is required");
      return;
    }
    if (!phoneNumber) {
      alert("Phone Number is required");
      return;
    }
    if (!roleValue) {
      alert("Role is required");
      return;
    }
    if (roleValue === "Doctor" && !specialtyValue) {
      alert("Specialty is required for Doctors");
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
      employmentDate: employmentDate ? employmentDate.toISOString() : null,
      workingDays: Object.keys(daysEnabled).filter((day) => daysEnabled[day]),
      workingHours: Object.keys(daysEnabled).reduce((acc, day) => {
        if (daysEnabled[day]) {
          acc[day] = {
            startTime:
              document.getElementById(`${day}-startTime`)?.value || null,
            endTime: document.getElementById(`${day}-endTime`)?.value || null,
          };
        }
        return acc;
      }, {}),
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
  return (
    <>
      <Tooltip title="Add employee" arrow>
        <PersonAddAlt1Icon
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
            height: "90vh",
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Add Staff Information
              </Typography>
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
                    required // Bắt buộc nhập
                  />
                  <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    sx={myStyle}
                    required
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
                      required
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
                    required
                  />
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    variant="standard"
                    fullWidth
                    sx={myStyle}
                    required
                  />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          id="employmentDate"
                          fullWidth
                          label="Employment Date"
                          sx={myStyle}
                          value={employmentDate} // Thêm value
                          onChange={(newValue) => setEmploymentDate(newValue)} // Thêm onChange
                          required
                        />
                      </DemoContainer>
                    </LocalizationProvider>
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
              {/* Date and time picker */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 2,
                  flexDirection: "column",
                  mt: 4,
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#CA79C6" }}
                  >
                    Working Days and Hours
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <Box
                        key={day}
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6" gutterBottom>
                            {day}
                          </Typography>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={daysEnabled[day]}
                                onChange={() => handleCheckboxChange(day)}
                              />
                            }
                          />
                        </Box>
                        {/* Hiển thị khung chọn thời gian nếu checkbox được chọn */}
                        {daysEnabled[day] && (
                          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["TimePicker"]}>
                                <TimePicker
                                  id={`${day}-startTime`} // Thêm id
                                  label="Start Time"
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["TimePicker"]}>
                                <TimePicker
                                  id={`${day}-endTime`} // Thêm id
                                  label="End Time"
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
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

export default AddEmployee;
