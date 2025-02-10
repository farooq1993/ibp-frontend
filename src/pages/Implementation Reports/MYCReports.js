import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

const MYCReports = () => {
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
          "https://farooqa.pythonanywhere.com/add_myc/multi_year_commitment"
        );
        setAllProjects(response.data);
        console.log(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Define the styles for the TableCell headers
  const tableHeaderStyle = {
    fontWeight: "bold",
    backgroundColor: "#ffd997",
  };

  return (
    <div>
      <h2 className="text-xl p-2  mb-4">MYC Reports</h2>
      <Box sx={{ overflowX: "hidden", width: "100%" }}>
        <TableContainer
          component={Paper}
          elevation={0}
          variant="outlined"
          sx={{ maxHeight: 540, overflow: "auto", position: "relative" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderStyle}>Vote Code</TableCell>
                <TableCell sx={tableHeaderStyle}>Vote Name</TableCell>
                <TableCell sx={tableHeaderStyle}>Project Start Date</TableCell>
                <TableCell sx={tableHeaderStyle}>Project Name</TableCell>
                <TableCell sx={tableHeaderStyle}>Project End Date</TableCell>
                <TableCell sx={tableHeaderStyle}>Project Code</TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Project Classification
                </TableCell>
                <TableCell sx={tableHeaderStyle}>Programme Name</TableCell>
                <TableCell sx={tableHeaderStyle}>Programme Code</TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Non contractual commitments
                </TableCell>
                <TableCell sx={tableHeaderStyle}>MTEF ceilings</TableCell>
                <TableCell sx={tableHeaderStyle}>FY 1 MYC</TableCell>
                <TableCell sx={tableHeaderStyle}>Funding Source</TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Counterpart Financing Plan
                </TableCell>
                <TableCell sx={tableHeaderStyle}>Currency</TableCell>
                <TableCell sx={tableHeaderStyle}>Counterpart Value</TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Counterpart requirement specification
                </TableCell>
                <TableCell sx={tableHeaderStyle}>Contract Value</TableCell>
                <TableCell sx={tableHeaderStyle}>Contract Terms</TableCell>
                <TableCell sx={tableHeaderStyle}>Contract Status</TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Contract Payment Plan
                </TableCell>
                <TableCell sx={tableHeaderStyle}>Contract End Date</TableCell>
                <TableCell sx={tableHeaderStyle}>Contract Start Date</TableCell>
                <TableCell sx={tableHeaderStyle}>Name of Contractor</TableCell>
                <TableCell sx={tableHeaderStyle}>Contract Name</TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Contract Implementation Plan
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Contract Expenditures
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Contract Reference Number
                </TableCell>
                <TableCell sx={tableHeaderStyle}>Arrears 6 months +</TableCell>
                <TableCell sx={tableHeaderStyle}>Arrears Payment</TableCell>
                <TableCell sx={tableHeaderStyle}>Unverified Arrears</TableCell>
                <TableCell sx={tableHeaderStyle}>Verified Arrears</TableCell>
                <TableCell sx={tableHeaderStyle}>Arrears</TableCell>
                <TableCell sx={tableHeaderStyle}>Approved Payments</TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Annual Appropriations
                </TableCell>
                <TableCell sx={tableHeaderStyle}>
                  Financing Agreement Title
                </TableCell>
                <TableCell sx={tableHeaderStyle}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={13} align="center">
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
                  <TableRow key={project.id}>
                    <TableCell>{project.vote_code}</TableCell>
                    <TableCell>{project.vote_name}</TableCell>
                    <TableCell>{project.project_start_date}</TableCell>
                    <TableCell>{project.project_name}</TableCell>
                    <TableCell>{project.project_end_date}</TableCell>
                    <TableCell>{project.project_code}</TableCell>
                    <TableCell>{project.project_classification}</TableCell>
                    <TableCell>{project.programme_name}</TableCell>
                    <TableCell>{project.programme_code}</TableCell>
                    <TableCell>{project.non_contractual_commitments}</TableCell>
                    <TableCell>{project.mtef_ceilings}</TableCell>
                    <TableCell>{project.fy_1_myc}</TableCell>
                    <TableCell>{project.funding_source}</TableCell>
                    <TableCell>{project.counterpart_financing_plan}</TableCell>
                    <TableCell>{project.currency}</TableCell>
                    <TableCell>{project.counterpart_value}</TableCell>
                    <TableCell>
                      {project.counterpart_requirement_specification}
                    </TableCell>
                    <TableCell>{project.contract_value}</TableCell>
                    <TableCell>{project.contract_terms}</TableCell>
                    <TableCell>{project.contract_status}</TableCell>
                    <TableCell>{project.contract_payment_plan}</TableCell>
                    <TableCell>{project.contract_end_date}</TableCell>
                    <TableCell>{project.contract_start_date}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{project.contract_name}</TableCell>
                    <TableCell>
                      {project.contract_implementation_plan}
                    </TableCell>
                    <TableCell>{project.contract_expenditures}</TableCell>
                    <TableCell>{project.contract_reference_number}</TableCell>
                    <TableCell>{project.arrears_6_months_plus}</TableCell>
                    <TableCell>{project.arrears_payment}</TableCell>
                    <TableCell>{project.unverified_arrears}</TableCell>
                    <TableCell>{project.verified_arrears}</TableCell>
                    <TableCell>{project.arrears}</TableCell>
                    <TableCell>{project.approved_payments}</TableCell>
                    <TableCell>{project.annual_appropriations}</TableCell>
                    <TableCell>{project.financing_agreement_title}</TableCell>
                    <TableCell>
                      <Link to={`/edit/${project.id}`}>
                        <Button
                          size="small"
                          sx={buttonStyles}
                          startIcon={<CreateIcon />}
                        >
                          Edit
                        </Button>
                      </Link>
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
      </Box>
    </div>
  );
};

export default MYCReports;
