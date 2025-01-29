import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ImplementationModule = () => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://farooqa.pythonanywhere.com/project_add/getAllProject"
        );
        setAllProjects(response.data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
              <TableCell>Id</TableCell>
              <TableCell>Project Title</TableCell>
              <TableCell>Submission Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Programs</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={15} align="center">
                  <CircularProgress sx={{ color: "#772303" }} />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {error}
                </TableCell>
              </TableRow>
            ) : allProjects.length > 0 ? (
              allProjects.map((project) => (
                <TableRow key={project.code}>
                  <TableCell>{project.code}</TableCell>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.start_date}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>{project.programs}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleShowClick(project.code)}
                      size="small"
                      sx={buttonStyles}
                      startIcon={<VisibilityIcon />}
                    >
                      Show
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No projects available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ImplementationModule;
