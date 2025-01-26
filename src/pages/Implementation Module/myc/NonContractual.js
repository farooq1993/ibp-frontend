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
import Button from "@mui/material/Button";

const NonContractual = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1); // Start from page 1
  const [rowsPerPage] = useState(10); // Fixed rows per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages

  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredData, setFilteredData] = useState([]); // Store filtered data

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://pbsopenapi.finance.go.ug/graphql",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5pdGEiLCJzdWIiOjIsImlhdCI6MTczNzg3ODgwMCwiZXhwIjoxNzM3OTY1MjAwfQ.KeGdmVue5JP6JgtzPUWzgnb1kET0zPj9aiYU-BIO7xg",
              "Content-Type": "application/json",
            },
            params: {
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
          }
        );

        const fetchedData = response.data.data.cgIbpProjectBudgetAllocations;
        setData(fetchedData || []);
        setFilteredData(fetchedData || []);
        setTotalPages(Math.ceil(fetchedData.length / rowsPerPage));
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rowsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value); // Set the new page number
  };

  // Handle the search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Perform the search when the button is clicked or Enter is pressed
  const handleSearch = () => {
    const filtered = data.filter((row) => {
      // Loop through each field in the row and check if any value matches the search query
      return Object.values(row).some((value) => {
        // Convert value to string and check if it includes the search query
        return value
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    });

    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / rowsPerPage)); // Update total pages
    setPage(1); // Reset to page 1 when search is performed
  };

  // Clear the search and reset to original data
  const handleClear = () => {
    setSearchQuery(""); // Clear the search input
    setFilteredData(data); // Reset filtered data to original
    setTotalPages(Math.ceil(data.length / rowsPerPage)); // Reset total pages
    setPage(1); // Reset to page 1
  };

  // Paginated data for the current page
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Define the styles for the TableCell headers
  const tableHeaderStyle = {
    fontWeight: "bold",
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
        {/* Results Section */}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(); // Trigger search on Enter key press
            }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ marginBottom: 2 }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              onClick={handleClear}
              sx={{ marginBottom: 2 }}
              color="error"
            >
              Clear
            </Button>
          </Box>
        </Box>
      </Box>

      <TableContainer
        className="shadow-sm"
        component={Paper}
        sx={{ boxShadow: "none", maxWidth: "100%", overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                <TableCell colSpan={15} align="center">
                  <CircularProgress />
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
        <Box sx={{ display: "flex", justifyContent: "end", padding: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default NonContractual;
