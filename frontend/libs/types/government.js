/*
|--------------------------------------------------------------------------
| Government Dashboard Model
|--------------------------------------------------------------------------
| Purpose:
| - Dashboard analytics response structure.
|
| Includes:
| - totalComplaints
| - resolvedComplaints
| - pendingComplaints
| - departments
| - activeProjects
| - activeChallenges
|--------------------------------------------------------------------------
*/

/**
 * Government dashboard object used across the Samadhan frontend.
 *
 * @typedef {Object} GovernmentDashboard
 *
 * @property {number} totalComplaints
 * @property {number} resolvedComplaints
 * @property {number} pendingComplaints
 * @property {number} inProgressComplaints
 *
 * @property {Object[]} departments
 * @property {string} departments[]._id
 * @property {string} departments[].name
 * @property {number} departments[].complaints
 * @property {number} departments[].resolved
 * @property {number} departments[].pending
 *
 * @property {number} activeProjects
 * @property {number} completedProjects
 * @property {number} activeChallenges
 * @property {number} registeredUniversities
 * @property {number} industryPartners
 *
 * @property {Object} analytics
 * @property {number} analytics.resolutionRate
 * @property {number} analytics.averageResolutionDays
 * @property {number} analytics.citizenParticipation
 */

/**
 * Default government dashboard object.
 */
export const governmentDashboardModel = {
  totalComplaints: 0,
  resolvedComplaints: 0,
  pendingComplaints: 0,
  inProgressComplaints: 0,

  departments: [],

  activeProjects: 0,
  completedProjects: 0,
  activeChallenges: 0,
  registeredUniversities: 0,
  industryPartners: 0,

  analytics: {
    resolutionRate: 0,
    averageResolutionDays: 0,
    citizenParticipation: 0,
  },
};

export default governmentDashboardModel;