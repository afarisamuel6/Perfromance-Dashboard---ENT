/**
 * Performance Appraisal Framework for Entrepreneurship Facilitator
 * Derived from DTI Performance Score Card
 */

export interface EvidenceFile {
  name: string;
  dataUrl: string;
  type: string;
}

export interface KPI {
  id: string;
  name: string;
  targetDescription: string;
  weight: number;
  measurementMethod: string;
  frequency: string;
  actualValue: number;
  targetValue: number;
  unit: string;
  notes?: string;
  evidenceFiles?: EvidenceFile[];
}

export interface KPICategory {
  id: string;
  name: string;
  objective: string;
  weight: number;
  kpis: KPI[];
}

export const KPI_CATEGORIES: KPICategory[] = [
  {
    id: "cat1",
    name: "Curriculum Leadership & Academic Quality",
    objective: "Support the HOD in ensuring curricula remain compliant, up to date, and aligned with outcomes.",
    weight: 0.10,
    kpis: [
      {
        id: "kpi1-1",
        name: "LMS Compliance",
        targetDescription: "SOW, lesson plans, calendars uploaded 1 week before term ends.",
        weight: 0.04,
        measurementMethod: "LMS Analytics / Submission Logs",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 100,
        unit: "%"
      },
      {
        id: "kpi1-2",
        name: "Curriculum Review",
        targetDescription: "Annual review conducted and approved for Generic programmes.",
        weight: 0.03,
        measurementMethod: "Review Reports / HOD Approval",
        frequency: "Annually",
        actualValue: 0,
        targetValue: 1,
        unit: "Review"
      },
      {
        id: "kpi1-3",
        name: "Curriculum Innovation",
        targetDescription: "Minimum 1 curriculum update integrating business trends/digital commerce.",
        weight: 0.03,
        measurementMethod: "Curriculum Update Documents",
        frequency: "Annually",
        actualValue: 0,
        targetValue: 1,
        unit: "Update"
      }
    ]
  },
  {
    id: "cat2",
    name: "Instructional Supervision & Class Observation",
    objective: "Maintain and improve quality of teaching and learning.",
    weight: 0.08,
    kpis: [
      {
        id: "kpi2-1",
        name: "Classroom Observations",
        targetDescription: "Participate in formal observations per term.",
        weight: 0.04,
        measurementMethod: "Observation Reports",
        frequency: "Monthly/Termly",
        actualValue: 0,
        targetValue: 2,
        unit: "Observations"
      },
      {
        id: "kpi2-2",
        name: "Facilitation Improvement",
        targetDescription: "Achieve improvement in facilitation scores.",
        weight: 0.04,
        measurementMethod: "Performance Appraisal Outcomes",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 10,
        unit: "%"
      }
    ]
  },
  {
    id: "cat3",
    name: "Learner Achievement & Examination Performance",
    objective: "Sustain high academic performance and certification outcomes.",
    weight: 0.09,
    kpis: [
      {
        id: "kpi3-1",
        name: "Pass Rate",
        targetDescription: "Minimum pass rate in internal examinations.",
        weight: 0.05,
        measurementMethod: "Exam Results Analysis",
        frequency: "Each Assessment Cycle",
        actualValue: 0,
        targetValue: 85,
        unit: "%"
      },
      {
        id: "kpi3-2",
        name: "Moderation Compliance",
        targetDescription: "Pearson internal assessment moderation compliance rate.",
        weight: 0.02,
        measurementMethod: "Moderation Reports",
        frequency: "Each Assessment Cycle",
        actualValue: 0,
        targetValue: 100,
        unit: "%"
      },
      {
        id: "kpi3-3",
        name: "External Verification",
        targetDescription: "Pearson verification reports with zero non-conformities.",
        weight: 0.02,
        measurementMethod: "Pearson Verification Reports",
        frequency: "Each Assessment Cycle",
        actualValue: 1,
        targetValue: 1,
        unit: "Status"
      }
    ]
  },
  {
    id: "cat4",
    name: "Venture Incubation & Student Business",
    objective: "Ensure training results in real business creation and profitability.",
    weight: 0.11,
    kpis: [
      {
        id: "kpi4-1",
        name: "Student Venture Projects",
        targetDescription: "Student participation in at least one project per term.",
        weight: 0.04,
        measurementMethod: "Project Participation Logs",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 100,
        unit: "%"
      },
      {
        id: "kpi4-2",
        name: "Revenue Growth",
        targetDescription: "Minimum growth in tuck-shop revenue.",
        weight: 0.04,
        measurementMethod: "Financial Records",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 10,
        unit: "%"
      },
      {
        id: "kpi4-3",
        name: "Financial Reporting",
        targetDescription: "Financial reporting on student venture activities.",
        weight: 0.03,
        measurementMethod: "Report Submission Log",
        frequency: "Quarterly",
        actualValue: 0,
        targetValue: 4,
        unit: "Reports"
      }
    ]
  },
  {
    id: "cat5",
    name: "Industry Integration & Business Exposure",
    objective: "Bridge classroom learning with live business environments.",
    weight: 0.08,
    kpis: [
      {
        id: "kpi5-1",
        name: "Industry Partnerships",
        targetDescription: "Maintain active business/industry partnerships.",
        weight: 0.03,
        measurementMethod: "Partnership Agreement/Engagement Logs",
        frequency: "Annually",
        actualValue: 0,
        targetValue: 5,
        unit: "Partnerships"
      },
      {
        id: "kpi5-2",
        name: "Expert Workshops/Visits",
        targetDescription: "Industry expert workshops or site visits per term.",
        weight: 0.03,
        measurementMethod: "Attendance Logs / Photos",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 2,
        unit: "Visits"
      },
      {
        id: "kpi5-3",
        name: "Placement Rate",
        targetDescription: "Learner placement rate into start-up schemes.",
        weight: 0.02,
        measurementMethod: "Placement Records",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 100,
        unit: "%"
      }
    ]
  },
  {
    id: "cat6",
    name: "Industry Immersion (Professional Practice)",
    objective: "Maintain current practical entrepreneurship exposure.",
    weight: 0.08,
    kpis: [
      {
        id: "kpi6-1",
        name: "Verified Industry Immersion",
        targetDescription: "Verified industry immersion per year.",
        weight: 0.03,
        measurementMethod: "Immersion Verification Certificates",
        frequency: "Annually",
        actualValue: 0,
        targetValue: 20,
        unit: "%"
      },
      {
        id: "kpi6-2",
        name: "Immersion Reports",
        targetDescription: "Immersion reflection & integration reports.",
        weight: 0.03,
        measurementMethod: "Submitted Reports",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 3,
        unit: "Reports"
      },
      {
        id: "kpi6-3",
        name: "Business Case Studies",
        targetDescription: "Real-world business case studies per term incoporated.",
        weight: 0.02,
        measurementMethod: "Curriculum/Lesson Plans",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 2,
        unit: "Cases"
      }
    ]
  },
  {
    id: "cat7",
    name: "ENRICH Remedial Learning Oversight",
    objective: "Identify struggling learners and ensure remediation effectiveness.",
    weight: 0.10,
    kpis: [
      {
        id: "kpi7-1",
        name: "At-Risk Identification",
        targetDescription: "At-risk learners identified by Week 3.",
        weight: 0.04,
        measurementMethod: "Enrollment Logs",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 100,
        unit: "%"
      },
      {
        id: "kpi7-2",
        name: "Support Reports",
        targetDescription: "Individual support progress reports produced.",
        weight: 0.03,
        measurementMethod: "Tracking Logs / Case Reports",
        frequency: "Monthly",
        actualValue: 0,
        targetValue: 12,
        unit: "Reports"
      },
      {
        id: "kpi7-3",
        name: "Performance Improvement",
        targetDescription: "ENRICH participants show academic improvement.",
        weight: 0.03,
        measurementMethod: "Comparative Results Analysis",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 80,
        unit: "%"
      }
    ]
  },
  {
    id: "cat8",
    name: "Student Mentorship & Career Development",
    objective: "Support personal growth, leadership, and transitions.",
    weight: 0.08,
    kpis: [
      {
        id: "kpi8-1",
        name: "Mentoring Meetings",
        targetDescription: "Mentoring meetings for at-risk/high-potential students.",
        weight: 0.04,
        measurementMethod: "Meeting Logs",
        frequency: "Monthly",
        actualValue: 0,
        targetValue: 10,
        unit: "Meetings"
      },
      {
        id: "kpi8-2",
        name: "Career Counselling",
        targetDescription: "Career counselling for final year students.",
        weight: 0.04,
        measurementMethod: "Sign-off Sheets",
        frequency: "Annually",
        actualValue: 0,
        targetValue: 100,
        unit: "%"
      }
    ]
  },
  {
    id: "cat9",
    name: "Staff Performance Monitoring & Coaching",
    objective: "Maintain accountability and continuous improvement.",
    weight: 0.06,
    kpis: [
      {
        id: "kpi9-1",
        name: "Performance Review",
        targetDescription: "Review performance data in dashboard.",
        weight: 0.02,
        measurementMethod: "Dashboard Review Logs",
        frequency: "Monthly",
        actualValue: 0,
        targetValue: 12,
        unit: "Reviews"
      },
      {
        id: "kpi9-2",
        name: "Bi-annual Appraisals",
        targetDescription: "Participation in performance appraisals.",
        weight: 0.02,
        measurementMethod: "Appraisal Completion",
        frequency: "Bi-annual",
        actualValue: 0,
        targetValue: 2,
        unit: "Appraisals"
      },
      {
        id: "kpi9-3",
        name: "Score Improvement",
        targetDescription: "Demonstrate improvement in appraisal scores.",
        weight: 0.02,
        measurementMethod: "Comparative Appraisal Scores",
        frequency: "Annually",
        actualValue: 0,
        targetValue: 100,
        unit: "%"
      }
    ]
  },
  {
    id: "cat10",
    name: "Facilitator Mentorship & Collaborative Practice",
    objective: "Strengthen leadership capacity and teamwork.",
    weight: 0.06,
    kpis: [
      {
        id: "kpi10-1",
        name: "Collaborative Sessions",
        targetDescription: "Participation in weekly Facilitator Collaborative Sessions.",
        weight: 0.02,
        measurementMethod: "Attendance Registers",
        frequency: "Weekly",
        actualValue: 0,
        targetValue: 40,
        unit: "Sessions"
      },
      {
        id: "kpi10-2",
        name: "Mentoring Engagement",
        targetDescription: "Mentoring meetings with departmental facilitators.",
        weight: 0.02,
        measurementMethod: "Mentoring Journals",
        frequency: "Monthly",
        actualValue: 0,
        targetValue: 12,
        unit: "Meetings"
      },
      {
        id: "kpi10-3",
        name: "Co-designed Materials",
        targetDescription: "Evidence of co-designed assessments or materials.",
        weight: 0.02,
        measurementMethod: "Shared Resource Folders",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 3,
        unit: "Items"
      }
    ]
  },
  {
    id: "cat11",
    name: "Succession Planning & Leadership",
    objective: "Contribute to future departmental leadership pipeline.",
    weight: 0.06,
    kpis: [
      {
        id: "kpi11-1",
        name: "Leadership Initiative",
        targetDescription: "Initiative in academic or mentoring activities.",
        weight: 0.02,
        measurementMethod: "Initiative Evidence",
        frequency: "Ongoing/Annual",
        actualValue: 0,
        targetValue: 1,
        unit: "Evidence"
      },
      {
        id: "kpi11-2",
        name: "Development Programmes",
        targetDescription: "Participation in DTI leadership programmes.",
        weight: 0.02,
        measurementMethod: "Participation Tracking",
        frequency: "Annual",
        actualValue: 0,
        targetValue: 1,
        unit: "Program"
      },
      {
        id: "kpi11-3",
        name: "Project Leadership",
        targetDescription: "Managing delegated project responsibilities.",
        weight: 0.02,
        measurementMethod: "Project Reports",
        frequency: "Annual",
        actualValue: 0,
        targetValue: 2,
        unit: "Projects"
      }
    ]
  },
  {
    id: "cat12",
    name: "Digital Learning & Transactional Systems",
    objective: "Effective use of EdAdmin and Pearson platforms.",
    weight: 0.04,
    kpis: [
      {
        id: "kpi12-1",
        name: "Upload Compliance",
        targetDescription: "Course uploads and results capture compliance.",
        weight: 0.02,
        measurementMethod: "System Audit Reports",
        frequency: "Termly",
        actualValue: 0,
        targetValue: 100,
        unit: "%"
      },
      {
        id: "kpi12-2",
        name: "Exam Submissions",
        targetDescription: "Pearson submissions completed with zero errors.",
        weight: 0.02,
        measurementMethod: "Submission Confirmation Logs",
        frequency: "Per Assessment Cycle",
        actualValue: 0,
        targetValue: 100,
        unit: "%"
      }
    ]
  },
  {
    id: "cat13",
    name: "Institutional Contribution & Public Engagement",
    objective: "Strengthen DTI visibility and strategic operations.",
    weight: 0.06,
    kpis: [
      {
        id: "kpi13-1",
        name: "Institutional Events",
        targetDescription: "Participation in major institutional events.",
        weight: 0.02,
        measurementMethod: "Evidence Reports",
        frequency: "Annually",
        actualValue: 0,
        targetValue: 5,
        unit: "Events"
      },
      {
        id: "kpi13-2",
        name: "Community Outreach",
        targetDescription: "Engagement in community outreach projects.",
        weight: 0.02,
        measurementMethod: "Project Reports",
        frequency: "Annually",
        actualValue: 0,
        targetValue: 1,
        unit: "Project"
      },
      {
        id: "kpi13-3",
        name: "Professional Development",
        targetDescription: "Professional development activities completed.",
        weight: 0.02,
        measurementMethod: "Application Reports",
        frequency: "Annually",
        actualValue: 0,
        targetValue: 2,
        unit: "Activities"
      }
    ]
  }
];

export const RATING_SCALE = [
  { min: 0.9, rating: 5, label: "Outstanding", color: "#22c55e", interpretation: "Has exceeded all set objectives and stretch objectives. Recognize as a star performer." },
  { min: 0.8, rating: 4, label: "Very Good", color: "#3b82f6", interpretation: "Has met and exceeded some of the set objectives. Consistently above peers." },
  { min: 0.7, rating: 3, label: "Good", color: "#eab308", interpretation: "Has met all set objectives and meets performance expectations." },
  { min: 0.6, rating: 2, label: "Fair", color: "#f97316", interpretation: "Has met some set objectives; below peers. Needs improvement." },
  { min: 0, rating: 1, label: "Poor", color: "#ef4444", interpretation: "Has not met set objectives; significantly below peers." }
];
