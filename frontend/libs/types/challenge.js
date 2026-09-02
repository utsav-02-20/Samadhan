/*
|--------------------------------------------------------------------------
| Challenge Model Documentation
|--------------------------------------------------------------------------
| Purpose:
| - Describe challenge object.
|
| Includes:
| - title
| - description
| - category
| - difficulty
| - department
| - reward
| - deadline
|--------------------------------------------------------------------------
*/

/**
 * Challenge object used across the Samadhan frontend.
 *
 * @typedef {Object} Challenge
 * @property {string} _id - MongoDB challenge ID.
 * @property {string} title - Challenge title.
 * @property {string} description - Detailed challenge description.
 * @property {string} category - Challenge category (Roads, Water, Health, etc.).
 * @property {"Easy"|"Medium"|"Hard"} difficulty - Difficulty level.
 * @property {string} department - Assigned government department ID or name.
 * @property {number} reward - Reward or funding amount.
 * @property {string} deadline - Submission deadline (ISO date string).
 *
 * @property {"Open"|"Assigned"|"In Progress"|"Completed"|"Closed"} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Default challenge object.
 */
export const challengeModel = {
  _id: "",
  title: "",
  description: "",
  category: "",
  difficulty: "Medium",
  department: "",
  reward: 0,
  deadline: "",
  status: "Open",
  createdAt: "",
  updatedAt: "",
};

export default challengeModel;