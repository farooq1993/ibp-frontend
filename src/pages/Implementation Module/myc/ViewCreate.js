import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const ViewCreate = ({ activeTab, handleTabChange }) => {
  return (
    <div className="ViewCreate">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
        }}
      >
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="CONTRACTUAL OBLIGATIONS" />
          <Tab label="ARREARS" />
          <Tab label="PROCUREMENT" />
        </Tabs>
      </Box>
    </div>
  );
};

export default ViewCreate;
