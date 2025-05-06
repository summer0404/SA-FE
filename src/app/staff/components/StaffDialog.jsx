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
import { StaffRole, StaffSpecialty } from "@/common/enums";
import { addStaff, deleteStaff, updateStaff } from "@/api/StaffController";
import { validateStaffForm } from "../staffFormValidator";

const StaffDialog = ({ open, mode, data, onClose, onSuccess }) => {
  const { enqueueSnackbar } = useSnackbar();

  const isReadOnly = mode === "view" || mode === "delete";

  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    dob: "",
    phone: "",
    gender: "",
    address: "",
    specialty: "",
    appointmentDate: "",
    session: "",
    symptoms: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      id: data?.id || "",
      code: data?.code || "",
      firstname: data?.firstname || "",
      lastname: data?.lastname || "",
      role: data?.role || "",
      identityNumber: data?.identityNumber || "",
      specialty: data?.specialty || "",
      licenseNumber: data?.licenseNumber || "",
      phoneNumber: data?.phoneNumber || "",
      email: data?.email || "",
      hireDate: data?.hireDate || "",
      status: data?.status || "",
    });
  }, [data]);

  useEffect(() => {
    if (open) {
      setErrors({});
    }
  }, [open, mode]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateStaffForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      if (mode === "add") {
        await addStaff(formData);
        enqueueSnackbar("Thêm nhân viên thành công!", { variant: "success" });
      } else if (mode === "edit") {
        await updateStaff(data.id, formData);
        enqueueSnackbar("Cập nhật nhân viên thành công!", {
          variant: "success",
        });
      } else if (mode === "delete") {
        await deleteStaff(data.id);
        enqueueSnackbar("Xoá nhân viên thành công!", { variant: "success" });
      }

      onClose();
      onSuccess?.(); // refresh lại danh sách
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
          fontFamily: "Roboto, sans-serif",
          fontSize: "1.25rem",
        }}
      >
        {mode === "add"
          ? "Thêm nhân viên"
          : mode === "edit"
          ? "Chỉnh sửa nhân viên"
          : mode === "delete"
          ? "Xoá nhân viên"
          : "Xem thông tin nhân viên"}
      </DialogTitle>

      <DialogContent sx={{ fontFamily: "Roboto, sans-serif" }}>
        <Stack spacing={2} mt={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Thông tin cá nhân
          </Typography>
          <Divider />

          <TextField
            label="Họ và tên đệm"
            value={formData.firstname}
            onChange={(e) => handleChange("firstname", e.target.value)}
            fullWidth
            disabled={isReadOnly}
            error={!!errors.firstname}
            helperText={errors.firstname}
          />
          <TextField
            label="Tên"
            value={formData.lastname}
            onChange={(e) => handleChange("lastname", e.target.value)}
            fullWidth
            disabled={isReadOnly}
            error={!!errors.lastname}
            helperText={errors.lastname}
          />
          <TextField
            label="CCCD"
            value={formData.identityNumber}
            onChange={(e) => handleChange("identityNumber", e.target.value)}
            fullWidth
            disabled={isReadOnly}
            error={!!errors.identityNumber}
            helperText={errors.identityNumber}
          />
          <TextField
            label="Ngày làm việc"
            type="date"
            value={formData.hireDate}
            onChange={(e) => handleChange("hireDate", e.target.value)}
            fullWidth
            disabled={isReadOnly}
            InputLabelProps={{ shrink: true }}
            error={!!errors.hireDate}
            helperText={errors.hireDate}
          />

          <Typography variant="subtitle1" fontWeight="bold" mt={2}>
            Liên hệ & Chuyên môn
          </Typography>
          <Divider />

          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
            disabled={isReadOnly}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Số điện thoại"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            fullWidth
            disabled={isReadOnly}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <TextField
            label="Chuyên môn"
            value={formData.specialty}
            onChange={(e) => handleChange("specialty", e.target.value)}
            fullWidth
            disabled={isReadOnly}
            error={!!errors.specialty}
            helperText={errors.specialty}
            select
          >
            {Object.entries(StaffSpecialty).map(([key, label]) => (
              <MenuItem key={key} value={label}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Vai trò"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            fullWidth
            disabled={isReadOnly}
            error={!!errors.role}
            helperText={errors.role}
            select
          >
            {Object.entries(StaffRole).map(([key, label]) => (
              <MenuItem key={key} value={label}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Số bằng cấp"
            value={formData.licenseNumber}
            onChange={(e) => handleChange("licenseNumber", e.target.value)}
            fullWidth
            disabled={isReadOnly}
            error={!!errors.licenseNumber}
            helperText={errors.licenseNumber}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ fontFamily: "Roboto, sans-serif" }}>
        <Button onClick={onClose}>Huỷ</Button>
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

export default StaffDialog;
