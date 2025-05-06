import { convertFilters } from "@/utils/convertFilter";

const { post } = require("@/utils/commonUtil");

const BACKEND_APPOINTMENT_URL = "http://localhost:3010/appointments";

export const createAppointment = async (staff) => {
  const { id, code, status, ...payload } = staff;

  const response = await fetch(`${BACKEND_APPOINTMENT_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log(response);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to add appointment: ${error}`);
  }

  const json = await response.json();
  return json?.data;
};

export const updateAppointment = async (staffId, staff) => {
  const { id, code, ...payload } = staff;

  const response = await fetch(`${BACKEND_APPOINTMENT_URL}/${staffId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update appointment: ${error}`);
  }

  const json = await response.json();
  return json?.data;
};

// Tìm kiếm lịch hẹn
export const searchAppointment = async (
  filters = {},
  pagination = { page: 1, limit: 10 }
) => {
  const payload = {
    quickSearch: convertFilters(filters), // ✅ mảng đúng định dạng DTO
    pagination, // ✅ nếu cần phân trang
  };

  console.log(filters);

  console.log(payload);

  const response = await fetch(`${BACKEND_APPOINTMENT_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Failed to get appointment list: ${response.status} - ${error}`
    );
  }

  const json = await response.json();

  return json?.data || [];
  // return [
  //   {
  //     id: "a1",
  //     fullName: "Nguyễn Thị Mai",
  //     email: "mainguyen@example.com",
  //     birthday: "1995-02-10T00:00:00.000Z",
  //     phoneNumber: "0901234567",
  //     gender: "Nữ",
  //     address: "12 Nguyễn Huệ, TP.HCM",
  //     staffSpecialty: "Nội",
  //     examinationDate: "2025-05-20T00:00:00.000Z",
  //     examinationTime: "08:00",
  //     description: "Khó thở, ho khan",
  //     doctorCode: "NV1010",
  //     doctorName: "Phạm Minh Tuấn",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a2",
  //     fullName: "Trần Văn B",
  //     email: "tranvanb@example.com",
  //     birthday: "1987-07-20T00:00:00.000Z",
  //     phoneNumber: "0911223344",
  //     gender: "Nam",
  //     address: "45 Hai Bà Trưng, Hà Nội",
  //     staffSpecialty: "Ngoại",
  //     examinationDate: "2025-05-20T00:00:00.000Z",
  //     examinationTime: "08:20",
  //     description: "Đau bụng kéo dài",
  //     doctorCode: "NV1020",
  //     doctorName: "Nguyễn Hữu Đạt",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a3",
  //     fullName: "Lê Thị Cẩm Tú",
  //     email: "tu.le@example.com",
  //     birthday: "2000-01-15T00:00:00.000Z",
  //     phoneNumber: "0934567890",
  //     gender: "Nữ",
  //     address: "76 Lý Thường Kiệt, Đà Nẵng",
  //     staffSpecialty: "Nhi",
  //     examinationDate: "2025-05-20T00:00:00.000Z",
  //     examinationTime: "08:40",
  //     description: "Sốt cao 3 ngày",
  //     doctorCode: "NV1030",
  //     doctorName: "Vũ Văn Khánh",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a4",
  //     fullName: "Phan Minh Đức",
  //     email: "duc.phan@example.com",
  //     birthday: "1992-03-12T00:00:00.000Z",
  //     phoneNumber: "0945678912",
  //     gender: "Nam",
  //     address: "120 Trường Chinh, Huế",
  //     staffSpecialty: "Tim mạch",
  //     examinationDate: "2025-05-21T00:00:00.000Z",
  //     examinationTime: "07:00",
  //     description: "Đau tức ngực",
  //     doctorCode: "NV1040",
  //     doctorName: "Đỗ Hoàng Phúc",
  //     status: "Đã khám",
  //   },
  //   {
  //     id: "a5",
  //     fullName: "Hoàng Văn An",
  //     email: "an.hoang@example.com",
  //     birthday: "1985-06-05T00:00:00.000Z",
  //     phoneNumber: "0967890123",
  //     gender: "Nam",
  //     address: "31 Nguyễn Du, Cần Thơ",
  //     staffSpecialty: "Nội",
  //     examinationDate: "2025-05-21T00:00:00.000Z",
  //     examinationTime: "07:20",
  //     description: "Cảm lạnh, đau đầu",
  //     doctorCode: "NV1050",
  //     doctorName: "Trần Nhật Minh",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a6",
  //     fullName: "Lương Ngọc Hạnh",
  //     email: "hanh.luong@example.com",
  //     birthday: "1991-11-11T00:00:00.000Z",
  //     phoneNumber: "0978000001",
  //     gender: "Nữ",
  //     address: "88 Điện Biên Phủ, TP.HCM",
  //     staffSpecialty: "Da liễu",
  //     examinationDate: "2025-05-21T00:00:00.000Z",
  //     examinationTime: "07:40",
  //     description: "Viêm da dị ứng",
  //     doctorCode: "NV1060",
  //     doctorName: "Mai Thị Cẩm",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a7",
  //     fullName: "Đặng Quang Huy",
  //     email: "huy.dang@example.com",
  //     birthday: "1993-09-09T00:00:00.000Z",
  //     phoneNumber: "0989000011",
  //     gender: "Nam",
  //     address: "Tân Bình, TP.HCM",
  //     staffSpecialty: "Ngoại",
  //     examinationDate: "2025-05-22T00:00:00.000Z",
  //     examinationTime: "08:00",
  //     description: "Đau vai gáy",
  //     doctorCode: "NV1070",
  //     doctorName: "Ngô Thị Lan",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a8",
  //     fullName: "Nguyễn Văn Hùng",
  //     email: "hung.nguyen@example.com",
  //     birthday: "1980-12-30T00:00:00.000Z",
  //     phoneNumber: "0911111222",
  //     gender: "Nam",
  //     address: "An Dương Vương, Quận 5, TP.HCM",
  //     staffSpecialty: "Tai Mũi Họng",
  //     examinationDate: "2025-05-22T00:00:00.000Z",
  //     examinationTime: "08:20",
  //     description: "Viêm họng hạt",
  //     doctorCode: "NV1080",
  //     doctorName: "Lương Khánh Vy",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a9",
  //     fullName: "Lê Thị Kim Ngân",
  //     email: "ngan.le@example.com",
  //     birthday: "1999-08-19T00:00:00.000Z",
  //     phoneNumber: "0909090909",
  //     gender: "Nữ",
  //     address: "Tân Phú, TP.HCM",
  //     staffSpecialty: "Nội",
  //     examinationDate: "2025-05-22T00:00:00.000Z",
  //     examinationTime: "08:40",
  //     description: "Đau bụng kinh",
  //     doctorCode: "NV1090",
  //     doctorName: "Trịnh Thị Thu",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a10",
  //     fullName: "Võ Tấn Phát",
  //     email: "phat.vo@example.com",
  //     birthday: "1996-10-25T00:00:00.000Z",
  //     phoneNumber: "0938334455",
  //     gender: "Nam",
  //     address: "Bình Tân, TP.HCM",
  //     staffSpecialty: "Hồi sức",
  //     examinationDate: "2025-05-23T00:00:00.000Z",
  //     examinationTime: "09:00",
  //     description: "Mệt mỏi, suy nhược",
  //     doctorCode: "NV1100",
  //     doctorName: "Đỗ Nhật Quang",
  //     status: "Chờ khám",
  //   },

  //   {
  //     id: "a11",
  //     fullName: "Ngô Văn Tiến",
  //     email: "tien.ngo@example.com",
  //     birthday: "1982-04-17T00:00:00.000Z",
  //     phoneNumber: "0977665544",
  //     gender: "Nam",
  //     address: "Biên Hòa, Đồng Nai",
  //     staffSpecialty: "Tim mạch",
  //     examinationDate: "2025-05-23T00:00:00.000Z",
  //     examinationTime: "09:20",
  //     description: "Tim đập nhanh, chóng mặt",
  //     doctorCode: "NV1110",
  //     doctorName: "Phan Ngọc Hiếu",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a12",
  //     fullName: "Phạm Thị Hồng",
  //     email: "hong.pham@example.com",
  //     birthday: "1994-03-28T00:00:00.000Z",
  //     phoneNumber: "0988223344",
  //     gender: "Nữ",
  //     address: "Long Xuyên, An Giang",
  //     staffSpecialty: "Nhi",
  //     examinationDate: "2025-05-23T00:00:00.000Z",
  //     examinationTime: "09:40",
  //     description: "Ho lâu ngày",
  //     doctorCode: "NV1120",
  //     doctorName: "Nguyễn Thị Linh",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a13",
  //     fullName: "Trần Đăng Khoa",
  //     email: "khoa.tran@example.com",
  //     birthday: "1988-08-08T00:00:00.000Z",
  //     phoneNumber: "0911002233",
  //     gender: "Nam",
  //     address: "Quận 9, TP.HCM",
  //     staffSpecialty: "Ngoại",
  //     examinationDate: "2025-05-24T00:00:00.000Z",
  //     examinationTime: "10:00",
  //     description: "Chấn thương cổ tay",
  //     doctorCode: "NV1130",
  //     doctorName: "Lê Minh Trí",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a14",
  //     fullName: "Đinh Thị Lan",
  //     email: "lan.dinh@example.com",
  //     birthday: "1997-07-07T00:00:00.000Z",
  //     phoneNumber: "0933002211",
  //     gender: "Nữ",
  //     address: "Vũng Tàu",
  //     staffSpecialty: "Da liễu",
  //     examinationDate: "2025-05-24T00:00:00.000Z",
  //     examinationTime: "10:20",
  //     description: "Nổi mẩn ngứa",
  //     doctorCode: "NV1140",
  //     doctorName: "Hoàng Thị Mai",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a15",
  //     fullName: "Nguyễn Bảo Châu",
  //     email: "chau.nguyen@example.com",
  //     birthday: "2001-01-01T00:00:00.000Z",
  //     phoneNumber: "0922334455",
  //     gender: "Nữ",
  //     address: "Gia Lai",
  //     staffSpecialty: "Tai Mũi Họng",
  //     examinationDate: "2025-05-24T00:00:00.000Z",
  //     examinationTime: "10:40",
  //     description: "Ngứa mũi, hắt hơi liên tục",
  //     doctorCode: "NV1150",
  //     doctorName: "Đặng Thanh Hà",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a16",
  //     fullName: "Lâm Quốc Huy",
  //     email: "huy.lam@example.com",
  //     birthday: "1983-12-12T00:00:00.000Z",
  //     phoneNumber: "0944998877",
  //     gender: "Nam",
  //     address: "Thủ Đức, TP.HCM",
  //     staffSpecialty: "Hô hấp",
  //     examinationDate: "2025-05-25T00:00:00.000Z",
  //     examinationTime: "07:00",
  //     description: "Khó thở khi vận động",
  //     doctorCode: "NV1160",
  //     doctorName: "Đỗ Nhật Quang",
  //     status: "Đã khám",
  //   },
  //   {
  //     id: "a17",
  //     fullName: "Bùi Thị Hằng",
  //     email: "hang.bui@example.com",
  //     birthday: "1990-06-16T00:00:00.000Z",
  //     phoneNumber: "0955667788",
  //     gender: "Nữ",
  //     address: "Gò Vấp, TP.HCM",
  //     staffSpecialty: "Nội",
  //     examinationDate: "2025-05-25T00:00:00.000Z",
  //     examinationTime: "07:20",
  //     description: "Mệt mỏi, đau đầu nhẹ",
  //     doctorCode: "NV1170",
  //     doctorName: "Lê Hoàng Nam",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a18",
  //     fullName: "Nguyễn Quốc Anh",
  //     email: "anh.nguyen@example.com",
  //     birthday: "1996-10-10T00:00:00.000Z",
  //     phoneNumber: "0933445566",
  //     gender: "Nam",
  //     address: "Đà Lạt, Lâm Đồng",
  //     staffSpecialty: "Tim mạch",
  //     examinationDate: "2025-05-25T00:00:00.000Z",
  //     examinationTime: "07:40",
  //     description: "Tăng huyết áp",
  //     doctorCode: "NV1180",
  //     doctorName: "Phạm Minh Tuấn",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a19",
  //     fullName: "Trần Thị Như Ý",
  //     email: "nhuy.tran@example.com",
  //     birthday: "1998-02-02T00:00:00.000Z",
  //     phoneNumber: "0977558899",
  //     gender: "Nữ",
  //     address: "Phan Thiết, Bình Thuận",
  //     staffSpecialty: "Nhi",
  //     examinationDate: "2025-05-25T00:00:00.000Z",
  //     examinationTime: "08:00",
  //     description: "Ho khan kéo dài",
  //     doctorCode: "NV1190",
  //     doctorName: "Trần Thị Bích",
  //     status: "Chờ khám",
  //   },
  //   {
  //     id: "a20",
  //     fullName: "Đoàn Văn Quân",
  //     email: "quan.doan@example.com",
  //     birthday: "1989-05-05T00:00:00.000Z",
  //     phoneNumber: "0911778899",
  //     gender: "Nam",
  //     address: "Bình Thạnh, TP.HCM",
  //     staffSpecialty: "Ngoại",
  //     examinationDate: "2025-05-25T00:00:00.000Z",
  //     examinationTime: "08:20",
  //     description: "Chấn thương đầu gối",
  //     doctorCode: "NV1200",
  //     doctorName: "Võ Xuân Hạ",
  //     status: "Chờ khám",
  //   },
  // ];
};

// Xóa nhân viên
export const deleteAppointment = async (id) => {
  const response = await fetch(`${BACKEND_APPOINTMENT_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to delete appointment: ${error}`);
  }
};
