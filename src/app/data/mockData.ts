// Mock data for the PI platform

export interface Firm {
  id: string;
  name: string;
  distance: string;
  similarCases: number;
  winRate: number;
  predictedTimeline: string;
  projectedReimbursement: string;
  whyRecommended: string[];
  specialties: string[];
  locations: string[];
  stats: {
    casesWon: number;
    totalCases: number;
    yearsExperience: number;
    avgSettlement: string;
  };
  description: string;
}

export interface CaseStatus {
  id: string;
  label: string;
  completed: boolean;
  timestamp?: string;
  note?: string;
}

export interface CaseRequest {
  id: string;
  firmId: string;
  firmName: string;
  status: "Sent" | "Contacted" | "Declined" | "Contract signed";
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "firm" | "plaintiff";
  senderName?: string;
  content: string;
  timestamp: string;
  attachments?: { name: string; url: string }[];
}

export interface Document {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  category: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  participants: string[];
  hasTranscript?: boolean;
}

export const mockFirms: Firm[] = [
  {
    id: "1",
    name: "Johnson & Associates",
    distance: "2.3 miles",
    similarCases: 147,
    winRate: 94,
    predictedTimeline: "8-12 months",
    projectedReimbursement: "$45,000 - $75,000",
    whyRecommended: [
      "Highest success rate for similar cases in your area",
      "Fast average case resolution time",
      "Specializes in auto accident injuries"
    ],
    specialties: ["Auto Accidents", "Personal Injury", "Slip and Fall"],
    locations: ["Downtown Office", "West Side Branch"],
    stats: {
      casesWon: 328,
      totalCases: 349,
      yearsExperience: 18,
      avgSettlement: "$62,500"
    },
    description: "Johnson & Associates has been serving the community for 18 years, specializing in personal injury cases with a focus on auto accidents and workplace injuries."
  },
  {
    id: "2",
    name: "Martinez Legal Group",
    distance: "5.1 miles",
    similarCases: 203,
    winRate: 89,
    predictedTimeline: "10-14 months",
    projectedReimbursement: "$40,000 - $70,000",
    whyRecommended: [
      "Extensive experience with your injury type",
      "Strong track record of settlements",
      "Excellent client satisfaction ratings"
    ],
    specialties: ["Auto Accidents", "Medical Malpractice", "Workers Compensation"],
    locations: ["Main Office", "South Location"],
    stats: {
      casesWon: 412,
      totalCases: 463,
      yearsExperience: 22,
      avgSettlement: "$58,000"
    },
    description: "Martinez Legal Group brings over two decades of experience in personal injury law with a commitment to personalized client service."
  },
  {
    id: "3",
    name: "Smith & Partners LLP",
    distance: "3.7 miles",
    similarCases: 189,
    winRate: 91,
    predictedTimeline: "9-13 months",
    projectedReimbursement: "$42,000 - $72,000",
    whyRecommended: [
      "High win rate for your case type",
      "No fees unless you win",
      "Strong negotiation track record"
    ],
    specialties: ["Personal Injury", "Auto Accidents", "Premises Liability"],
    locations: ["Central Office"],
    stats: {
      casesWon: 356,
      totalCases: 391,
      yearsExperience: 15,
      avgSettlement: "$61,200"
    },
    description: "Smith & Partners LLP is dedicated to fighting for injury victims with aggressive representation and compassionate service."
  },
  {
    id: "4",
    name: "Chen Law Firm",
    distance: "6.8 miles",
    similarCases: 156,
    winRate: 87,
    predictedTimeline: "11-15 months",
    projectedReimbursement: "$38,000 - $68,000",
    whyRecommended: [
      "Bilingual services available",
      "Strong community presence",
      "Transparent communication"
    ],
    specialties: ["Personal Injury", "Auto Accidents", "Wrongful Death"],
    locations: ["North Office", "East Branch"],
    stats: {
      casesWon: 289,
      totalCases: 332,
      yearsExperience: 12,
      avgSettlement: "$55,800"
    },
    description: "Chen Law Firm provides compassionate, thorough representation for injury victims with a focus on clear communication."
  },
  {
    id: "5",
    name: "Thompson Injury Lawyers",
    distance: "4.2 miles",
    similarCases: 172,
    winRate: 88,
    predictedTimeline: "10-12 months",
    projectedReimbursement: "$41,000 - $71,000",
    whyRecommended: [
      "Fast case processing times",
      "Strong insurance negotiation skills",
      "Proven track record"
    ],
    specialties: ["Auto Accidents", "Motorcycle Accidents", "Bicycle Accidents"],
    locations: ["Downtown Office"],
    stats: {
      casesWon: 298,
      totalCases: 339,
      yearsExperience: 14,
      avgSettlement: "$59,400"
    },
    description: "Thompson Injury Lawyers focuses exclusively on vehicle-related personal injury cases with exceptional results."
  }
];

export const mockCaseProjection = {
  winProbability: 87,
  projectedTimeline: "8-14 months",
  projectedReimbursement: "$40,000 - $75,000",
  howEstimated: "Based on similar cases in your jurisdiction, injury severity, available evidence, and historical settlement data from comparable claims."
};

export const mockCaseSummary = {
  incidentType: "Auto Accident",
  incidentDate: "January 15, 2026",
  location: "Main St & 5th Ave, Your City",
  injuries: "Whiplash, lower back pain, shoulder injury",
  medicalTreatment: "Emergency room visit, physical therapy (ongoing)",
  insuranceInfo: "At-fault driver's insurance: State Farm",
  description: "Rear-ended at stop light. Other driver admitted fault at scene. Police report filed."
};

export const mockIntakeQuestions = [
  { id: 1, question: "Hello! I'm here to help you understand your case. First, what type of incident are you reporting?", type: "options", options: ["Auto Accident", "Slip and Fall", "Medical Malpractice", "Workplace Injury", "Other"] },
  { id: 2, question: "When did this incident occur?", type: "date" },
  { id: 3, question: "Where did the incident take place?", type: "text" },
  { id: 4, question: "What injuries did you sustain?", type: "text" },
  { id: 5, question: "Have you received medical treatment? Please describe.", type: "text" },
  { id: 6, question: "Do you know the insurance information of the at-fault party?", type: "text" },
  { id: 7, question: "Please provide a brief description of what happened.", type: "textarea" },
  { id: 8, question: "Would you like to upload any photos or documents related to your case?", type: "upload" }
];

export const mockCaseTimeline: CaseStatus[] = [
  { id: "1", label: "Case received", completed: true, timestamp: "Feb 1, 2026", note: "Your case has been received and assigned to attorney Sarah Johnson." },
  { id: "2", label: "Filed", completed: true, timestamp: "Feb 5, 2026", note: "Initial claim filed with insurance company." },
  { id: "3", label: "Court date assigned", completed: false },
  { id: "4", label: "Awaiting verdict", completed: false },
  { id: "5", label: "Case won", completed: false },
  { id: "6", label: "Remuneration received", completed: false }
];

export const mockMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "firm",
    senderName: "Sarah Johnson",
    content: "Hi! I've reviewed your case details and I'm confident we can help you. I have a few follow-up questions about the medical treatment you've received.",
    timestamp: "Feb 2, 2026 10:30 AM"
  },
  {
    id: "2",
    sender: "user",
    senderName: "You",
    content: "Thank you! I'm happy to provide any additional information you need.",
    timestamp: "Feb 2, 2026 11:15 AM"
  },
  {
    id: "3",
    sender: "firm",
    senderName: "Sarah Johnson",
    content: "Great! Can you share your most recent medical records? You can upload them in the Documents tab.",
    timestamp: "Feb 2, 2026 2:45 PM"
  }
];

export const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Police Report.pdf",
    size: "1.2 MB",
    uploadedBy: "You",
    uploadedAt: "Feb 1, 2026",
    category: "Police Reports"
  },
  {
    id: "2",
    name: "Medical Records - ER Visit.pdf",
    size: "3.4 MB",
    uploadedBy: "You",
    uploadedAt: "Feb 1, 2026",
    category: "Medical Records"
  },
  {
    id: "3",
    name: "Photos - Vehicle Damage.zip",
    size: "8.7 MB",
    uploadedBy: "You",
    uploadedAt: "Feb 1, 2026",
    category: "Photos"
  },
  {
    id: "4",
    name: "Insurance Claim Form.pdf",
    size: "456 KB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "Feb 5, 2026",
    category: "Legal Documents"
  }
];

export const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Initial Case Review",
    date: "Feb 10, 2026",
    time: "2:00 PM",
    status: "scheduled",
    participants: ["You", "Sarah Johnson"]
  },
  {
    id: "2",
    title: "Case Strategy Discussion",
    date: "Feb 3, 2026",
    time: "10:00 AM",
    status: "completed",
    participants: ["You", "Sarah Johnson"],
    hasTranscript: true
  }
];

export const mockLeads = [
  {
    id: "lead-1",
    incidentType: "Auto Accident",
    zip: "90210",
    estimatedValue: "$40,000 - $75,000",
    timeReceived: "2 hours ago",
    status: "New" as const,
    plaintiff: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567"
    },
    caseSummary: mockCaseSummary
  },
  {
    id: "lead-2",
    incidentType: "Slip and Fall",
    zip: "90211",
    estimatedValue: "$25,000 - $50,000",
    timeReceived: "1 day ago",
    status: "Contacted" as const,
    plaintiff: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "(555) 234-5678"
    },
    caseSummary: {
      incidentType: "Slip and Fall",
      incidentDate: "February 20, 2026",
      location: "Local Grocery Store",
      injuries: "Broken wrist, bruised hip",
      medicalTreatment: "ER visit, orthopedic surgery scheduled",
      insuranceInfo: "Store liability insurance",
      description: "Slipped on unmarked wet floor in produce section."
    }
  },
  {
    id: "lead-3",
    incidentType: "Workplace Injury",
    zip: "90212",
    estimatedValue: "$30,000 - $60,000",
    timeReceived: "3 days ago",
    status: "Contract signed" as const,
    plaintiff: {
      name: "Mike Johnson",
      email: "mike.j@email.com",
      phone: "(555) 345-6789"
    },
    caseSummary: {
      incidentType: "Workplace Injury",
      incidentDate: "February 15, 2026",
      location: "Construction Site - Building 5",
      injuries: "Shoulder dislocation, multiple contusions",
      medicalTreatment: "ER visit, physical therapy ongoing",
      insuranceInfo: "Workers compensation claim filed",
      description: "Fell from scaffolding due to inadequate safety equipment."
    }
  }
];
