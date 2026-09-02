/*
|--------------------------------------------------------------------------
| Project Model Documentation
|--------------------------------------------------------------------------
| Purpose:
| - Describe project object used in Government & University modules.
|
| Includes:
| - id
| - title
| - challengeId
| - department
| - university
| - status
| - deadline
|--------------------------------------------------------------------------
*/

/**
 * Project object used across the Samadhan frontend.
 *
 * @typedef {Object} Project
 * @property {string} _id - MongoDB project ID.
 * @property {string} title - Project title.
 * @property {string} challengeId - Linked challenge ID.
 *
 * @property {Object} department
 * @property {string} department._id
 * @property {string} department.name
 *
 * @property {Object} university
 * @property {string} university._id
 * @property {string} university.name
 *
 * @property {"Proposed"|"Approved"|"In Progress"|"Completed"|"Rejected"} status
 * @property {string} description
 * @property {number} progress - Completion percentage (0–100).
 * @property {number} budget
 * @property {string[]} teamMembers
 * @property {string} deadline - ISO date string.
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Default project object.
 */
export const projectModel = {
  _id: "",
  title: "",
  challengeId: "",

  department: {
    _id: "",
    name: "",
  },

  university: {
    _id: "",
    name: "",
  },

  status: "Proposed",
  description: "",
  progress: 0,
  budget: 0,
  teamMembers: [],
  deadline: "",
  createdAt: "",
  updatedAt: "",
};

export default projectModel;