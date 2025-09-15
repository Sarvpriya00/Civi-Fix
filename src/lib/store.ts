// Client-side state management for CivicFix
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SeverityInputs } from './severity';

export type ReportStatus = 'Open' | 'Acknowledged' | 'In-Progress' | 'Resolved';

export interface Report {
  id: string;
  title: string;
  category: string;
  departmentHint: string;
  photoUrl?: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  description: string;
  userId: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  inputs: SeverityInputs;
  score: number;
  priority: string;
  assignedTo?: string;
  notes?: string[];
}

interface ReportStore {
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  getReportsByUser: (userId: string) => Report[];
  getReportsForStaff: () => Report[];
  upvoteReport: (id: string) => void;
  addNote: (id: string, note: string) => void;
}

// Generate mock reports for demo
const generateMockReports = (): Report[] => [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    category: 'potholes',
    departmentHint: 'ULB Engineering (Roads/Works)',
    photoUrl: '/placeholder.svg',
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'Main Street, Ward 15',
    },
    description: 'Deep pothole causing traffic issues and potential vehicle damage.',
    userId: '1',
    status: 'Acknowledged',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    upvotes: 15,
    inputs: {
      is_hotspot: true,
      upvotes: 15,
      radius: 100,
      location_boost: 12,
      sentiment: 4,
      user_severity: 3,
      weather_boost: 5,
      category_combo: 8,
    },
    score: 78.5,
    priority: 'High',
    assignedTo: '2',
    notes: ['Initial assessment completed', 'Materials ordered'],
  },
  {
    id: '2',
    title: 'Streetlight not working near school',
    category: 'streetlight',
    departmentHint: 'ULB Electrical (Street Lighting)',
    location: {
      lat: 12.9756,
      lng: 77.5936,
      address: 'School Road, Ward 12',
    },
    description: 'Streetlight has been non-functional for a week, creating safety concerns.',
    userId: '1',
    status: 'Open',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    upvotes: 8,
    inputs: {
      is_hotspot: true,
      upvotes: 8,
      radius: 50,
      location_boost: 18,
      sentiment: 3,
      user_severity: 2,
      weather_boost: 0,
      category_combo: 6,
    },
    score: 71.2,
    priority: 'High',
  },
  {
    id: '3',
    title: 'Garbage collection missed',
    category: 'garbage',
    departmentHint: 'ULB SWM Operations',
    location: {
      lat: 12.9696,
      lng: 77.5986,
      address: 'Residential Area, Ward 18',
    },
    description: 'Garbage has not been collected for 3 days in our area.',
    userId: '1',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    upvotes: 12,
    inputs: {
      is_hotspot: false,
      upvotes: 12,
      radius: 200,
      location_boost: 5,
      sentiment: 2,
      user_severity: 1,
      weather_boost: 3,
      category_combo: 4,
    },
    score: 45.8,
    priority: 'Medium',
    assignedTo: '2',
    notes: ['Rescheduled collection route', 'Completed collection'],
  },
];

export const useReportStore = create<ReportStore>()(
  persist(
    (set, get) => ({
      reports: generateMockReports(),
      
      addReport: (reportData) => {
        const newReport: Report = {
          ...reportData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          reports: [newReport, ...state.reports],
        }));
      },
      
      updateReport: (id, updates) => {
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === id
              ? { ...report, ...updates, updatedAt: new Date().toISOString() }
              : report
          ),
        }));
      },
      
      getReportsByUser: (userId) => {
        return get().reports.filter((report) => report.userId === userId);
      },
      
      getReportsForStaff: () => {
        return get().reports;
      },
      
      upvoteReport: (id) => {
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === id
              ? { ...report, upvotes: report.upvotes + 1 }
              : report
          ),
        }));
      },
      
      addNote: (id, note) => {
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === id
              ? { 
                  ...report, 
                  notes: [...(report.notes || []), note],
                  updatedAt: new Date().toISOString()
                }
              : report
          ),
        }));
      },
    }),
    {
      name: 'civicfix-reports',
    }
  )
);