
export interface Transaction {
  id: string;
  date: string; // ISO string format
  time: string; // HH:MM
  description: string;
  amount: number; // Positive for income, negative for expenses (though MVP focuses on income)
  currency: 'COP';
  notes?: string;
  category?: string; // For Pro version
}

export interface StatementSummary {
  incomeToday: number;
  incomeThisWeek: number;
  incomeThisMonth: number;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
  // other user details
}

// As per design doc: "Heroicons will be presented in two variants: outline for secondary elements and solid for primary action elements."
// We can define a type for icon variants if needed, but for now, direct usage in components.
export enum IconVariant {
  OUTLINE = 'outline',
  SOLID = 'solid',
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}
export interface GroundingChunk {
  web: GroundingChunkWeb;
}
    