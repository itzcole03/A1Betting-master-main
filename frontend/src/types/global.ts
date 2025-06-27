// Global type definitions
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorWithDetails extends Error {
  details?: any;
  code?: string;
  status?: number;
}

export {};
