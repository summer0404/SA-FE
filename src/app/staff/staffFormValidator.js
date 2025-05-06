export const validateStaffForm = (formData) => {
  const errors = {};

  if (!formData.firstname?.trim()) {
    errors.firstname = "Họ và tên đệm không được để trống";
  }

  if (!formData.lastname?.trim()) {
    errors.lastname = "Tên không được để trống";
  }

  if (!formData.identityNumber?.trim()) {
    errors.identityNumber = "CCCD không được để trống";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email không được để trống";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!formData.phoneNumber?.trim()) {
    errors.phoneNumber = "Số điện thoại không được để trống";
  }

  if (!formData.specialty) {
    errors.specialty = "Chuyên môn bắt buộc";
  }

  if (!formData.role) {
    errors.role = "Vai trò bắt buộc";
  }

  if (!formData.hireDate) {
    errors.hireDate = "Ngày làm việc bắt buộc";
  }

  if (!formData.licenseNumber?.trim()) {
    errors.licenseNumber = "Số bằng cấp không được để trống";
  }

  return errors;
};
