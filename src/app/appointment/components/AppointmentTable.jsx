"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  Stack,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import AppointmentDialog from "./AppointmentDialog";
import AppointmentFilter from "./AppointmentFilter";
import { searchAppointment } from "@/api/AppointmentController";
import { useSnackbar } from "notistack";

export default function AppointmentTable() {
  const { enqueueSnackbar } = useSnackbar();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("view");
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const fetchAppointment = async () => {
  //   try {
  //     const appointments = await searchAppointment();
  //     console.log(appointments);

  //     setAppointments(appointments);
  //     enqueueSnackbar("Lấy các lịch hẹn thành công!", {
  //       variant: "success",
  //     });
  //   } catch (error) {
  //     console.error("Error fetching appointment:", error.message || error);
  //     enqueueSnackbar("Lấy lịch hẹn thất bại!", {
  //       variant: "error",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchAppointment();
  // }, []);

  const fetchAppointment = async (filters = {}) => {
    setLoading(true); // Đặt loading true khi bắt đầu fetch
    try {
      const appointmentsData = await searchAppointment(filters);
      console.log(appointmentsData);

      setAppointments(appointmentsData);
      enqueueSnackbar("Lấy các lịch hẹn thành công!", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error fetching appointment:", error.message || error);
      enqueueSnackbar("Lấy lịch hẹn thất bại!", {
        variant: "error",
      });
    } finally {
      setLoading(false); // Đặt loading false khi fetch xong
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  const handleOpenDialog = (mode, row = null) => {
    setDialogMode(mode);
    setSelectedRow(row);
    setOpenDialog(true);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Quản lý lịch hẹn
      </Typography>

      <AppointmentFilter onSearch={fetchAppointment} />

      <Stack direction="row" justifyContent="flex-end" mb={1}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("add")}
        >
          Thêm mới lịch hẹn
        </Button>
      </Stack>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: 120 }} />{" "}
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
                >
                  Họ và tên bệnh nhân
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
                >
                  Giới tính
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
                >
                  Số điện thoại
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
                >
                  Triệu chứng
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
                >
                  Mã nhân viên
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
                >
                  Họ và tên Nhân viên
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
                >
                  Ngày khám
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
                >
                  Giờ khám
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={0.5}
                        justifyContent="center"
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog("view", row)}
                          color="primary"
                        >
                          <InfoIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog("edit", row)}
                          color="warning"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog("delete", row)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">{row.fullName}</TableCell>
                    <TableCell align="center">{row.gender}</TableCell>
                    <TableCell align="center">{row.phoneNumber}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.doctorCode}</TableCell>
                    <TableCell align="center">{row.doctorName}</TableCell>
                    <TableCell align="center">
                      {new Date(row.examinationDate).toLocaleDateString(
                        "vi-VN"
                      )}
                    </TableCell>
                    <TableCell align="center">{row.examinationTime}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={appointments.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      <AppointmentDialog
        open={openDialog}
        mode={dialogMode}
        data={selectedRow}
        onClose={() => setOpenDialog(false)}
        onSuccess={fetchAppointment}
      />
    </Box>
  );
}
