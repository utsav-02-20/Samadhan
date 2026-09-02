/*
|--------------------------------------------------------------------------
| Upload Service
|--------------------------------------------------------------------------
| Purpose:
| - Upload complaint images using multipart/form-data.
| - Return uploaded image URLs.
|--------------------------------------------------------------------------
*/

"use client";

import apiClient from "../api/client";
import API_ENDPOINTS from "../api/endpoint";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/* -------------------------------------------------------------------------- */
/* Validation */
/* -------------------------------------------------------------------------- */

function validateImage(file) {
  if (!file) {
    throw new Error("Please select an image.");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WEBP images are allowed.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image size must be less than 5 MB.");
  }
}

/* -------------------------------------------------------------------------- */
/* Upload Single Image */
/* -------------------------------------------------------------------------- */

/**
 * Upload a single complaint image.
 * @param {File} file
 * @returns {Promise<string>} Uploaded image URL
 */
export async function uploadComplaintImage(file) {
  validateImage(file);

  const formData = new FormData();
  formData.append("image", file);

  try {
    const { data } = await apiClient.post(
      API_ENDPOINTS.COMMON.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data.imageUrl || data.url;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/* -------------------------------------------------------------------------- */
/* Upload Multiple Images */
/* -------------------------------------------------------------------------- */

/**
 * Upload multiple complaint images.
 * @param {File[]} files
 * @returns {Promise<string[]>} Array of uploaded image URLs
 */
export async function uploadComplaintImages(files = []) {
  if (!files.length) return [];

  files.forEach(validateImage);

  const uploads = files.map((file) => uploadComplaintImage(file));
  return Promise.all(uploads);
}

export default {
  uploadComplaintImage,
  uploadComplaintImages,
};