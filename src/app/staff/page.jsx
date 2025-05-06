import Box from "@mui/material/Box";
import StaffTable from "./components/StaffTable";

export default function Appointment() {
  return (
    <Box
      sx={{
        height: `calc(90vh - 100px - 16px)`,
        p: 2,
        mr: 2,
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StaffTable />
    </Box>
  );
}
