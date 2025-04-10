import Box from "@mui/material/Box";
import EditInfo from "./EditInfo/EditInfo";
import DeleteInfo from "./DeleteInfo/DeleteInfo";

function BodyPage() {
  return (
    <Box
      sx={{
        height: "90%", // Adjusted height to 20% for the first box
        overflowY: "auto",
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <EditInfo />
        <DeleteInfo />
      </Box>
    </Box>
  );
}

export default BodyPage;
