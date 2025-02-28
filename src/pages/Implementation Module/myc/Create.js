import React, { useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Contractual from "./Contractual";
import NonContractual from "./NonContractual";
import ButtonMui from "../../../components/mui-component/ButtonMui"

const ViewJob = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate(); // Hook to navigate between pages

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleBackClick = () => {
    // Navigate to the previous page
    navigate(-1); // Equivalent to browser back
  };

  const handleSubmitClick = () => {
    // Logic for Submit button
    console.log("Submit button clicked");
  };

  const renderButtons = () => (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        justifyContent: "flex-end",
        marginTop: 2,
        padding: "0",
      }}
    >
      <Button variant="outlined" color="danger" onClick={handleBackClick}>
        Back
      </Button>
      <ButtonMui variant="contained" color="primary" onClick={handleSubmitClick}>
        Submit
      </ButtonMui>
    </Box>
  );

  return (
    <div className="ViewJob">
      {/* Tabs Header */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#ffd977", // Customize active tab indicator color
            },
            "& .MuiTab-root": {
              color: "#000", // Default color for all tabs
              "&.Mui-selected": {
                color: "#000", // Color for the selected tab
              },
            },
          }}
        >
          <Tab label="CONTRACTUAL" />
          <Tab label="NON CONTRACTUAL" />
          <Tab label="COUNTERPART" />
          <Tab label="ADDITIONAL MYC INFORMATION" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ padding: 2 }}>
        {activeTab === 0 && (
          <>
            <Contractual />
            {renderButtons()}
          </>
        )}
        {activeTab === 1 && (
          <>
            <NonContractual />
            {renderButtons()}
          </>
        )}
        {activeTab === 2 && (
          <>
            <div>No data from AMP</div>
            {renderButtons()}
          </>
        )}
        {activeTab === 3 && (
          <>
            <div>Hello</div>
            {renderButtons()}
          </>
        )}
      </Box>
    </div>
  );
};

export default ViewJob;
