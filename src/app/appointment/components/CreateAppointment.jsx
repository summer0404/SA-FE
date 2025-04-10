'use client'
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
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import { Autocomplete } from "@mui/material";

function CreateAppointment() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);





  const handleSubmit = async () => {
 
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

  const patients = [
    {
      value: "PA001",
      label: "Patient 1",
    },
    {
      value: "PA002",
      label: "Patient 2",
    },
    {
      value: "PA003",
      label: "Patient 3",
    },
    {
      value: "PA004",
      label: "Patient 4",
    },
    {
      value: "PA005",
      label: "Patient 5",
    },
    {
      value: "PA006",
      label: "Patient 6",
    },
  ];

  const doctors = [
    {
      value: "DR001",
      label: "Doctor 1",
    },
    {
      value: "DR002",
      label: "Doctor 2",
    },
    {
      value: "DR003",
      label: "Doctor 3",
    },
    {
      value: "DR004",
      label: "Doctor 4",
    },]

  const types = [
    {
      value: "examination",
      label: "Examination"
    },
    {
      value: "consultation",
      label: "Consultation"
    },
    {
      value: "vaccination",
      label: "Vaccination"
    },
    {
      value: "other",
      label: "Other"
    }
  ]


  return (
    <>
      <Tooltip title="Add appointment" arrow>
        <AssignmentAddIcon
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
            height: "60vh",
            // overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Add Appointment Information
              </Typography>
            </Box>

            {/* Patient and Doctor */}
            <Box sx={{ width: "100%", display: "flex", gap: 2, flexDirection: "row" }}>

              <Box sx={{ width: "50%" }}>
                <Autocomplete
                  sx={myStyle}
                  id="patientId"
                  
                  options={patients}
                  renderInput={(params) => (
                    <TextField {...params} label="Patient" variant="standard" />
                  )}
                />
              </Box>

              <Box sx={{ width: "50%" }}>
                <Autocomplete
                  sx={myStyle}
                  id="doctorId"
                  
                  options={doctors}
                  renderInput={(params) => (
                    <TextField {...params} label="Doctor" variant="standard" />
                  )}
                />

              </Box>
            </Box>

            {/* Date and Time */}
            <Box sx={{ width: '100%', display: 'flex', gap: 2, flexDirection: "row", alignItems: "center" }}>
              <Box sx={{ width: "50%", display: "flex", gap: 2, flexDirection: "row" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      id='startTime' // Thêm id
                      label="Start Time"
                    />
                  </DemoContainer>
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      id='endTime' // Thêm id
                      label="End Time"
                    />
                  </DemoContainer>
                </LocalizationProvider>

              </Box>

              <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{ paddingTop: "8px" }} />
                  </LocalizationProvider>

                </Box>

                <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
                  <TextField
                    id="type"
                    select
                    label="Type"
                    // value={roleValue} // Liên kết với state
                    // onChange={(e) => setRoleValue(e.target.value)} // Cập nhật state
                    variant="standard"
                    fullWidth
                    sx={myStyle}
                    required
                  >
                    {types.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                </Box>
              </Box>
            </Box>

            <Box sx={{ width: "100%", display: "flex", gap: 2,  flexDirection: "column"}}>
              {/* Text area */}
              <TextField
               
                id="outlined-multiline-flexible"
                label="Reason"
                multiline
                sx={{ ...myStyle, width: "100%" }}
                variant="standard"
                
                maxRows={4}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                      
        </Box>
        
      </Modal>
    </>
  );
}

export default CreateAppointment;
