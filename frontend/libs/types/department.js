/*
|--------------------------------------------------------------------------
| Department Dashboard Model
|--------------------------------------------------------------------------
| Purpose:
| - Department response structure.
|
| Includes:
| - departmentInfo
| - assignedComplaints
| - projects
| - analytics
|--------------------------------------------------------------------------
*/

/**
 * Department dashboard object used across the Samadhan frontend.
 *
 * @typedef {Object} DepartmentDashboard
 *
 * @property {Object} departmentInfo
 * @property {string} departmentInfo._id
 * @property {string} departmentInfo.name
 * @property {string} departmentInfo.code
 * @property {string} departmentInfo.head
 * @property {string} departmentInfo.email
 *
 * @property {Complaint[]} assignedComplaints
 * @property {Object[]} projects
 *
 * @property {Object} analytics
 * @property {number} analytics.totalComplaints
 * @property {number} analytics.pendingComplaints
 * @property {number} analytics.inProgressComplaints
 * @property {number} analytics.resolvedComplaints
 * @property {number} analytics.totalProjects
 * @property {number} analytics.activeProjects
 * @property {number} analytics.completedProjects
 * @property {number} analytics.averageResolutionDays
 */

/**
 * Default department dashboard object.
 */
export const departmentDashboardModel = {
  departmentInfo: {
    _id: "",
    name: "",
    code: "",
    head: "",
    email: "",
  },

  assignedComplaints: [],

  projects: [],

  analytics: {
    totalComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    averageResolutionDays: 0,
  },
};

export default departmentDashboardModel;