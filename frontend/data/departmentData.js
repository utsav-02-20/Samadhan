/*
|--------------------------------------------------------------------------
| Department Demo Data
|--------------------------------------------------------------------------
| Includes routed challenges, SLA progress, assigned issues, and projects.
|--------------------------------------------------------------------------
*/

export const DEPARTMENT_STATS_DATA = [
  { label: "Routed Challenges", value: "18", icon: "Flag", color: "violet" },
  { label: "Assigned Issues", value: "24", icon: "Clock3", color: "amber" },
  { label: "In-Progress SLA", value: "14", icon: "AlertTriangle", color: "blue" },
  { label: "Resolved & Closed", value: "142", icon: "CheckCircle2", color: "emerald" },
];

export const DEPARTMENT_CHALLENGES_MOCK = [
  {
    id: "CHAL-801",
    title: "Smart Traffic Light Optimization",
    category: "Transportation",
    routedBy: "District Administration",
    assignedDate: "01 Sep 2026",
    slaDeadline: "15 Sep 2026",
    slaStatus: "ON_TRACK", // ON_TRACK | AT_RISK | BREACHED
    progress: 65,
    status: "IN_PROGRESS",
    location: "Ranchi Main Circle",
    description: "Deployment of IoT-enabled traffic flow sensors and automated traffic signal synchronization.",
    applicationsCount: 4,
    updates: [
      { date: "01 Sep 2026", note: "Challenge routed from Government portal." },
      { date: "02 Sep 2026", note: "Technical requirements verified by department head." }
    ]
  },
  {
    id: "CHAL-802",
    title: "Urban Waste Segregation & Processing",
    category: "Sanitation",
    routedBy: "Municipal Corporation",
    assignedDate: "28 Aug 2026",
    slaDeadline: "10 Sep 2026",
    slaStatus: "AT_RISK",
    progress: 40,
    status: "IN_PROGRESS",
    location: "Ward 14 Sanitation Depot",
    description: "Automated waste sorting machinery installation and community awareness grid setup.",
    applicationsCount: 6,
    updates: [
      { date: "28 Aug 2026", note: "Routed to Sanitation department." }
    ]
  },
  {
    id: "CHAL-803",
    title: "Potable Water Pipeline Leakage Grid",
    category: "Water Supply",
    routedBy: "Water Supply Board",
    assignedDate: "20 Aug 2026",
    slaDeadline: "01 Sep 2026",
    slaStatus: "RESOLVED",
    progress: 100,
    status: "RESOLVED",
    location: "Bariatu Sector 3",
    description: "Pressure sensor integration to detect underground leakage and auto-route repair crews.",
    applicationsCount: 3,
    updates: [
      { date: "20 Aug 2026", note: "Issue assigned to field crew." },
      { date: "31 Aug 2026", note: "Pipeline repaired and pressure testing completed." }
    ]
  },
  {
    id: "CHAL-804",
    title: "Solar Powered Streetlight Network",
    category: "Electrical",
    routedBy: "Energy Department",
    assignedDate: "02 Sep 2026",
    slaDeadline: "20 Sep 2026",
    slaStatus: "ON_TRACK",
    progress: 15,
    status: "ROUTED",
    location: "University Campus Outer Ring",
    description: "Installation of standalone solar LED streetlights connected to a central monitoring node.",
    applicationsCount: 2,
    updates: [
      { date: "02 Sep 2026", note: "Routed to Electrical department. Verification pending." }
    ]
  }
];

export const DEPARTMENT_PROJECTS_DETAILED = [
  {
    id: "PROJ-301",
    name: "Smart Traffic Optimization",
    partner: "Tech Solutions Pvt. Ltd.",
    category: "Traffic Management",
    budget: "₹24,50,000",
    progress: 72,
    status: "Active",
    startDate: "15 Jul 2026",
    estimatedCompletion: "30 Oct 2026",
    milestones: [
      { title: "Sensor Installation", completed: true },
      { title: "Central Controller Integration", completed: true },
      { title: "Field Calibration & Testing", completed: false },
      { title: "Final Handover & SLA Signoff", completed: false }
    ]
  },
  {
    id: "PROJ-302",
    name: "Digital Grievance Platform Sync",
    partner: "CivicTech India",
    category: "Governance IT",
    budget: "₹12,00,000",
    progress: 48,
    status: "Active",
    startDate: "01 Aug 2026",
    estimatedCompletion: "15 Nov 2026",
    milestones: [
      { title: "API Gateway Integration", completed: true },
      { title: "Real-time Escalation Rule Config", completed: false },
      { title: "Department Training Session", completed: false }
    ]
  },
  {
    id: "PROJ-303",
    name: "Waste Collection Fleet Monitoring",
    partner: "GreenTech Solutions",
    category: "Sanitation",
    budget: "₹18,00,000",
    progress: 31,
    status: "Active",
    startDate: "10 Aug 2026",
    estimatedCompletion: "25 Dec 2026",
    milestones: [
      { title: "GPS Hardware Procurement", completed: true },
      { title: "Route Optimization Engine", completed: false },
      { title: "Citizen Tracker Webhook", completed: false }
    ]
  }
];
