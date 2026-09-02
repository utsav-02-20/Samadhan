/*
|--------------------------------------------------------------------------
| Frontend Validation Helpers
|--------------------------------------------------------------------------
| Purpose:
| - Validate complaint form.
| - Validate profile form.
| - Validate challenge form.
|--------------------------------------------------------------------------
*/

import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "./constants";

/* -------------------------------------------------------------------------- */
/* Helpers */
/* -------------------------------------------------------------------------- */

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  String(value).trim() === "";

/* -------------------------------------------------------------------------- */
/* Complaint Form Validation */
/* -------------------------------------------------------------------------- */

export function validateComplaintForm(form) {
  const errors = {};

  if (isEmpty(form.title)) {
    errors.title = "Complaint title is required.";
  } else if (form.title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters.";
  }

  if (isEmpty(form.description)) {
    errors.description = "Complaint description is required.";
  } else if (form.description.trim().length < 15) {
    errors.description = "Description must be at least 15 characters.";
  }

  if (isEmpty(form.category)) {
    errors.category = "Please select a category.";
  }

  if (isEmpty(form.location?.address)) {
    errors.location = "Complaint location is required.";
  }

  if (Array.isArray(form.images)) {
    const invalidImage = form.images.find(
      (file) =>
        file.size > MAX_IMAGE_SIZE ||
        !ALLOWED_IMAGE_TYPES.includes(file.type)
    );

    if (invalidImage) {
      errors.images =
        "Images must be JPG, PNG, or WEBP and under 5 MB.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/* -------------------------------------------------------------------------- */
/* Profile Form Validation */
/* -------------------------------------------------------------------------- */

export function validateProfileForm(form) {
  const errors = {};

  if (isEmpty(form.fullName)) {
    errors.fullName = "Full name is required.";
  }

  if (isEmpty(form.username)) {
    errors.username = "Username is required.";
  } else if (!/^[a-zA-Z0-9_.]{3,20}$/.test(form.username)) {
    errors.username =
      "Username must be 3–20 characters and contain only letters, numbers, _ or .";
  }

  if (isEmpty(form.email)) {
    errors.email = "Email is required.";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (
    form.phone &&
    !/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, ""))
  ) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }

  if (isEmpty(form.address)) {
    errors.address = "Address is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/* -------------------------------------------------------------------------- */
/* Challenge Form Validation */
/* -------------------------------------------------------------------------- */

export function validateChallengeForm(form) {
  const errors = {};

  if (isEmpty(form.title)) {
    errors.title = "Challenge title is required.";
  }

  if (isEmpty(form.description)) {
    errors.description = "Challenge description is required.";
  } else if (form.description.trim().length < 20) {
    errors.description =
      "Description must be at least 20 characters.";
  }

  if (isEmpty(form.category)) {
    errors.category = "Please select a category.";
  }

  if (isEmpty(form.department)) {
    errors.department = "Department is required.";
  }

  if (!form.reward || Number(form.reward) <= 0) {
    errors.reward = "Reward must be greater than 0.";
  }

  if (isEmpty(form.deadline)) {
    errors.deadline = "Deadline is required.";
  } else if (new Date(form.deadline) <= new Date()) {
    errors.deadline = "Deadline must be a future date.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export default {
  validateComplaintForm,
  validateProfileForm,
  validateChallengeForm,
};