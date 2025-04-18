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







  const genders = [
    {
      value: 'Male',
      label: 'Male'
    },
    {
      value: 'Female',
      label: 'Female'
    },
    {
      value: 'Other',
      label: "Other"
    }
  ]

  const specialties = [
    { value: "anesthesiology", label: "Anesthesiology" },
    { value: "cardiology", label: "Cardiology" },
    { value: "dermatology", label: "Dermatology" },
    { value: "emergency_medicine", label: "Emergency Medicine" },
    { value: "ent", label: "ENT (Otolaryngology)" },
    { value: "gastroenterology", label: "Gastroenterology" },
    { value: "internal_medicine", label: "Internal Medicine" },
    { value: "nephrology", label: "Nephrology" },
    { value: "neurology", label: "Neurology" },
    { value: "oncology", label: "Oncology" },
    { value: "ophthalmology", label: "Ophthalmology" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "pathology", label: "Pathology" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "psychiatry", label: "Psychiatry" },
    { value: "radiology", label: "Radiology" },
    { value: "rehabilitation_medicine", label: "Rehabilitation Medicine" },
    { value: "surgery", label: "Surgery" },
    { value: "urology", label: "Urology" },
    { value: "obstetrics_gynecology", label: "Obstetrics and Gynecology (OB-GYN)" }
  ]

  const appointmentSession = [
    { value: "08:00", label: "08:00 - 08:30" },
    { value: "08:30", label: "08:30 - 09:00" },
    { value: "09:00", label: "09:00 - 09:30" },
    { value: "09:30", label: "09:30 - 10:00" },
    { value: "10:00", label: "10:00 - 10:30" },
    { value: "10:30", label: "10:30 - 11:00" },
    { value: "11:00", label: "11:00 - 11:30" },
    { value: "11:30", label: "11:30 - 12:00" },
    { value: "12:00", label: "12:00 - 12:30" },
    { value: "12:30", label: "12:30 - 13:00" },
    { value: "13:00", label: "13:00 - 13:30" },
    { value: "13:30", label: "13:30 - 14:00" },
    { value: "14:00", label: "14:00 - 14:30" },
    { value: "14:30", label: "14:30 - 15:00" },
    { value: "15:00", label: "15:00 - 15:30" },
    { value: "15:30", label: "15:30 - 16:00" },
    { value: "16:00", label: "16:00 - 16:30" },
    { value: "16:30", label: "16:30 - 17:00" }
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
            height: "90vh",
            overflowY: "auto",
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
                <TextField
                  id="fullName"
                  label="Full Name"
                  variant="standard"
                  fullWidth
                  sx={myStyle}
                  required
                />
              </Box>

              <Box sx={{ width: "50%" }}>
                <TextField required variant='standard' sx={myStyle} name="email" fullWidth label="Email" />
              </Box>
            </Box>

            {/* Birthday & phone Number */}
            <Box sx={{ width: "100%", display: "flex", gap: 2, flexDirection: "row" }}>

              <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label='Birthday' sx={{ ...myStyle, width: '100%' }} />
                </LocalizationProvider>

              </Box>

              <Box sx={{ width: "50%" }}>
                <TextField name="phoneNumber" required sx={myStyle} fullWidth label='Phone Number' />
              </Box>
            </Box>

            <Box sx={{ width: "100%", display: "flex", gap: 2, flexDirection: "row" }}>
              <TextField label='Gender' id='gender' select name='gender' fullWidth variant='standard' sx={myStyle} required >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value} >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ width: "100%", display: "flex", gap: 2, flexDirection: "row" }}>
              <TextField label='Address' id='gender' name='address' fullWidth variant='standard' sx={myStyle} required />
            </Box>

            <Box sx={{ width: "100%", display: "flex", gap: 2, flexDirection: "row" }}>
              <TextField label='Specialty' id='specialty' select name='specialty' fullWidth variant='standard' sx={myStyle} required >
                {specialties.map((option) => (
                  <MenuItem  key={option.value} value={option.value} >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Schedule */}
            <Box sx={{ width: "100%", display: "flex", gap: 2, flexDirection: "row" }}>

              <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label='Appointment date' sx={{ ...myStyle, width: '100%' }} />
                </LocalizationProvider> 
              </Box>

              <Box sx={{ width: "50%" }}>
                <TextField required select sx={myStyle} fullWidth label='Appointment session' >
                  {appointmentSession.map((option) => (
                    <MenuItem  value={option.value} key={option.value} >
                      {
                        option.label
                      }
                    </MenuItem>
                    ))}
                </TextField>
              </Box>
            </Box>




            <Box sx={{ width: "100%", display: "flex", gap: 2, flexDirection: "column" }}>
              {/* Text area */}
              <TextField

                id="outlined-multiline-flexible"
                label="Symptom "
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
