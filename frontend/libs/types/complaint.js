/*
|--------------------------------------------------------------------------
| Complaint Model Documentation
|--------------------------------------------------------------------------
| Purpose:
| - Describe complaint object structure used across frontend.
|
| Includes:
| - id
| - title
| - description
| - category
| - images
| - location
| - status
| - priority
| - upvotes
| - createdAt
| - citizen
|--------------------------------------------------------------------------
*/

/**
 * Complaint object used across the Samadhan frontend.
 *
 * @typedef {Object} Complaint
 * @property {string} _id - MongoDB complaint ID.
 * @property {string} title - Complaint title.
 * @property {string} description - Complaint description.
 * @property {string} category - Complaint category.
 * @property {string[]} images - Uploaded complaint image URLs.
 *
 * @property {Object} location
 * @property {string} location.address
 * @property {number} location.latitude
 * @property {number} location.longitude
 *
 * @property {"Pending"|"Assigned"|"In Progress"|"Resolved"|"Rejected"} status
 * @property {"Low"|"Medium"|"High"|"Critical"} priority
 * @property {number} upvotes
 *
 * @property {Object} citizen
 * @property {string} citizen._id
 * @property {string} citizen.username
 * @property {string} citizen.fullName
 * @property {string} citizen.avatar
 *
 * @property {string} department
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Default complaint object.
 */
export const complaintModel = {
  _id: "",
  title: "",
  description: "",
  category: "",
  images: [],
  location: {
    address: "",
    latitude: null,
    longitude: null,
  },
  status: "Pending",
  priority: "Medium",
  upvotes: 0,
  citizen: {
    _id: "",
    username: "",
    fullName: "",
    avatar: "",
  },
  department: "",
  createdAt: "",
  updatedAt: "",
};

export default complaintModel;