"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Divider,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import {
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "@/api/AppointmentController";

const AppointmentDialog = ({ open, mode, data, onClose, onSuccess }) => {
  const { enqueueSnackbar } = useSnackbar();

  const isReadOnly = mode === "view" || mode === "delete" || mode === "edit";
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthday: "",
    phoneNumber: "",
    gender: "",
    address: "",
    staffSpecialty: "",
    examinationDate: "",
    examinationSession: "",
    examinationTime: "",
    description: "",
  });

  useEffect(() => {
    if (mode !== "add") {
      if (data) {
        setFormData({
          fullName: data.fullName,
          email: data.email,
          birthday: data.birthday ? data.birthday.split("T")[0] : "",
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          address: data.address,
          staffSpecialty: data.staffSpecialty,
          examinationDate: data.examinationDate
            ? data.examinationDate.split("T")[0]
            : "",
          examinationSession: data.examinationTime,
          examinationTime: data.examinationTime,
          description: data.description,
          doctorCode: data.doctorCode,
          doctorName: data.doctorName
        });
      }
    } else {
      // Reset the form when in "add" mode
      setFormData({
        fullName: "",
        email: "",
        birthday: "",
        phoneNumber: "",
        gender: "",
        address: "",
        staffSpecialty: "",
        examinationDate: "",
        examinationSession: "",
        examinationTime: "",
        description: "",
      });
    }
  }, [mode, data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === "add") {
        const body = {
          fullName: formData.fullName || "",
          email: formData.email || "",
          birthday: formData.birthday || "",
          phoneNumber: formData.phoneNumber || "",
          gender: formData.gender || "",
          address: formData.address || "",
          staffSpecialty: formData.staffSpecialty || "",
          examinationDate: formData.examinationDate || "",
          examinationSession: formData.examinationSession || "",
          description: formData.description || "",
        };
        await createAppointment(body);
        enqueueSnackbar("Thêm lịch hẹn thành công!", { variant: "success" });
      } else if (mode === "edit") {
        const body = {
          fullName: formData.fullName || "",
          email: formData.email || "",
          birthday: formData.birthday || "",
          phoneNumber: formData.phoneNumber || "",
          gender: formData.gender || "",
          description: formData.description || "",
        };
        await updateAppointment(data.id, body);
        enqueueSnackbar("Cập nhật lịch hẹn thành công!", {
          variant: "success",
        });
      } else if (mode === "delete") {
        await deleteAppointment(data.id);
        enqueueSnackbar("Xoá lịch hẹn thành công!", { variant: "success" });
      }

      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Lỗi xử lý:", error);
      enqueueSnackbar("Đã xảy ra lỗi!", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const actionLabel = {
    view: "Đóng",
    edit: "Lưu",
    delete: "Xoá",
    add: "Thêm",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.25rem",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        {mode === "add"
          ? "Thêm lịch hẹn"
          : mode === "edit"
          ? "Chỉnh sửa lịch hẹn"
          : mode === "delete"
          ? "Xoá lịch hẹn"
          : "Xem lịch hẹn"}
      </DialogTitle>

      <DialogContent sx={{ fontFamily: "Roboto, sans-serif" }}>
        <Stack spacing={2} mt={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Thông tin bệnh nhân
          </Typography>
          <Divider />

          <TextField
            label="Họ và tên"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            fullWidth
            // disabled={mode !== "edit"}
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
            // disabled={mode !== "edit"}
          />
          <TextField
            label="Ngày sinh"
            type="date"
            value={formData.birthday}
            onChange={(e) => handleChange("birthday", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            // disabled={mode !== "edit"}
          />
          <TextField
            label="Số điện thoại"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            fullWidth
            // disabled={mode !== "edit"}
          />
          <TextField
            label="Giới tính"
            select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            fullWidth
            // disabled={mode !== "edit"}
          >
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
          </TextField>
          <TextField
            label="Địa chỉ"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            fullWidth
            // disabled={mode !== "edit"}
          />

          <Typography variant="subtitle1" fontWeight="bold" mt={2}>
            Thông tin lịch hẹn
          </Typography>
          <Divider />

          <TextField
            label="Chuyên khoa"
            value={formData.staffSpecialty}
            onChange={(e) => handleChange("staffSpecialty", e.target.value)}
            fullWidth
            disabled={isReadOnly}
          />
          <TextField
            label="Ngày khám"
            type="date"
            value={formData.examinationDate}
            onChange={(e) => handleChange("examinationDate", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            disabled={isReadOnly}
          />
          {mode == "add" && (
            <TextField
              label="Buổi khám"
              select
              value={formData.examinationSession}
              onChange={(e) =>
                handleChange("examinationSession", e.target.value)
              }
              fullWidth
              disabled={isReadOnly}
            >
              <MenuItem value="Morning">Sáng</MenuItem>
              <MenuItem value="Afternoon">Chiều</MenuItem>
            </TextField>
          )}

          {/* Examination Hour Field */}
          {mode != "add" && (
            <TextField
              label="Giờ khám"
              value={formData.examinationTime}
              onChange={(e) => handleChange("examinationTime", e.target.value)}
              fullWidth
              disabled={isReadOnly}
            />
          )}

{mode != "add" && (
            <TextField
              label="Mã nhân viên"
              value={formData.doctorCode}
              // onChange={(e) => handleChange("examinationTime", e.target.value)}
              fullWidth
              disabled={true}
            />
          )}

{mode != "add" && (
            <TextField
              label="Họ và tên nhân viên"
              value={formData.doctorName}
              // onChange={(e) => handleChange("examinationTime", e.target.value)}
              fullWidth
              disabled={true}
            />
          )}

          <TextField
            label="Triệu chứng"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            multiline
            rows={3}
            // disabled={mode !== "edit"}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ fontFamily: "Roboto, sans-serif" }}>
        <Button onClick={onClose} disabled={loading}>
          Huỷ
        </Button>
        {mode !== "view" && (
          <Button
            variant="contained"
            color={mode === "delete" ? "error" : "primary"}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : actionLabel[mode]}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentDialog;
