/*
|--------------------------------------------------------------------------
| Application Demo / Mock Data
|--------------------------------------------------------------------------
| Reusable demo data for citizen, government, and department pages.
|--------------------------------------------------------------------------
*/

import { Clock3, AlertCircle, CheckCircle2, Trophy, MapPin, Activity, FileCheck2, Building2 } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Citizen Demo Data */
/* -------------------------------------------------------------------------- */

export const CITIZEN_REPORTS = [
  {
    id: "SAM-1024",
    title: "Broken street light",
    category: "Infrastructure",
    location: "Main Market Road",
    status: "UNDER_REVIEW",
    date: "28 Aug 2026",
    description: "The street light near the main market has not been working for several days.",
  },
  {
    id: "SAM-1018",
    title: "Garbage accumulation",
    category: "Sanitation",
    location: "Sector 4 Community Park",
    status: "ACCEPTED",
    date: "24 Aug 2026",
    description: "Garbage has accumulated near the entrance of the community park.",
  },
  {
    id: "SAM-1007",
    title: "Damaged road",
    category: "Roads",
    location: "University Road",
    status: "RESOLVED",
    date: "18 Aug 2026",
    description: "A large pothole was causing difficulty for vehicles and pedestrians.",
  },
  {
    id: "SAM-0998",
    title: "Blocked drainage",
    category: "Drainage",
    location: "Station Road",
    status: "SUBMITTED",
    date: "12 Aug 2026",
    description: "The drainage line appears to be blocked and water is accumulating.",
  },
];

export const REPORT_STATUS_CONFIG = {
  SUBMITTED: {
    label: "Submitted",
    icon: Clock3,
    className: "bg-slate-100 text-slate-600",
  },
  UNDER_REVIEW: {
    label: "Under review",
    icon: AlertCircle,
    className: "bg-amber-50 text-amber-700",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
    className: "bg-blue-50 text-blue-700",
  },
  RESOLVED: {
    label: "Resolved",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700",
  },
};

export const REPORT_DETAILS_MOCK = {
  "SAM-1024": {
    title: "Damaged Street Light",
    category: "Street Lighting",
    location: "Ward 12, Bhagalpur",
    reportedOn: "28 August 2026",
    department: "Municipal Electrical Department",
    status: "In Progress",
    description:
      "Street light near the main road is not working, creating visibility and safety problems for residents during the night.",
    updates: [
      {
        title: "Issue reported",
        description: "Your complaint was successfully submitted.",
        date: "28 Aug 2026",
        completed: true,
      },
      {
        title: "Issue verified",
        description: "The complaint was reviewed and verified.",
        date: "29 Aug 2026",
        completed: true,
      },
      {
        title: "Assigned to department",
        description:
          "The issue was assigned to the Municipal Electrical Department.",
        date: "29 Aug 2026",
        completed: true,
      },
      {
        title: "Work in progress",
        description:
          "The department is currently working on resolving the issue.",
        date: "30 Aug 2026",
        completed: true,
      },
      {
        title: "Resolved",
        description: "Waiting for the department to complete the repair.",
        date: "Pending",
        completed: false,
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* Dashboard Roles & Overview Data */
/* -------------------------------------------------------------------------- */

export const PORTAL_ROLES = [
  {
    title: "Citizen",
    description: "Report civic issues, upload evidence and track resolution progress.",
    href: "/citizen/dashboard",
    icon: "Users",
    color: "blue",
  },
  {
    title: "Government",
    description: "Create challenges, manage departments and monitor civic projects.",
    href: "/government/dashboard",
    icon: "ShieldCheck",
    color: "violet",
  },
  {
    title: "Department",
    description: "Handle assigned challenges, projects and implementation updates.",
    href: "/department/dashboard",
    icon: "Building2",
    color: "amber",
  },
  {
    title: "University",
    description: "Participate in civic challenges and build solutions with student teams.",
    href: "/university/dashboard",
    icon: "GraduationCap",
    color: "emerald",
  },
];

export const DASHBOARD_STATS = [
  {
    label: "Active Challenges",
    value: "128",
    change: "+12%",
    icon: Trophy,
  },
  {
    label: "Issues Reported",
    value: "2,486",
    change: "+18%",
    icon: MapPin,
  },
  {
    label: "Projects Running",
    value: "74",
    change: "+9%",
    icon: Activity,
  },
  {
    label: "Issues Resolved",
    value: "1,932",
    change: "+24%",
    icon: CheckCircle2,
  },
];

export const PLATFORM_ACTIVITIES = [
  {
    title: "New civic challenge launched",
    description: "Smart City Traffic Optimization",
    time: "12 min ago",
    icon: Trophy,
  },
  {
    title: "Issue resolved",
    description: "Street lighting problem · Ward 12",
    time: "38 min ago",
    icon: CheckCircle2,
  },
  {
    title: "University submission received",
    description: "Road Safety Analytics",
    time: "1 hour ago",
    icon: FileCheck2,
  },
  {
    title: "Challenge assigned",
    description: "Waste Management Department",
    time: "2 hours ago",
    icon: Building2,
  },
];

/* -------------------------------------------------------------------------- */
/* Government Demo Data */
/* -------------------------------------------------------------------------- */

export const GOVERNMENT_STATS = [
  {
    title: "Total Challenges",
    value: "128",
    change: "+12 this month",
    icon: "FileText",
  },
  {
    title: "Pending Review",
    value: "24",
    change: "Requires attention",
    icon: "Clock3",
  },
  {
    title: "Accepted",
    value: "67",
    change: "+8 this month",
    icon: "CheckCircle2",
  },
  {
    title: "Active Projects",
    value: "31",
    change: "Across departments",
    icon: "FolderKanban",
  },
];

export const GOVERNMENT_RECENT_CHALLENGES = [
  {
    id: "SAM-1024",
    title: "Broken street lights in residential area",
    department: "Public Works",
    status: "UNDER_REVIEW",
    submitted: "Today",
  },
  {
    id: "SAM-1021",
    title: "Garbage collection issue",
    department: "Sanitation",
    status: "SUBMITTED",
    submitted: "Yesterday",
  },
  {
    id: "SAM-1017",
    title: "Water supply disruption",
    department: "Water Department",
    status: "ACCEPTED",
    submitted: "2 days ago",
  },
  {
    id: "SAM-1011",
    title: "Damaged road near university",
    department: "Public Works",
    status: "ASSIGNED",
    submitted: "3 days ago",
  },
];

/* -------------------------------------------------------------------------- */
/* Department Demo Data */
/* -------------------------------------------------------------------------- */

export const DEPARTMENT_PROJECTS = [
  {
    name: "Smart Traffic Optimization",
    partner: "Tech Solutions Pvt. Ltd.",
    progress: 72,
  },
  {
    name: "Digital Grievance Platform",
    partner: "CivicTech India",
    progress: 48,
  },
  {
    name: "Waste Collection System",
    partner: "GreenTech Solutions",
    progress: 31,
  },
];
