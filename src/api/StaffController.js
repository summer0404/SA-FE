import { convertFilters } from "@/utils/convertFilter";

const { post } = require("@/utils/commonUtil");

const BACKEND_STAFF_URL = "http://localhost:3010/staffs";

// Thêm nhân viên
export const addStaff = async (staff) => {
  const { id, code, status, ...payload } = staff;

  const response = await fetch(`${BACKEND_STAFF_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to add employee: ${error}`);
  }

  const json = await response.json();
  return json?.data;
};

// Cập nhật nhân viên
export const updateStaff = async (staffId, staff) => {
  const { id, code, ...payload } = staff;

  const response = await fetch(`${BACKEND_STAFF_URL}/${staffId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update employee: ${error}`);
  }

  const json = await response.json();
  return json?.data;
};

// Tìm kiếm nhân viên
export const searchStaff = async (
  filters = {},
  pagination = { page: 1, limit: 10 }
) => {
  const payload = {
    quickSearch: convertFilters(filters), // ✅ mảng đúng định dạng DTO
    pagination, // ✅ nếu cần phân trang
  };

  const response = await fetch(`${BACKEND_STAFF_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get staff list: ${response.status} - ${error}`);
  }

  const json = await response.json();
  console.log(json?.data);
  return json?.data || [];
  // return [
  //   {
  //     id: "6fd8c8a9-4cb4-49ef-b1ab-8f6cc66b01af",
  //     code: "NV1001",
  //     firstname: "Nguyễn Văn",
  //     lastname: "An",
  //     role: "Bác sĩ",
  //     identityNumber: "123456789012",
  //     specialty: "Nội",
  //     licenseNumber: "LC1001",
  //     phoneNumber: "0901234567",
  //     email: "an.nguyen@example.com",
  //     hireDate: "2024-03-01",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "238b5730-48e1-4dcd-a1c4-d50e6e2081c6",
  //     code: "NV1002",
  //     firstname: "Trần Thị",
  //     lastname: "Bích",
  //     role: "Y tá",
  //     identityNumber: "987654321098",
  //     specialty: "Nhi",
  //     licenseNumber: "LC1002",
  //     phoneNumber: "0912345678",
  //     email: "bich.tran@example.com",
  //     hireDate: "2024-04-15",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "8c53b32c-8c87-4f5b-b76e-25575c33f541",
  //     code: "NV1003",
  //     firstname: "Lê Hoàng",
  //     lastname: "Nam",
  //     role: "Bác sĩ",
  //     identityNumber: "192837465091",
  //     specialty: "Ngoại",
  //     licenseNumber: "LC1003",
  //     phoneNumber: "0934567890",
  //     email: "nam.le@example.com",
  //     hireDate: "2023-12-20",
  //     status: "Chờ xác nhận",
  //   },
  //   {
  //     id: "301b7aaf-bcbf-4a09-a8f5-5722ef9cde0a",
  //     code: "NV1004",
  //     firstname: "Phạm Minh",
  //     lastname: "Tuấn",
  //     role: "Điều dưỡng",
  //     identityNumber: "456789123456",
  //     specialty: "Hồi sức",
  //     licenseNumber: "LC1004",
  //     phoneNumber: "0945678901",
  //     email: "tuan.pham@example.com",
  //     hireDate: "2025-01-10",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "2e13e2e5-08ed-46bb-9bdb-30808dc3e7d4",
  //     code: "NV1005",
  //     firstname: "Đặng Thanh",
  //     lastname: "Hà",
  //     role: "Y tá",
  //     identityNumber: "789012345678",
  //     specialty: "Nội",
  //     licenseNumber: "LC1005",
  //     phoneNumber: "0956789012",
  //     email: "ha.dang@example.com",
  //     hireDate: "2024-06-22",
  //     status: "Inactive",
  //   },
  //   {
  //     id: "ee45e1b0-d31e-43f7-bfa0-0b11c631e87c",
  //     code: "NV1006",
  //     firstname: "Hoàng Thị",
  //     lastname: "Mai",
  //     role: "Y tá",
  //     identityNumber: "456321789654",
  //     specialty: "Nhi",
  //     licenseNumber: "LC1006",
  //     phoneNumber: "0967890123",
  //     email: "mai.hoang@example.com",
  //     hireDate: "2023-11-12",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "6c64c182-c48f-4aa2-b9dc-68ebac4f4a56",
  //     code: "NV1007",
  //     firstname: "Bùi Quốc",
  //     lastname: "Dũng",
  //     role: "Bác sĩ",
  //     identityNumber: "321456987012",
  //     specialty: "Ngoại",
  //     licenseNumber: "LC1007",
  //     phoneNumber: "0978901234",
  //     email: "dung.bui@example.com",
  //     hireDate: "2025-03-18",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "a57a1cfc-b5b6-4a83-9be5-0ccf0d338f6b",
  //     code: "NV1008",
  //     firstname: "Ngô Thị",
  //     lastname: "Lan",
  //     role: "Y tá",
  //     identityNumber: "741258963012",
  //     specialty: "Nhi",
  //     licenseNumber: "LC1008",
  //     phoneNumber: "0989012345",
  //     email: "lan.ngo@example.com",
  //     hireDate: "2024-10-05",
  //     status: "Chờ xác nhận",
  //   },
  //   {
  //     id: "44b897e5-49a4-45f1-9af7-b5fe0ee6e746",
  //     code: "NV1009",
  //     firstname: "Vũ Văn",
  //     lastname: "Khánh",
  //     role: "Bác sĩ",
  //     identityNumber: "852963741258",
  //     specialty: "Da liễu",
  //     licenseNumber: "LC1009",
  //     phoneNumber: "0990123456",
  //     email: "khanh.vu@example.com",
  //     hireDate: "2025-04-10",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "f0f7f70f-9df9-4a4f-b27d-90d8b6ea7e4a",
  //     code: "NV1010",
  //     firstname: "Trịnh Thị",
  //     lastname: "Thu",
  //     role: "Y tá",
  //     identityNumber: "963258741369",
  //     specialty: "Nội",
  //     licenseNumber: "LC1010",
  //     phoneNumber: "0901239876",
  //     email: "thu.trinh@example.com",
  //     hireDate: "2024-09-30",
  //     status: "Inactive",
  //   },
  //   {
  //     id: "3cc3b80a-9b12-4c48-b6f0-7beef1c3648f",
  //     code: "NV1011",
  //     firstname: "Phan Ngọc",
  //     lastname: "Hiếu",
  //     role: "Bác sĩ",
  //     identityNumber: "876543210987",
  //     specialty: "Hô hấp",
  //     licenseNumber: "LC1011",
  //     phoneNumber: "0909090909",
  //     email: "hieu.phan@example.com",
  //     hireDate: "2025-02-01",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "e8bc4bd0-4e79-402f-80a2-d5bcdb3c7b3a",
  //     code: "NV1012",
  //     firstname: "Đỗ Nhật",
  //     lastname: "Quang",
  //     role: "Y tá",
  //     identityNumber: "102938475610",
  //     specialty: "Tim mạch",
  //     licenseNumber: "LC1012",
  //     phoneNumber: "0923456789",
  //     email: "quang.do@example.com",
  //     hireDate: "2024-05-25",
  //     status: "Chờ xác nhận",
  //   },
  //   {
  //     id: "77010f78-bc3a-43ff-a0f9-f40976c71cbe",
  //     code: "NV1013",
  //     firstname: "Lương Khánh",
  //     lastname: "Vy",
  //     role: "Bác sĩ",
  //     identityNumber: "293847561029",
  //     specialty: "Tai Mũi Họng",
  //     licenseNumber: "LC1013",
  //     phoneNumber: "0911987654",
  //     email: "vy.luong@example.com",
  //     hireDate: "2024-12-12",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "159dfdb4-1b26-4f92-8fa9-7f4e93e86ab9",
  //     code: "NV1014",
  //     firstname: "Trần Nhật",
  //     lastname: "Minh",
  //     role: "Y tá",
  //     identityNumber: "483920193847",
  //     specialty: "Hồi sức",
  //     licenseNumber: "LC1014",
  //     phoneNumber: "0938123984",
  //     email: "minh.tran@example.com",
  //     hireDate: "2025-01-01",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "4b0622a1-2368-4cf4-8b34-58f81b4f4a7f",
  //     code: "NV1015",
  //     firstname: "Nguyễn Hữu",
  //     lastname: "Đạt",
  //     role: "Bác sĩ",
  //     identityNumber: "473829103847",
  //     specialty: "Nội",
  //     licenseNumber: "LC1015",
  //     phoneNumber: "0977834221",
  //     email: "dat.nguyen@example.com",
  //     hireDate: "2024-08-20",
  //     status: "Chờ xác nhận",
  //   },
  //   {
  //     id: "ec3bdfe2-457c-4dfb-b1e7-0d671c6a6f3b",
  //     code: "NV1016",
  //     firstname: "Mai Thị",
  //     lastname: "Cẩm",
  //     role: "Y tá",
  //     identityNumber: "564738291028",
  //     specialty: "Da liễu",
  //     licenseNumber: "LC1016",
  //     phoneNumber: "0908989898",
  //     email: "cam.mai@example.com",
  //     hireDate: "2025-04-25",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "3ab5ec2c-64f7-4199-b9c4-6ff10d7a177e",
  //     code: "NV1017",
  //     firstname: "Đỗ Hoàng",
  //     lastname: "Phúc",
  //     role: "Bác sĩ",
  //     identityNumber: "837465920384",
  //     specialty: "Tim mạch",
  //     licenseNumber: "LC1017",
  //     phoneNumber: "0911223344",
  //     email: "phuc.do@example.com",
  //     hireDate: "2025-05-02",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "e27344c9-5fc6-4bcd-982a-540e6a6cd3e2",
  //     code: "NV1018",
  //     firstname: "Phạm Thanh",
  //     lastname: "Ngọc",
  //     role: "Y tá",
  //     identityNumber: "120394857102",
  //     specialty: "Nội",
  //     licenseNumber: "LC1018",
  //     phoneNumber: "0901122334",
  //     email: "ngoc.pham@example.com",
  //     hireDate: "2025-03-30",
  //     status: "Chờ xác nhận",
  //   },
  //   {
  //     id: "7e3e262e-4dbf-4e49-a49d-9eaf4200ea91",
  //     code: "NV1019",
  //     firstname: "Lê Minh",
  //     lastname: "Trí",
  //     role: "Bác sĩ",
  //     identityNumber: "847362910284",
  //     specialty: "Ngoại",
  //     licenseNumber: "LC1019",
  //     phoneNumber: "0909988776",
  //     email: "tri.le@example.com",
  //     hireDate: "2025-01-15",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "ca72aeb4-e5d5-4fcb-9d40-2f961b4299f2",
  //     code: "NV1020",
  //     firstname: "Nguyễn Thị",
  //     lastname: "Linh",
  //     role: "Y tá",
  //     identityNumber: "938475610293",
  //     specialty: "Nhi",
  //     licenseNumber: "LC1020",
  //     phoneNumber: "0933445566",
  //     email: "linh.nguyen@example.com",
  //     hireDate: "2024-07-07",
  //     status: "Inactive",
  //   },
  // ];
};

// Xóa nhân viên
export const deleteStaff = async (id) => {
  const response = await fetch(`${BACKEND_STAFF_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to delete employee: ${error}`);
  }
};

// Lấy lịch làm việc của nhân viên (hiện đang mock)
export const getWorkScheduleOfStaff = async (id) => {
  const response = await fetch(`http://localhost:3002/work-schedules/staff/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get work schedule of staff: ${response.status} - ${error}`);
  }

  const json = await response.json();
  console.log(json?.data);
  return json?.data || [];
};
