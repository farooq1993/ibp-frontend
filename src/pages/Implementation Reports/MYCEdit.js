import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import ButtonMui from "../../components/mui-component/ButtonMui";
import Loader from "../../components/Loader";

const MYCEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `https://farooqa.pythonanywhere.com/add_myc/multi_year_commitment?id=${id}`
        );

        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        if (!data) {
          setFormData({});
          setInitialData({});
          setLoading(false);
          return;
        }

        // Format date fields
        const formatDate = (dateString) => {
          return dateString
            ? new Date(dateString).toISOString().split("T")[0]
            : "";
        };

        const formattedData = {
          ...data,
          contract_start_date: formatDate(data.contract_start_date),
          contract_end_date: formatDate(data.contract_end_date),
          project_start_date: formatDate(data.project_start_date),
          project_end_date: formatDate(data.project_end_date),
        };

        setFormData(formattedData);
        setInitialData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project data.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" && value.trim() !== "" ? parseFloat(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    if (!id) {
      setError("Invalid ID");
      return;
    }

    // Select only the updated fields
    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialData[key]) {
        updatedFields[key] = formData[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      setSuccessMessage("No changes detected.");
      setUpdating(false);
      return;
    }

    try {
      const response = await axios.patch(
        `https://farooqa.pythonanywhere.com/add_myc/multi_year_commitment/${id}`,
        updatedFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      setSuccessMessage("Form updated successfully! 🎉");
      setError(null);
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error(
        "Error updating project:",
        error.response ? error.response.data : error
      );
      setError("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    // Navigate to the previous page
    navigate(-1); // Equivalent to browser back
  };

  return (
    <Box>
      <h2 className="text-xl p-2  mb-4">Edit MYC Report</h2>

      {successMessage && (
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="success"
          className="mb-4"
        >
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert
          icon={<ErrorOutline fontSize="inherit" />}
          severity="error"
          className="mb-4"
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <Loader fullScreen />
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Financing Agreement Title */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Financing Agreement Title"
                name="financing_agreement_title"
                value={formData.financing_agreement_title || ""}
                onChange={handleInputChange}
                error={Boolean(errors.financing_agreement_title)}
                helperText={errors.financing_agreement_title}
                size="small"
                fullWidth
              />

              <TextField
                label="Annual Appropriations"
                name="annual_appropriations"
                type="number"
                value={formData.annual_appropriations || ""}
                onChange={handleInputChange}
                error={Boolean(errors.annual_appropriations)}
                helperText={errors.annual_appropriations}
                size="small"
                fullWidth
              />
              <TextField
                label="Approved Payments"
                name="approved_payments"
                type="number"
                value={formData.approved_payments || ""}
                onChange={handleInputChange}
                error={Boolean(errors.approved_payments)}
                helperText={errors.approved_payments}
                size="small"
                fullWidth
              />
            </Stack>

            {/* Arrears Fields */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Arrears"
                name="arrears"
                type="number"
                value={formData.arrears || ""}
                onChange={handleInputChange}
                error={Boolean(errors.arrears)}
                helperText={errors.arrears}
                size="small"
                fullWidth
              />
              <TextField
                label="Verified Arrears"
                name="verified_arrears"
                type="number"
                value={formData.verified_arrears || ""}
                onChange={handleInputChange}
                error={Boolean(errors.verified_arrears)}
                helperText={errors.verified_arrears}
                size="small"
                fullWidth
              />
              <TextField
                label="Unverified Arrears"
                name="unverified_arrears"
                type="number"
                value={formData.unverified_arrears || ""}
                onChange={handleInputChange}
                error={Boolean(errors.unverified_arrears)}
                helperText={errors.unverified_arrears}
                size="small"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Arrears Payment"
                name="arrears_payment"
                type="number"
                value={formData.arrears_payment || ""}
                onChange={handleInputChange}
                error={Boolean(errors.arrears_payment)}
                helperText={errors.arrears_payment}
                size="small"
                fullWidth
              />

              <TextField
                label="Arrears 6 Months Plus"
                name="arrears_6_months_plus"
                type="number"
                value={formData.arrears_6_months_plus || ""}
                onChange={handleInputChange}
                error={Boolean(errors.arrears_6_months_plus)}
                helperText={errors.arrears_6_months_plus}
                size="small"
                fullWidth
              />
              <TextField
                label="Contract Reference Number"
                name="contract_reference_number"
                value={formData.contract_reference_number || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contract_reference_number)}
                helperText={errors.contract_reference_number}
                size="small"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Contract Expenditures"
                name="contract_expenditures"
                type="number"
                value={formData.contract_expenditures || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contract_expenditures)}
                helperText={errors.contract_expenditures}
                size="small"
                fullWidth
              />
              <TextField
                label="Contract Implementation Plan"
                name="contract_implementation_plan"
                value={formData.contract_implementation_plan || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contract_implementation_plan)}
                helperText={errors.contract_implementation_plan}
                size="small"
                fullWidth
                multiline
                rows={4}
              />
              <TextField
                label="Contract Name"
                name="contract_name"
                value={formData.contract_name || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contract_name)}
                helperText={errors.contract_name}
                size="small"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Contractor Name"
                name="contractor_name"
                value={formData.contractor_name || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contractor_name)}
                helperText={errors.contractor_name}
                size="small"
                fullWidth
              />
              <TextField
                label="Contract Start Date"
                name="contract_start_date"
                type="date"
                value={formData.contract_start_date || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contract_start_date)}
                helperText={errors.contract_start_date}
                slotProps={{ inputLabel: { shrink: true } }}
                size="small"
                fullWidth
              />
              <TextField
                label="Contract End Date"
                name="contract_end_date"
                type="date"
                value={formData.contract_end_date || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contract_end_date)}
                helperText={errors.contract_end_date}
                slotProps={{ inputLabel: { shrink: true } }}
                size="small"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Contract Payment Plan"
                name="contract_payment_plan"
                value={formData.contract_payment_plan || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contract_payment_plan)}
                helperText={errors.contract_payment_plan}
                size="small"
                fullWidth
                multiline
                rows={2}
              />
              <TextField
                label="Contract Status"
                name="contract_status"
                value={formData.contract_status || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contract_status)}
                helperText={errors.contract_status}
                size="small"
                fullWidth
              />
              <TextField
                label="Contract Terms"
                name="contract_terms"
                value={formData.contract_terms || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contract_terms)}
                helperText={errors.contract_terms}
                size="small"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Contract Value"
                name="contract_value"
                type="number"
                value={formData.contract_value || ""}
                onChange={handleInputChange}
                error={Boolean(errors.contract_value)}
                helperText={errors.contract_value}
                size="small"
                fullWidth
              />

              {/* Counterpart Details */}
              <TextField
                label="Counterpart Requirement Specification"
                name="counterpart_requirement_specification"
                value={formData.counterpart_requirement_specification || ""}
                onChange={handleInputChange}
                error={Boolean(errors.counterpart_requirement_specification)}
                helperText={errors.counterpart_requirement_specification}
                size="small"
                fullWidth
              />
              <TextField
                label="Counterpart Value"
                name="counterpart_value"
                type="number"
                value={formData.counterpart_value || ""}
                onChange={handleInputChange}
                error={Boolean(errors.counterpart_value)}
                helperText={errors.counterpart_value}
                size="small"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Currency"
                name="currency"
                value={formData.currency || ""}
                onChange={handleInputChange}
                error={Boolean(errors.currency)}
                helperText={errors.currency}
                size="small"
                fullWidth
              />
              <TextField
                label="Counterpart Financing Plan"
                name="counterpart_financing_plan"
                value={formData.counterpart_financing_plan || ""}
                onChange={handleInputChange}
                error={Boolean(errors.counterpart_financing_plan)}
                helperText={errors.counterpart_financing_plan}
                size="small"
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Funding Source"
                name="funding_source"
                value={formData.funding_source || ""}
                onChange={handleInputChange}
                error={Boolean(errors.funding_source)}
                helperText={errors.funding_source}
                size="small"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="FY 1 MYC"
                name="fy_1_myc"
                type="number"
                value={formData.fy_1_myc || ""}
                onChange={handleInputChange}
                error={Boolean(errors.fy_1_myc)}
                helperText={errors.fy_1_myc}
                size="small"
                fullWidth
              />
              <TextField
                label="MTEF Ceilings"
                name="mtef_ceilings"
                type="number"
                value={formData.mtef_ceilings || ""}
                onChange={handleInputChange}
                error={Boolean(errors.mtef_ceilings)}
                helperText={errors.mtef_ceilings}
                size="small"
                fullWidth
              />
              <TextField
                label="Non Contractual Commitments"
                name="non_contractual_commitments"
                value={formData.non_contractual_commitments || ""}
                onChange={handleInputChange}
                error={Boolean(errors.non_contractual_commitments)}
                helperText={errors.non_contractual_commitments}
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            </Stack>

            {/* Programme and Project Details */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Programme Code"
                name="programme_code"
                value={formData.programme_code || ""}
                onChange={handleInputChange}
                error={Boolean(errors.programme_code)}
                helperText={errors.programme_code}
                size="small"
                fullWidth
              />
              <TextField
                label="Programme Name"
                name="programme_name"
                value={formData.programme_name || ""}
                onChange={handleInputChange}
                error={Boolean(errors.programme_name)}
                helperText={errors.programme_name}
                size="small"
                fullWidth
              />
              <TextField
                label="Project Classification"
                name="project_classification"
                value={formData.project_classification || ""}
                onChange={handleInputChange}
                error={Boolean(errors.project_classification)}
                helperText={errors.project_classification}
                size="small"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Project Code"
                name="project_code"
                value={formData.project_code || ""}
                onChange={handleInputChange}
                error={Boolean(errors.project_code)}
                helperText={errors.project_code}
                size="small"
                fullWidth
              />
              <TextField
                label="Project Start Date"
                name="project_start_date"
                type="date"
                value={formData.project_start_date || ""}
                onChange={handleInputChange}
                error={Boolean(errors.project_start_date)}
                helperText={errors.project_start_date}
                slotProps={{ inputLabel: { shrink: true } }}
                size="small"
                fullWidth
              />
              <TextField
                label="Project End Date"
                name="project_end_date"
                type="date"
                value={formData.project_end_date || ""}
                onChange={handleInputChange}
                error={Boolean(errors.project_end_date)}
                helperText={errors.project_end_date}
                slotProps={{ inputLabel: { shrink: true } }}
                size="small"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Project Name"
                name="project_name"
                value={formData.project_name || ""}
                onChange={handleInputChange}
                error={Boolean(errors.project_name)}
                helperText={errors.project_name}
                size="small"
                fullWidth
              />

              <TextField
                label="Vote Code"
                name="vote_code"
                value={formData.vote_code || ""}
                onChange={handleInputChange}
                error={Boolean(errors.vote_code)}
                helperText={errors.vote_code}
                size="small"
                fullWidth
              />
              <TextField
                label="Vote Name"
                name="vote_name"
                value={formData.vote_name || ""}
                onChange={handleInputChange}
                error={Boolean(errors.vote_name)}
                helperText={errors.vote_name}
                size="small"
                fullWidth
              />
            </Stack>

            {/* Submit Button */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent={"flex-end"}
            >
              <Button
                variant="outlined"
                color="danger"
                onClick={handleBackClick}
              >
                Back
              </Button>
              <ButtonMui onClick={handleSubmit} type="submit">
                Update
              </ButtonMui>
            </Stack>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default MYCEdit;
