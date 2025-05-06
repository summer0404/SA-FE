export const formatDate = (value) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return ""; // không hợp lệ
  return date.toISOString().split("T")[0]; // yyyy-MM-dd
};
