"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinearProgress from "@mui/material/LinearProgress";

function PatientProfile() {
  // Sample patient data
  const patient = {
    name: "John Smith",
    email: "johnsmith@gmail.com",
    phone: "+91 8548521524",
    address: "345, Sarju Appt., Mota Varacha, Surat Gujarat, India.",
    about:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  };

  // Sample visit history data
  const visitHistory = [
    {
      date: "12 Jan 2022",
      doctor: "Dr Jacob Ryan",
      treatment: "Check up",
      charges: "$145",
    },
    {
      date: "12 Jan 2022",
      doctor: "Dr Jacob Ryan",
      treatment: "X-Ray",
      charges: "$52",
    },
    {
      date: "12 Jan 2022",
      doctor: "Dr Jacob Ryan",
      treatment: "Blood Test",
      charges: "$52",
    },
  ];

  // Sample health metrics data
  const healthMetrics = [
    { name: "Heart Beat", value: 93, color: "#d38bce" },
    { name: "Blood Pressure", value: 89, color: "#6cd3b0" },
    { name: "Sugar", value: 60, color: "#6ec4e8" },
    { name: "Haemoglobin", value: 80, color: "#e87c6e" },
  ];

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#ffffff",
        borderRadius: "26px",
        minHeight: "100vh",
      }}
    >
      {/* <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: "#2e3356" }}
      >
        Profile
      </Typography> */}

      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "16px",
          p: 3,
          mb: 3,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#2e3356" }}
          >
            Patient Information
          </Typography>

          <Box>
            <Button
              variant="contained"
              sx={{
                mr: 1,
                bgcolor: "#ff7171",
                "&:hover": { bgcolor: "#e06565" },
              }}
            >
              Patient List
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#b280bc",
                "&:hover": { bgcolor: "#a070aa" },
              }}
            >
              Add Patient
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Patient Image */}
          <Box
            sx={{
              width: "200px",
              height: "200px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src="/User.png"
              alt="Patient profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Patient Details */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", mb: 1, color: "#2e3356" }}
            >
              About Patient
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#6b7280" }}>
              {patient.about}
            </Typography>

            <Box sx={{ display: "flex", gap: 4 }}>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1, color: "#2e3356" }}
                >
                  Email
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  {patient.email}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1, color: "#2e3356" }}
                >
                  Phone Number
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  {patient.phone}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1, color: "#2e3356" }}
                >
                  Address
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  {patient.address}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 3 }}>
        {/* Past Visit History */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "white",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, color: "#2e3356" }}
          >
            Past Visit History
          </Typography>

          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ boxShadow: "none" }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={{ color: "#6b7280" }}>Date</TableCell>
                  <TableCell sx={{ color: "#6b7280" }}>Doctor</TableCell>
                  <TableCell sx={{ color: "#6b7280" }}>Treatment</TableCell>
                  <TableCell sx={{ color: "#6b7280" }}>Charges</TableCell>
                  <TableCell sx={{ color: "#6b7280" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visitHistory.map((visit, index) => (
                  <TableRow key={index}>
                    <TableCell>{visit.date}</TableCell>
                    <TableCell>{visit.doctor}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: "4px",
                          bgcolor:
                            /*index === 0
                              ? "#ff7171"
                              : index === 1
                              ? "#ff8b8b"
                              : "#ff9e9e"*/
                            "#ff7171",
                          color: "white",
                          display: "inline-block",
                          fontSize: "0.75rem",
                        }}
                      >
                        {visit.treatment}
                      </Box>
                    </TableCell>
                    <TableCell>{visit.charges}</TableCell>
                    <TableCell>
                      <IconButton size="small" sx={{ color: "#6b7280" }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#6b7280" }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* General Report */}
        <Box
          sx={{
            width: "40%",
            bgcolor: "white",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, color: "#2e3356" }}
          >
            General Report
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {healthMetrics.map((metric, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "#2e3356" }}
                  >
                    {metric.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "#2e3356" }}
                  >
                    {metric.name === "Haemoglobin"
                      ? `${metric.value}%`
                      : metric.value}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: "#e2e8f0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: metric.color,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PatientProfile;
