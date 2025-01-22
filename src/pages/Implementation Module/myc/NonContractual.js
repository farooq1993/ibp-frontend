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

const NonContractual = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1); // Start from page 1
  const [rowsPerPage] = useState(10); // Fixed rows per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://pbsopenapi.finance.go.ug/graphql",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5pdGEiLCJzdWIiOjIsImlhdCI6MTczNzUxOTM4NCwiZXhwIjoxNzM3NjA1Nzg0fQ.xKLIFi6ZOdnIqoBbCuWi6-J5yhM5URnDP0xTUnX7WvM",
              "Content-Type": "application/json",
            },
            params: {
              query: `
                query {
                  cgIbpProjectBudgetAllocations {
                    Vote_Code
                    Project_Code
                    Item_Code
                    Description
                    GoU
                    ExtFin
                    Fiscal_Year
                  }
                }
              `,
            },
          }
        );

        const fetchedData = response.data.data.cgIbpProjectBudgetAllocations;
        setData(fetchedData || []);
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

  // Paginated data for the current page
  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
              <TableCell align="left">Vote Code</TableCell>
              <TableCell align="left">Project Code</TableCell>
              <TableCell align="left">Item Code</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">GOU</TableCell>
              <TableCell align="left">ExtFin</TableCell>
              <TableCell align="left">Fiscal Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.Vote_Code}</TableCell>
                  <TableCell align="left">{row.Project_Code}</TableCell>
                  <TableCell align="left">{row.Item_Code}</TableCell>
                  <TableCell align="left">{row.Description}</TableCell>
                  <TableCell align="left">{row.GoU}</TableCell>
                  <TableCell align="left">{row.ExtFin}</TableCell>
                  <TableCell align="left">{row.Fiscal_Year}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
