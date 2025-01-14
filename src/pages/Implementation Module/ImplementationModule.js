import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ImplementationModule = () => {
  const navigate = useNavigate();
  const buttonStyles = {
    padding: "5px 15px",
    backgroundColor: "rgb(255, 217, 151)",
    color: "black",
    "&:hover": {
      backgroundColor: "rgb(255, 217, 151)",
    },
    "&:active": {
      backgroundColor: "rgba(255, 217, 151, 0.7)",
    },
    transition: "background-color 0.2s ease",
  };

  // Sample data
  const rows = [
    {
      code: "00005-008",
      title: "retooling Uganda Coffee Development Project",
      submissionDate: "2025-10-12",
      status: "Draft",
    },
    {
      code: 2,
      title: "retooling Uganda Coffee Development Project",
      submissionDate: "In Progress",
    },
    { code: 3, title: "Module C", submissionDate: "Pending" },
  ];

  const handleShowClick = (code) => {
    navigate(`/implementation-module/${code}/costed-annualized-plan`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Implementation Module</h2>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Project Title</TableCell>
              <TableCell>Submission Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Phase</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.code}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.submissionDate}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleShowClick(row.code)}
                    size="small"
                    sx={buttonStyles}
                    startIcon={<VisibilityIcon />}
                  >
                    Show
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ImplementationModule;
