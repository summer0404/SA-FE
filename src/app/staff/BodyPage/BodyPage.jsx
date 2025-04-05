import Box from "@mui/material/Box";
import EditInfo from "./EditInfo/EditInfo";

function BodyPage() {
  return (
    <Box
      sx={{
        height: "90%", // Adjusted height to 20% for the first box
        overflowY: "auto",
      }}
    >
      <EditInfo />
    </Box>
  );
}

export default BodyPage;
