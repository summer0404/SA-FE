import Box from "@mui/material/Box";
import EditInfo from "./EditInfo/EditInfo";
import DeleteInfo from "./DeleteInfo/DeleteInfo";
import StaffTable from "../Table/StaffTable";

function BodyPage() {
  return (
    <Box
      sx={{
        height: "90%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          display: "flex",
          alignItems: "center",
          gap: 2,
          zIndex: 10,
        }}
      >
        <EditInfo />
        <DeleteInfo />
      </Box>

      <Box
        sx={{
          mt: 10,
          height: "calc(90% - 10px)", // Adjust height as needed
          overflowY: "auto",
        }}
      >
        <StaffTable />
      </Box>
    </Box>
  );
}

export default BodyPage;
