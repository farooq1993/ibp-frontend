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
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  const tableHeaderStyle = {
    fontWeight: "bold",
    backgroundColor: "#ffd997",
  };

  // 🔹 Export to Excel Function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(allProjects);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
    XLSX.writeFile(workbook, "Projects.xlsx");
  };

  // 🔹 Export to PDF Function
  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a3",
      compress: true,
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Implementation Module - Project List", 14, 15);

    const tableColumn = [
      "Code",
      "Id",
      "Project Title",
      "Submission Date",
      "Status",
      "Programs",
      "Title",
    ];

    const tableRows = allProjects.map((project) => [
      project.code,
      project.id,
      project.title,
      project.start_date,
      project.status,
      project.programs,
      project.title,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
        4: { cellWidth: "auto" },
        5: { cellWidth: "auto" },
        6: { cellWidth: "auto" },
      },
      margin: { top: 20, left: 10, right: 10, bottom: 10 },
      tableWidth: "auto",
      horizontalPageBreak: true,
    });

    doc.save("Implementation_Module_Projects.pdf");
  };

  return (
    <div>
      <h2 className="text-xl p-2  mb-4">Implementation Module</h2>
      {/* Export Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{
            backgroundColor: "rgb(19, 131, 47)", // Background color
            color: "white", // Text color (white)
            "&:hover": {
              backgroundColor: "rgb(19, 131, 47)", // Keeps the background color the same on hover
            },
            "&:active": {
              backgroundColor: "rgba(19, 131, 47, 0.7)", // Light opacity when clicked
            },
            transition: "background-color 0.2s ease", // Smooth transition for background color
          }}
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
        <Button
          sx={{
            backgroundColor: "rgb(196, 50, 50)", // Background color
            color: "white", // Text color (white)
            "&:hover": {
              backgroundColor: "rgb(196, 50, 50)", // Keeps the background color the same on hover
            },
            "&:active": {
              backgroundColor: "rgba(196, 50, 50, 0.7)", // Light opacity when clicked
            },
            transition: "background-color 0.2s ease", // Smooth transition for background color
          }}
          onClick={exportToPDF}
        >
          Export to PDF
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        elevation={0}
        variant="outlined"
        sx={{ maxHeight: 500, overflow: "auto", position: "relative" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeaderStyle}>Code</TableCell>
              <TableCell sx={tableHeaderStyle}>Id</TableCell>
              <TableCell sx={tableHeaderStyle}>Project Title</TableCell>
              <TableCell sx={tableHeaderStyle}>Submission Date</TableCell>
              <TableCell sx={tableHeaderStyle}>Status</TableCell>
              <TableCell sx={tableHeaderStyle}>Programs</TableCell>
              <TableCell sx={tableHeaderStyle}>Title</TableCell>
              <TableCell sx={tableHeaderStyle}>Action</TableCell>
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
