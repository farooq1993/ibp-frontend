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

const Procurement = () => {
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
              <TableCell>Procurement Ref. No.</TableCell>
              <TableCell sx={{ padding: 1, width: "15%" }}>
                Description of Procurement
              </TableCell>
              <TableCell sx={{ padding: 1, width: "25%" }}>
                Category of Procurement
              </TableCell>
              <TableCell sx={{ padding: 1 }}>Stage of Procurement</TableCell>
              <TableCell sx={{ padding: 1 }}>
                Estimated Contract Value (UGX)
              </TableCell>
              <TableCell sx={{ padding: 1, width: "15%" }}>
                Source of Financing
              </TableCell>
              <TableCell sx={{ padding: 1, width: "15%" }}>
                Estimated Commencement Date
              </TableCell>
              <TableCell sx={{ padding: 1, width: "10%" }}>
                Estimated Contract End Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <Select size="small" fullWidth variant="outlined">
                  <MenuItem value="Works">Works</MenuItem>
                  <MenuItem value="Supplies">Supplies</MenuItem>
                  <MenuItem value="Consultancy">Consultancy</MenuItem>
                  <MenuItem value="Non-Consultancy-Services">
                    Non-Consultancy-Services
                  </MenuItem>
                </Select>
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <Select size="small" fullWidth variant="outlined">
                  <MenuItem value="Initiations">Initiations</MenuItem>
                  <MenuItem value="Bidding">Bidding</MenuItem>
                  <MenuItem value="Evaluation">Evaluation</MenuItem>
                  <MenuItem value="Award and Contract Signing">
                    Award and Contract Signing
                  </MenuItem>
                </Select>
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <Select size="small" fullWidth variant="outlined">
                  <MenuItem value="Government of Uganda">
                    Government of Uganda
                  </MenuItem>
                  <MenuItem value="External Financing">
                    External Financing
                  </MenuItem>
                </Select>
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <Select size="small" fullWidth variant="outlined">
                  <MenuItem value="FY2026/27">FY2026/27</MenuItem>
                  <MenuItem value="FY2025/26">FY2025/26</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <Select size="small" fullWidth variant="outlined">
                  <MenuItem value="FY2026/27">FY2026/27</MenuItem>
                  <MenuItem value="FY2025/26">FY2025/26</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h3 className="p-3">Annual pipeline procurement cost</h3>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Estimated contract value (UGX)</TableCell>
              <TableCell sx={{ padding: 1, width: "15%" }}>
                FY2021/22 (UGX)
              </TableCell>
              <TableCell sx={{ padding: 1, width: "25%" }}>
                FY2022/23 (UGX)
              </TableCell>
              <TableCell sx={{ padding: 1 }}>FY2023/24 (UGX)</TableCell>
              <TableCell sx={{ padding: 1 }}>FY2024/25 (UGX)</TableCell>
              <TableCell sx={{ padding: 1, width: "15%" }}>
                FY2025/26 (UGX)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ padding: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{ backgroundColor: "#f4f4f4" }}
                />
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
              <TableCell align="right" sx={{ padding: 1 }}>
                <TextField fullWidth variant="outlined" size="small" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Procurement;
