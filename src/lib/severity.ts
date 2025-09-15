// Severity scoring algorithm for CivicFix reports
import { getCategoryById } from './categories';

export interface SeverityInputs {
  is_hotspot: boolean;
  upvotes: number; // 0-100
  radius: number; // 0-250 meters
  location_boost: number; // 0-20
  sentiment: number; // 0-5
  user_severity: number; // 0-4
  weather_boost: number; // 0-15
  category_combo: number; // 0-12
}

export interface SeverityResult {
  score: number;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  breakdown: {
    baseRisk: number;
    hotspot: number;
    upvotes: number;
    radius: number;
    location: number;
    sentiment: number;
    userSeverity: number;
    weather: number;
    categoryCombo: number;
  };
}

// Priority thresholds (configurable in admin)
export const PRIORITY_THRESHOLDS = {
  low: 0,
  medium: 40,
  high: 70,
  critical: 85,
};

function normalize(value: number, max: number): number {
  return Math.min(Math.max(value, 0), max) / max * 100;
}

export function calculateSeverity(
  categoryId: string,
  inputs: SeverityInputs
): SeverityResult {
  const category = getCategoryById(categoryId);
  const baseRisk = category?.baseRisk || 50;

  // Normalize all inputs to 0-100 scale
  const hotspotScore = inputs.is_hotspot ? 100 : 0;
  const upvotesNorm = normalize(inputs.upvotes, 100);
  const radiusNorm = normalize(inputs.radius, 250);
  const locationNorm = normalize(inputs.location_boost, 20);
  const sentimentNorm = normalize(inputs.sentiment, 5);
  const userSeverityNorm = normalize(inputs.user_severity, 4);
  const weatherNorm = normalize(inputs.weather_boost, 15);
  const categoryComboNorm = normalize(inputs.category_combo, 12);

  // Apply weighted formula
  const breakdown = {
    baseRisk: baseRisk * 0.40,
    hotspot: hotspotScore * 0.10,
    upvotes: upvotesNorm * 0.07,
    radius: radiusNorm * 0.06,
    location: locationNorm * 0.15,
    sentiment: sentimentNorm * 0.05,
    userSeverity: userSeverityNorm * 0.04,
    weather: weatherNorm * 0.10,
    categoryCombo: categoryComboNorm * 0.03,
  };

  const score = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  // Determine priority level
  let priority: SeverityResult['priority'] = 'Low';
  if (score >= PRIORITY_THRESHOLDS.critical) priority = 'Critical';
  else if (score >= PRIORITY_THRESHOLDS.high) priority = 'High';
  else if (score >= PRIORITY_THRESHOLDS.medium) priority = 'Medium';

  return {
    score: Math.round(score * 10) / 10,
    priority,
    breakdown,
  };
}

export function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'low': return 'hsl(var(--priority-low))';
    case 'medium': return 'hsl(var(--priority-medium))';
    case 'high': return 'hsl(var(--priority-high))';
    case 'critical': return 'hsl(var(--priority-critical))';
    default: return 'hsl(var(--muted))';
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'open': return 'hsl(var(--status-open))';
    case 'acknowledged': return 'hsl(var(--status-acknowledged))';
    case 'in-progress': return 'hsl(var(--status-in-progress))';
    case 'resolved': return 'hsl(var(--status-resolved))';
    default: return 'hsl(var(--muted))';
  }
}