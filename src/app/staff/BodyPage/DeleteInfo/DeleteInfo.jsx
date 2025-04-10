import Tooltip from "@mui/material/Tooltip";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function DeleteInfo() {
  return (
    <Tooltip title="Remove" arrow>
      <PersonRemoveIcon
        sx={{
          backgroundColor: "#CA79C6",
          padding: "10px",
          fontSize: "3rem",
          borderRadius: "10%",
          color: "white",
          cursor: "pointer",
          "&:hover": {
            color: "black",
          },
        }}
      />
    </Tooltip>
  );
}

export default DeleteInfo
