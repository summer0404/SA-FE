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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StaffFilter from "./StaffFilter";
import StaffDialog from "./StaffDialog";
import CalendarDialog from "./CalendarDialog";
import { getWorkScheduleOfStaff, searchStaff } from "@/api/StaffController";
import { useSnackbar } from "notistack";

export default function StaffTable() {
  const { enqueueSnackbar } = useSnackbar();

  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("view");
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(null);
  const [events, setEvents] = useState([]);

  const fetchStaff = async (filters = {}) => {
    try {
      const result = await searchStaff(filters);
      setStaffs(result);
      enqueueSnackbar("Lấy danh sách nhân viên thành công!", {
        variant: "success",
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhân viên:", error);
      enqueueSnackbar("Lấy danh sách nhân viên thất bại!", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleOpenDialog = (mode, row = null) => {
    setDialogMode(mode);
    setSelectedRow(row);
    setOpenDialog(true);
  };

// Hàm formatDate để chuyển đổi thời gian
const formatDate = (dateString) => {
  const date = new Date(dateString); // Chuyển đổi chuỗi ISO thành đối tượng Date

  // Lấy các phần tử ngày, tháng, năm, giờ và phút
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 vì tháng trong Date bắt đầu từ 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Trả về chuỗi theo định dạng 'YYYY-MM-DD HH:mm'
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const handleViewSchedule = async (employeeId) => {
  if (!employeeId) {
    console.error("Employee ID is missing!");
    return;
  }

  try {
    // Lấy sự kiện từ API
    const eventsOfUser = await getWorkScheduleOfStaff(employeeId);

    console.log(eventsOfUser);
    
    // Định dạng lại thời gian cho mỗi sự kiện
    const formattedEvents = eventsOfUser.map((event) => ({
      ...event,
      start: formatDate(event.start), // Định dạng start
      end: formatDate(event.end),     // Định dạng end
    }));

    // Cập nhật trạng thái
    setSelectedEmployeeId(employeeId);
    setEvents(formattedEvents); // Truyền sự kiện đã được định dạng vào CalendarDialog
    setCalendarOpen(true);
  } catch (error) {
    console.error("Lỗi khi lấy lịch làm việc của nhân viên:", error);
  }
};

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Quản lý nhân viên
      </Typography>

      <StaffFilter onSearch={fetchStaff} />

      <Stack direction="row" justifyContent="flex-end" mb={1}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("add")}
        >
          Thêm mới nhân viên
        </Button>
      </Stack>

      <Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Cột hành động lên đầu tiên, không có header */}
                <TableCell align="center" sx={{ width: "120px" }} />
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
                  Họ và tên
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
                >
                  Khoa
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
                >
                  Email
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
                  Trạng thái
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {staffs
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
                        <IconButton
                          size="small"
                          onClick={() => handleViewSchedule(row.id)}
                          sx={{ color: "#CA79C6" }}
                        >
                          <CalendarTodayIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell align="center">{`${row.firstname} ${row.lastname}`}</TableCell>
                    <TableCell align="center">{row.specialty}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phoneNumber}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={staffs.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      <StaffDialog
        open={openDialog}
        mode={dialogMode}
        data={selectedRow}
        onClose={() => setOpenDialog(false)}
        onSuccess={fetchStaff}
      />
      {calendarOpen && (
        <Box mt={2}>
          <Button
            variant="outlined"
            onClick={() => setCalendarOpen(false)}
            sx={{ mb: 2 }}
          >
            Quay lại danh sách
          </Button>
          <CalendarDialog
            open={calendarOpen}
            onClose={() => setCalendarOpen(false)}
            employeeId={selectedEmployeeId}
            events={events} // Truyền sự kiện vào CalendarDialog
          />
        </Box>
      )}
    </Box>
  );
}
