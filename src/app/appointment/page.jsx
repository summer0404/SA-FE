import AppointmentTable from "./components/AppointmentTable";
import Box from "@mui/material/Box";

export default function Appointment() {
  return (
    <Box
      sx={{
        height: `calc(90vh - 100px - 16px)`, //100px for header, 16px for margin
        p: 2,
        mr: 2,
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppointmentTable />
    </Box>
  );
}
