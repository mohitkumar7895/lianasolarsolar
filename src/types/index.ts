export * from './solar';
export * from './blog';

export type Theme = 'light' | 'dark' | 'system';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
