import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Contractual = () => {
  return (
    <div>
      <TableContainer
        className="shadow-sm"
        component={Paper}
        sx={{ boxShadow: "none" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Contract Reference Number</TableCell>
              <TableCell sx={{ padding: 0 }}>Contract Name</TableCell>
              <TableCell sx={{ padding: 0 }}>Name of Contractor</TableCell>
              <TableCell sx={{ padding: 0 }}>
                Contract Start Date (FY)
              </TableCell>
              <TableCell sx={{ padding: 0 }}>Contract End Date (FY)</TableCell>
              <TableCell sx={{ padding: 0 }}>
                Contract Value GOU (UGX)
              </TableCell>
              <TableCell sx={{ padding: 0 }}>
                Contract Value External (UGX)
              </TableCell>
              <TableCell sx={{ padding: 0 }}>
                Annual Penalty Interest Rate (%)
              </TableCell>
              <TableCell sx={{ padding: 0 }}>Contract Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* Contract Reference Number */}
              <TableCell sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
              {/* Contract Name */}
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
              {/* Name of Contractor */}
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
              {/* Contract Start Date */}
              <TableCell align="right" sx={{ padding: 1 }}>
                <Select
                  size="small"
                  fullWidth
                  variant="outlined"
                  defaultValue="FY2026/27"
                >
                  <MenuItem value="FY2026/27">FY2026/27</MenuItem>
                  <MenuItem value="FY2025/26">FY2025/26</MenuItem>
                </Select>
              </TableCell>
              {/* Contract End Date */}
              <TableCell align="right" sx={{ padding: 1 }}>
                <Select
                  size="small"
                  fullWidth
                  variant="outlined"
                  defaultValue="FY2026/27"
                >
                  <MenuItem value="FY2026/27">FY2026/27</MenuItem>
                  <MenuItem value="FY2025/26">FY2025/26</MenuItem>
                </Select>
              </TableCell>
              {/* Contract Value GOU */}
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  size="small"
                />
              </TableCell>
              {/* Contract Value External */}
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  size="small"
                />
              </TableCell>
              {/* Annual Penalty Interest Rate */}
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  size="small"
                />
              </TableCell>
              {/* Contract Status */}
              <TableCell align="right" sx={{ padding: 1 }}>
                <Select
                  size="small"
                  fullWidth
                  variant="outlined"
                  defaultValue=""
                >
                  <MenuItem value="Ongoing">Ongoing</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Contractual;
