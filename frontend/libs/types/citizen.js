/*
|--------------------------------------------------------------------------
| Citizen Model Documentation
|--------------------------------------------------------------------------
| Purpose:
| - Describe citizen profile object.
|
| Includes:
| - clerkId
| - username
| - fullName
| - email
| - avatar
| - phone
| - address
| - complaintsCount
|--------------------------------------------------------------------------
*/

/**
 * Citizen profile object used across the Samadhan frontend.
 *
 * @typedef {Object} Citizen
 * @property {string} _id - MongoDB citizen ID.
 * @property {string} clerkId - Clerk authentication ID.
 * @property {string} username - Unique username.
 * @property {string} fullName - Citizen full name.
 * @property {string} email - Registered email address.
 * @property {string} avatar - Profile image URL.
 * @property {string} phone - Contact number.
 * @property {string} address - Residential address.
 * @property {number} complaintsCount - Total complaints submitted.
 *
 * @property {string} city
 * @property {string} state
 * @property {string} pincode
 * @property {boolean} isVerified
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Default citizen profile object.
 */
export const citizenModel = {
  _id: "",
  clerkId: "",
  username: "",
  fullName: "",
  email: "",
  avatar: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  complaintsCount: 0,
  isVerified: false,
  createdAt: "",
  updatedAt: "",
};

export default citizenModel;