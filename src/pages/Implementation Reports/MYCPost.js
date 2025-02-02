import React, { useState } from "react";
import axios from "axios";
import {
  Paper,
  TextField,
  Button,
  Stack,
  Box,
  Typography,
} from "@mui/material";

const MYCPost = () => {
  // Initialize state for all form fields.
  const [formData, setFormData] = useState({
    financing_agreement_title: "",
    annual_appropriations: "",
    approved_payments: "",
    arrears: "",
    verified_arrears: "",
    unverified_arrears: "",
    arrears_payment: "",
    arrears_6_months_plus: "",
    contract_reference_number: "",
    contract_expenditures: "",
    contract_implementation_plan: "",
    contract_name: "",
    contractor_name: "",
    contract_start_date: "",
    contract_end_date: "",
    contract_payment_plan: "",
    contract_status: "",
    contract_terms: "",
    contract_value: "",
    counterpart_requirement_specification: "",
    counterpart_value: "",
    currency: "",
    counterpart_financing_plan: "",
    funding_source: "",
    fy_1_myc: "",
    mtef_ceilings: "",
    non_contractual_commitments: "",
    programme_code: "",
    programme_name: "",
    project_classification: "",
    project_code: "",
    project_end_date: "",
    project_name: "",
    project_start_date: "",
    vote_code: "",
    vote_name: "",
  });
  // State to hold errors for each field.
  const [errors, setErrors] = useState({});

  // Update state on input change and clear errors for the field.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Remove error when the user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate that all fields are filled. Returns an object with errors.
  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });
    return newErrors;
  };

  // Submit form data via POST request.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      // If there are errors, do not submit and set error state.
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes.
    setErrors({});

    // Convert number fields appropriately.
    const payload = {
      ...formData,
      annual_appropriations: Number(formData.annual_appropriations),
      approved_payments: Number(formData.approved_payments),
      arrears: Number(formData.arrears),
      verified_arrears: Number(formData.verified_arrears),
      unverified_arrears: Number(formData.unverified_arrears),
      arrears_payment: Number(formData.arrears_payment),
      arrears_6_months_plus: Number(formData.arrears_6_months_plus),
      contract_expenditures: Number(formData.contract_expenditures),
      contract_value: Number(formData.contract_value),
      counterpart_value: Number(formData.counterpart_value),
      fy_1_myc: Number(formData.fy_1_myc),
      mtef_ceilings: Number(formData.mtef_ceilings),
    };

    try {
      const response = await axios.post(
        "https://farooqa.pythonanywhere.com/add_myc/multi_year_commitment",
        payload
      );
      console.log("Response:", response.data);
      // Optionally, clear the form or display a success message.
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "white", padding: 2 }}>
      <h2 className="text-2xl font-semibold mb-4">MYC Reports</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Financing Agreement Title */}
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Financing Agreement Title"
              name="financing_agreement_title"
              value={formData.financing_agreement_title}
              onChange={handleChange}
              error={Boolean(errors.financing_agreement_title)}
              helperText={errors.financing_agreement_title}
              size="small"
              fullWidth
            />

            <TextField
              label="Annual Appropriations"
              name="annual_appropriations"
              type="number"
              value={formData.annual_appropriations}
              onChange={handleChange}
              error={Boolean(errors.annual_appropriations)}
              helperText={errors.annual_appropriations}
              size="small"
              fullWidth
            />
            <TextField
              label="Approved Payments"
              name="approved_payments"
              type="number"
              value={formData.approved_payments}
              onChange={handleChange}
              error={Boolean(errors.approved_payments)}
              helperText={errors.approved_payments}
              size="small"
              fullWidth
            />
          </Stack>

          {/* Arrears Fields */}
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Arrears"
              name="arrears"
              type="number"
              value={formData.arrears}
              onChange={handleChange}
              error={Boolean(errors.arrears)}
              helperText={errors.arrears}
              size="small"
              fullWidth
            />
            <TextField
              label="Verified Arrears"
              name="verified_arrears"
              type="number"
              value={formData.verified_arrears}
              onChange={handleChange}
              error={Boolean(errors.verified_arrears)}
              helperText={errors.verified_arrears}
              size="small"
              fullWidth
            />
            <TextField
              label="Unverified Arrears"
              name="unverified_arrears"
              type="number"
              value={formData.unverified_arrears}
              onChange={handleChange}
              error={Boolean(errors.unverified_arrears)}
              helperText={errors.unverified_arrears}
              size="small"
              fullWidth
            />
          </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Arrears Payment"
              name="arrears_payment"
              type="number"
              value={formData.arrears_payment}
              onChange={handleChange}
              error={Boolean(errors.arrears_payment)}
              helperText={errors.arrears_payment}
              size="small"
              fullWidth
            />

            <TextField
              label="Arrears 6 Months Plus"
              name="arrears_6_months_plus"
              type="number"
              value={formData.arrears_6_months_plus}
              onChange={handleChange}
              error={Boolean(errors.arrears_6_months_plus)}
              helperText={errors.arrears_6_months_plus}
              size="small"
              fullWidth
            />
            <TextField
              label="Contract Reference Number"
              name="contract_reference_number"
              value={formData.contract_reference_number}
              onChange={handleChange}
              error={Boolean(errors.contract_reference_number)}
              helperText={errors.contract_reference_number}
              size="small"
              fullWidth
            />
          </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Contract Expenditures"
              name="contract_expenditures"
              type="number"
              value={formData.contract_expenditures}
              onChange={handleChange}
              error={Boolean(errors.contract_expenditures)}
              helperText={errors.contract_expenditures}
              size="small"
              fullWidth
            />
            <TextField
              label="Contract Implementation Plan"
              name="contract_implementation_plan"
              value={formData.contract_implementation_plan}
              onChange={handleChange}
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
              value={formData.contract_name}
              onChange={handleChange}
              error={Boolean(errors.contract_name)}
              helperText={errors.contract_name}
              size="small"
              fullWidth
            />
          </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Contractor Name"
              name="contractor_name"
              value={formData.contractor_name}
              onChange={handleChange}
              error={Boolean(errors.contractor_name)}
              helperText={errors.contractor_name}
              size="small"
              fullWidth
            />
            <TextField
              label="Contract Start Date"
              name="contract_start_date"
              type="date"
              value={formData.contract_start_date}
              onChange={handleChange}
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
              value={formData.contract_end_date}
              onChange={handleChange}
              error={Boolean(errors.contract_end_date)}
              helperText={errors.contract_end_date}
              slotProps={{ inputLabel: { shrink: true } }}
              size="small"
              fullWidth
            />
          </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Contract Payment Plan"
              name="contract_payment_plan"
              value={formData.contract_payment_plan}
              onChange={handleChange}
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
              value={formData.contract_status}
              onChange={handleChange}
              error={Boolean(errors.contract_status)}
              helperText={errors.contract_status}
              size="small"
              fullWidth
            />
            <TextField
              label="Contract Terms"
              name="contract_terms"
              value={formData.contract_terms}
              onChange={handleChange}
              error={Boolean(errors.contract_terms)}
              helperText={errors.contract_terms}
              size="small"
              fullWidth
            />
          </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Contract Value"
              name="contract_value"
              type="number"
              value={formData.contract_value}
              onChange={handleChange}
              error={Boolean(errors.contract_value)}
              helperText={errors.contract_value}
              size="small"
              fullWidth
            />

            {/* Counterpart Details */}
            <TextField
              label="Counterpart Requirement Specification"
              name="counterpart_requirement_specification"
              value={formData.counterpart_requirement_specification}
              onChange={handleChange}
              error={Boolean(errors.counterpart_requirement_specification)}
              helperText={errors.counterpart_requirement_specification}
              size="small"
              fullWidth
            />
            <TextField
              label="Counterpart Value"
              name="counterpart_value"
              type="number"
              value={formData.counterpart_value}
              onChange={handleChange}
              error={Boolean(errors.counterpart_value)}
              helperText={errors.counterpart_value}
              size="small"
              fullWidth
            />
          </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              error={Boolean(errors.currency)}
              helperText={errors.currency}
              size="small"
              fullWidth
            />
            <TextField
              label="Counterpart Financing Plan"
              name="counterpart_financing_plan"
              value={formData.counterpart_financing_plan}
              onChange={handleChange}
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
              value={formData.funding_source}
              onChange={handleChange}
              error={Boolean(errors.funding_source)}
              helperText={errors.funding_source}
              size="small"
              fullWidth
            />
          </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="FY 1 MYC"
              name="fy_1_myc"
              type="number"
              value={formData.fy_1_myc}
              onChange={handleChange}
              error={Boolean(errors.fy_1_myc)}
              helperText={errors.fy_1_myc}
              size="small"
              fullWidth
            />
            <TextField
              label="MTEF Ceilings"
              name="mtef_ceilings"
              type="number"
              value={formData.mtef_ceilings}
              onChange={handleChange}
              error={Boolean(errors.mtef_ceilings)}
              helperText={errors.mtef_ceilings}
              size="small"
              fullWidth
            />
            <TextField
              label="Non Contractual Commitments"
              name="non_contractual_commitments"
              value={formData.non_contractual_commitments}
              onChange={handleChange}
              error={Boolean(errors.non_contractual_commitments)}
              helperText={errors.non_contractual_commitments}
              size="small"
              fullWidth
              multiline
              rows={3}
            />
          </Stack>

          {/* Programme and Project Details */}
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Programme Code"
              name="programme_code"
              value={formData.programme_code}
              onChange={handleChange}
              error={Boolean(errors.programme_code)}
              helperText={errors.programme_code}
              size="small"
              fullWidth
            />
            <TextField
              label="Programme Name"
              name="programme_name"
              value={formData.programme_name}
              onChange={handleChange}
              error={Boolean(errors.programme_name)}
              helperText={errors.programme_name}
              size="small"
              fullWidth
            />
            <TextField
              label="Project Classification"
              name="project_classification"
              value={formData.project_classification}
              onChange={handleChange}
              error={Boolean(errors.project_classification)}
              helperText={errors.project_classification}
              size="small"
              fullWidth
            />
          </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Project Code"
              name="project_code"
              value={formData.project_code}
              onChange={handleChange}
              error={Boolean(errors.project_code)}
              helperText={errors.project_code}
              size="small"
              fullWidth
            />
            <TextField
              label="Project Start Date"
              name="project_start_date"
              type="date"
              value={formData.project_start_date}
              onChange={handleChange}
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
              value={formData.project_end_date}
              onChange={handleChange}
              error={Boolean(errors.project_end_date)}
              helperText={errors.project_end_date}
              slotProps={{ inputLabel: { shrink: true } }}
              size="small"
              fullWidth
            />
          </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Project Name"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              error={Boolean(errors.project_name)}
              helperText={errors.project_name}
              size="small"
              fullWidth
            />

            <TextField
              label="Vote Code"
              name="vote_code"
              value={formData.vote_code}
              onChange={handleChange}
              error={Boolean(errors.vote_code)}
              helperText={errors.vote_code}
              size="small"
              fullWidth
            />
            <TextField
              label="Vote Name"
              name="vote_name"
              value={formData.vote_name}
              onChange={handleChange}
              error={Boolean(errors.vote_name)}
              helperText={errors.vote_name}
              size="small"
              fullWidth
            />
          </Stack>

          {/* Submit Button */}
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default MYCPost;
