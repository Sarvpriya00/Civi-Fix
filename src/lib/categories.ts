// Issue categories and department routing
export interface IssueCategory {
  id: string;
  name: string;
  department: string;
  baseRisk: number; // 0-100 scale for severity calculation
}

export const ISSUE_CATEGORIES: IssueCategory[] = [
  { id: 'potholes', name: 'Potholes and road cuts', department: 'ULB Engineering (Roads/Works)', baseRisk: 75 },
  { id: 'footpaths', name: 'Broken footpaths', department: 'ULB Engineering (Footpaths/Works)', baseRisk: 60 },
  { id: 'manholes', name: 'Open/damaged manhole covers', department: 'ULB Sewerage/Engineering', baseRisk: 95 },
  { id: 'sewer', name: 'Sewer blockage/overflow', department: 'ULB Sewerage', baseRisk: 85 },
  { id: 'drainage', name: 'Stormwater drain choking', department: 'ULB Drainage', baseRisk: 70 },
  { id: 'streetlight', name: 'Streetlight not working', department: 'ULB Electrical (Street Lighting)', baseRisk: 65 },
  { id: 'garbage', name: 'Garbage not collected', department: 'ULB SWM Operations', baseRisk: 55 },
  { id: 'illegal-dumping', name: 'Illegal dumping of waste', department: 'ULB SWM Enforcement', baseRisk: 70 },
  { id: 'burning', name: 'Open burning of waste', department: 'ULB SWM Enforcement', baseRisk: 80 },
  { id: 'dead-animal', name: 'Dead animal removal', department: 'ULB Sanitation/Public Health', baseRisk: 75 },
  { id: 'toilet', name: 'Public toilet issues', department: 'ULB Sanitation/Public Health', baseRisk: 60 },
  { id: 'mosquito', name: 'Mosquito breeding/vector control', department: 'ULB Public Health', baseRisk: 65 },
  { id: 'water', name: 'Water supply leakage/low pressure', department: 'ULB Water Supply', baseRisk: 70 },
  { id: 'parks', name: 'Park and garden upkeep', department: 'ULB Parks/Horticulture', baseRisk: 50 },
  { id: 'trees', name: 'Tree pruning/fallen tree', department: 'ULB Parks/Horticulture (+ Engineering support)', baseRisk: 85 },
  { id: 'market', name: 'Market cleanliness', department: 'ULB Sanitation/Market Administration', baseRisk: 55 },
  { id: 'slaughterhouse', name: 'Slaughterhouse hygiene', department: 'ULB Public Health/Slaughterhouse Mgmt', baseRisk: 80 },
  { id: 'community', name: 'Community facilities upkeep', department: 'ULB Estate/Community Facilities', baseRisk: 55 },
  { id: 'sweeping', name: 'Road sweeping/cleaning', department: 'ULB Sanitation/SWM Operations', baseRisk: 50 },
  { id: 'desilting', name: 'Desilting before monsoon', department: 'ULB Drainage', baseRisk: 75 },
  { id: 'grievance', name: 'Ward-level grievance center', department: 'ULB Grievance Cell/Helpdesk', baseRisk: 40 },
];

export function getCategoryById(id: string): IssueCategory | undefined {
  return ISSUE_CATEGORIES.find(cat => cat.id === id);
}

export function getCategoryByName(name: string): IssueCategory | undefined {
  return ISSUE_CATEGORIES.find(cat => cat.name === name);
}