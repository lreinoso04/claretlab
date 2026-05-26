export type ScreenType = 'dashboard' | 'truth-tables' | 'calculator' | 'formula-sheet' | 'examples' | 'settings' | 'support' | 'quiz';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  isPremium: boolean;
  role: string;
  photoURL?: string;
}

export interface RecentActivity {
  id: string;
  expression: string;
  type: 'Truth Table' | 'Integral' | 'Derivative' | 'Algebra' | 'Logic';
  timestamp: string; // ISO string or human readable
  resultSummary?: string;
}

export interface CalcHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'resolved';
}

export interface Formula {
  id: string;
  name: string;
  expr: string;
  description: string;
  category: 'algebra' | 'trigonometry' | 'logic';
}
