import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Card, CardContent, IconButton, Typography } from "@mui/material";

const CostedAnnualizedPlan = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const cards = [
    { id: 1, title: "Cost Annualised Plan" },
    { id: 2, title: "Project Management Tool Kit" },
    { id: 3, title: "Multiyear Commitments (MYC)" },
    { id: 4, title: "Appeal Change Request" },
  ];

  const cardStyles = {
    height: "150px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    ":hover": {
      transform: "scale(1.03)",
    },
  };

  const editButtonStyles = {
    position: "absolute",
    top: "10px",
    right: "10px",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out",
    ":hover": {
      opacity: 1,
    },
  };

  // Function to handle "edit" button click and navigate to the edit page
  const handleEditClick = (cardId) => {
    // Navigate to the edit page, include the cardId and code in the URL
    navigate(`/implementation-module/create/${cardId}`);
  };

  return (
    <div className="bg-white p-4 rounded-sm shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        Retooling Uganda Coffee Development Project
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            sx={{
              ...cardStyles,
              "&:hover .edit-button": {
                opacity: 1,
              },
            }}
          >
            <CardContent>
              <AssignmentIcon fontSize="large" />
              <Typography
                variant="body1"
                sx={{ marginTop: "8px", textAlign: "center" }}
              >
                {card.title}
              </Typography>
            </CardContent>
            <IconButton
              className="edit-button"
              sx={{ ...editButtonStyles }}
              aria-label="edit"
              onClick={() => handleEditClick(card.id)} 
            >
              <EditIcon />
            </IconButton>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CostedAnnualizedPlan;
