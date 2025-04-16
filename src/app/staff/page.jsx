import Box from "@mui/material/Box";
import HeaderPage from "./HeaderPage/HeaderPage";
import BodyPage from "./BodyPage/BodyPage";
import StaffTable from "./Table/StaffTable";

function page() {
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
      <HeaderPage />
      <BodyPage />
    </Box>
  );
}

export default page;
