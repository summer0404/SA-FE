"use client";
import Box from "@mui/material/Box";
import Typograpy from "@mui/material/Typography";

import AddEmployee from "./AddEmployee/AddEmployee";
import Filter from "./Fiter/Filter";

function HeaderPage() {
  return (
    <Box
      sx={{
        height: "10%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typograpy
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          Staff
        </Typograpy>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <AddEmployee/>
        <Filter />
      </Box>
    </Box>
  );
}

export default HeaderPage;
