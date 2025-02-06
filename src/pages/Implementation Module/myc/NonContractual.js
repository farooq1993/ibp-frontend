import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const NonContractual = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  // Function to login and fetch access_token
  const login = async () => {
    try {
      const response = await axios.post(
        "https://pbsopenapi.finance.go.ug/graphql",
        {
          query: `
            mutation {
              login(
                data: {
                  User_Name: "Nita",
                  Password: "Nita1290W",
                  ipAddress: "192.168.5.0"
                }
              ) {
                access_token
                refresh_token
              }
            }
          `,
        }
      );
      setAccessToken(response.data.data.login.access_token);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const fetchData = async () => {
    if (!accessToken) return;
    try {
      const response = await axios.post(
        "https://pbsopenapi.finance.go.ug/graphql",
        {
          query: `
            query {
              cgIbpProjectBudgetAllocations {
                Vote_Code
                Vote_Name
                Project_Code
                Project_Name
                Programme_Code
                Programme_Name
                Description
                GoU
                ExtFin
                GoUArrears
                BudgetStage
                Fiscal_Year
              }
            }
          `,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const fetchedData = response.data.data.cgIbpProjectBudgetAllocations;

      // Remove duplicates
      const uniqueData = removeDuplicates(fetchedData);
      setData(uniqueData || []);
      setFilteredData(uniqueData || []);
      setTotalPages(Math.ceil(uniqueData.length / rowsPerPage));
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false); // Turn off loading once data is fetched
    }
  };

  // Remove duplicates based on Project_Code
  const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      const identifier = item.Project_Code;
      if (seen.has(identifier)) {
        return false;
      }
      seen.add(identifier);
      return true;
    });
  };

  useEffect(() => {
    if (!accessToken) {
      login(); // Call login to fetch access token
    } else {
      fetchData(); // Fetch data once access_token is available
    }
  }, [accessToken]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

    const filtered = data.filter((row) =>
      Object.values(row).some((value) =>
        value
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );

    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / rowsPerPage));
    setPage(1); // Reset to page 1 on search
  };

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const tableHeaderStyle = {
    fontWeight: "bold",
    backgroundColor: "#ffd997",
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box>
          <b>{filteredData.length}</b>{" "}
          {filteredData.length === 1 ? "result" : "results"} found
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginBottom: 2, flexBasis: "100%" }}
          />
        </Box>
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
              <TableCell sx={tableHeaderStyle} align="left">
                Vote Code
              </TableCell>
              <TableCell sx={tableHeaderStyle} align="left">
                Vote Name
              </TableCell>
              <TableCell sx={tableHeaderStyle} align="left">
                Project Code
              </TableCell>
              <TableCell sx={tableHeaderStyle} align="left">
                Project Name
              </TableCell>
              <TableCell sx={tableHeaderStyle} align="left">
                Programme Code
              </TableCell>
              <TableCell sx={tableHeaderStyle} align="left">
                Programme Name
              </TableCell>
              <TableCell sx={tableHeaderStyle} align="left">
                Description
              </TableCell>
              <TableCell sx={tableHeaderStyle} align="left">
                GOU
              </TableCell>
              <TableCell sx={tableHeaderStyle} align="left">
                GOU Arrears
              </TableCell>
              <TableCell sx={tableHeaderStyle} align="left">
                ExtFin
              </TableCell>
              <TableCell sx={tableHeaderStyle} align="left">
                Fiscal Year
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  <CircularProgress sx={{ color: "#772303" }} />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={15} align="center">
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.Vote_Code}</TableCell>
                  <TableCell align="left">{row.Vote_Name}</TableCell>
                  <TableCell align="left">{row.Project_Code}</TableCell>
                  <TableCell align="left">{row.Project_Name}</TableCell>
                  <TableCell align="left">{row.Programme_Code}</TableCell>
                  <TableCell align="left">{row.Programme_Name}</TableCell>
                  <TableCell align="left">{row.Description}</TableCell>
                  <TableCell align="left">
                    {new Intl.NumberFormat().format(row.GoU)}
                  </TableCell>
                  <TableCell align="left">
                    {new Intl.NumberFormat().format(row.GoUArrears)}
                  </TableCell>
                  <TableCell align="left">
                    {new Intl.NumberFormat().format(row.ExtFin)}
                  </TableCell>
                  <TableCell align="left">{row.Fiscal_Year}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={15} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "end", padding: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </div>
  );
};

export default NonContractual;
