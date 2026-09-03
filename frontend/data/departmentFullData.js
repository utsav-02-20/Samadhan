/*
|--------------------------------------------------------------------------
| Department Full Mock Data (Profile & Accepted Projects)
|--------------------------------------------------------------------------
| File: data/departmentFullData.js
| Purpose: Provides baseline structured data for Department Identity, Profile,
| Contact Details, Statistics, Officers, Activity Log, and Accepted Projects.
|--------------------------------------------------------------------------
*/

export const INITIAL_DEPARTMENT_PROFILE = {
  // 1. Department Identity (Read-only system fields + Editable Logo)
  id: "DEPT-PWD-JH-01",
  name: "Public Works Department (PWD)",
  logo: "/logo.png",
  governmentBody: "State Government of Jharkhand",
  type: "Infrastructure & Civil Engineering",
  jurisdiction: "Ranchi & South Chota Nagpur Division",
  verificationBadge: "VERIFIED_OFFICIAL",
  isVerified: true,
  createdDate: "15 Jan 2024",
  lastUpdatedDate: "02 Sep 2026",

  // 2. Department Information (Editable: Description, Responsibilities, Categories)
  description:
    "Responsible for planning, construction, and maintenance of public infrastructure, roads, bridges, and government buildings across Jharkhand district sectors.",
  primaryResponsibilities: [
    "Construction and maintenance of state highways & major district roads",
    "Civic infrastructure repair and pothole resolution",
    "Public building maintenance and structural safety audits",
    "Collaboration with technical universities for smart infrastructure projects"
  ],
  serviceCategories: [
    "Roads & Highways",
    "Bridges & Flyovers",
    "Public Infrastructure",
    "Disaster Structural Repair"
  ],
  establishedDate: "15 Nov 2000",

  // 3. Contact Information (Editable: Email, Phone, Address, Website, Hours)
  contact: {
    officialEmail: "pwd.support@jharkhand.gov.in",
    officialPhone: "+91 651 2400123",
    officeAddress: "Engineers Hostel Road, Sector 3, Dhurwa, Ranchi, Jharkhand 834004",
    officialWebsite: "https://pwd.jharkhand.gov.in",
    workingHours: "Monday – Saturday: 09:30 AM – 05:30 PM (Closed on Public Holidays)"
  },

  // 4. Department Statistics (Read-Only Analytics)
  stats: {
    totalComplaintsReceived: 1248,
    activeComplaints: 24,
    resolvedComplaints: 1184,
    escalatedComplaints: 40,
    resolutionRate: "94.8%",
    avgResolutionTimeDays: 3.4
  },

  // 5. University Collaboration Summary (Read-Only)
  collaborationSummary: {
    acceptedProjects: 8,
    projectsInProgress: 5,
    completedProjects: 12,
    pendingProjectReviews: 3,
    rejectedProjects: 2
  },

  // 6. Officers & Team
  officers: [
    {
      id: "OFF-101",
      name: "Er. Rajiv Mehra",
      designation: "Chief Engineer (Roads)",
      role: "Head of Department",
      email: "rajiv.mehra@jharkhand.gov.in",
      phone: "+91 94311 00123",
      availability: "AVAILABLE" // AVAILABLE | ON_FIELD | ON_LEAVE
    },
    {
      id: "OFF-102",
      name: "Er. Sunita Soren",
      designation: "Executive Engineer",
      role: "SLA & University Project Supervisor",
      email: "sunita.soren@jharkhand.gov.in",
      phone: "+91 94311 00124",
      availability: "ON_FIELD"
    },
    {
      id: "OFF-103",
      name: "Er. Amit Kumar Gupta",
      designation: "Assistant Engineer",
      role: "Civic Grievance Nodal Officer",
      email: "amit.gupta@jharkhand.gov.in",
      phone: "+91 94311 00125",
      availability: "AVAILABLE"
    }
  ],

  // 7. Activity Timeline
  activityTimeline: [
    {
      id: "ACT-901",
      title: "Accepted University Collaboration Proposal",
      detail: "Approved BIT Mesra's proposal for AI Automated Pothole Scanner.",
      type: "PROJECT_ACCEPTANCE",
      timestamp: "02 Sep 2026"
    },
    {
      id: "ACT-902",
      title: "Complaint Resolution Milestone Met",
      detail: "Resolved SAM-1007 (University Road Asphalt Repair).",
      type: "COMPLAINT_RESOLVED",
      timestamp: "31 Aug 2026"
    },
    {
      id: "ACT-903",
      title: "Field Crew Assigned",
      detail: "Assigned Executive Engineer Sunita Soren to Bariatu Drainage inspection.",
      type: "ASSIGNMENT",
      timestamp: "29 Aug 2026"
    }
  ]
};

export const ACCEPTED_UNIVERSITY_PROJECTS = [
  {
    id: "PROJ-UNI-001",
    title: "AI Automated Pothole Detection & Repair Mapping",
    university: "BIT Mesra (Dept. of Computer Science & Civil Eng.)",
    leadResearcher: "Dr. Ananya Sharma & Team",
    acceptedDate: "15 Aug 2026",
    targetCompletion: "30 Nov 2026",
    budgetGranted: "₹18,50,000",
    status: "IN_PROGRESS", // IN_PROGRESS | COMPLETED | REVIEW_PENDING
    progressPercentage: 65,
    deliverables: [
      { name: "Camera Sensor Hardware Mount", status: "COMPLETED" },
      { name: "YOLOv8 Edge Computer Model", status: "COMPLETED" },
      { name: "GIS Map Dashboard Integration", status: "IN_PROGRESS" },
      { name: "Field Pilot on Main Highway", status: "PENDING" }
    ],
    abstract: "Mountable camera kit for municipal maintenance vehicles that automatically tags road cracks and potholes on a real-time GIS map."
  },
  {
    id: "PROJ-UNI-002",
    title: "Eco-Friendly Recycled Plastic Asphalt Blend Pilot",
    university: "IIT (ISM) Dhanbad",
    leadResearcher: "Prof. R. K. Mahato",
    acceptedDate: "01 Jul 2026",
    targetCompletion: "15 Dec 2026",
    budgetGranted: "₹25,00,000",
    status: "IN_PROGRESS",
    progressPercentage: 45,
    deliverables: [
      { name: "Material Testing & Tensile Audit", status: "COMPLETED" },
      { name: "500m Test Road Patching", status: "IN_PROGRESS" },
      { name: "Monsoon Durability Test", status: "PENDING" }
    ],
    abstract: "Polymerized bitumen blend utilizing single-use shredded plastic waste to enhance road lifespan by 40% during heavy rains."
  },
  {
    id: "PROJ-UNI-003",
    title: "Smart Culvert Water Level Telemetry",
    university: "NIT Jamshedpur",
    leadResearcher: "Dr. V. K. Singh",
    acceptedDate: "10 May 2026",
    targetCompletion: "20 Aug 2026",
    budgetGranted: "₹12,00,000",
    status: "COMPLETED",
    progressPercentage: 100,
    deliverables: [
      { name: "Ultrasonic Water Level Sensor", status: "COMPLETED" },
      { name: "GSM Flood Alert Gateway", status: "COMPLETED" },
      { name: "Final Department Handover", status: "COMPLETED" }
    ],
    abstract: "Early-warning telemetry grid for low-lying urban culverts to alert control rooms during flash flooding."
  }
];

export const PENDING_DEPARTMENT_PROJECTS = [
  {
    id: "DEP-UNI-101",
    title: "Smart Streetlight Fault Detection",
    university: "NIT Jamshedpur",
    leadResearcher: "Dr. Priya Singh",
    budgetGranted: "₹9,50,000",
    status: "REVIEW_PENDING",
    progressPercentage: 0,
    acceptedDate: "",
    targetCompletion: "30 Dec 2026",
    abstract: "IoT-based fault alerting for city streetlights with automatic maintenance ticket routing.",
    deliverables: [
      { name: "Proposal Review", status: "PENDING" },
      { name: "Field Pilot Plan", status: "PENDING" },
    ],
  },
  {
    id: "DEP-UNI-102",
    title: "Drainage Overflow Prediction Model",
    university: "BIT Mesra",
    leadResearcher: "Dr. Ananya Sharma",
    budgetGranted: "₹11,00,000",
    status: "REVIEW_PENDING",
    progressPercentage: 0,
    acceptedDate: "",
    targetCompletion: "15 Jan 2027",
    abstract: "Flood-risk forecasting for ward-level drainage overflow prevention.",
    deliverables: [
      { name: "Model Validation", status: "PENDING" },
      { name: "Pilot Deployment", status: "PENDING" },
    ],
  },
];
