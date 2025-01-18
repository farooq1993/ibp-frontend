import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import CostedAnnualizedPlan from "../CostedAnnualizedPlan";
import ImplementationModule from "../ImplementationModule";
import Contractual from "./Contractual";

const ViewJob = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
};


  return (
    <div className="ViewJob">
      <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "white" }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab
            label="CONTRACTUAL"
          />
          <Tab
            label="NON CONTRACTUAL"
          />
          <Tab
            label="COUNTERPART"
          />
          <Tab
            label="ADDITIONAL MYC INFORMATION"
          />
        </Tabs>
      </Box>
      <Box sx={{ padding: 0 }}>
        {activeTab === 0 && (
          <Contractual />
        )}
        {activeTab === 1 && "No data from PBS"}
        {activeTab === 2 && "No data from AMP"}
        {activeTab === 3 && "Hello"}
      </Box>
    </div>
  );
};

export default ViewJob;
