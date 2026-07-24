export type Role = 'admin' | 'student';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  studentId: string; // e.g. AECK496692
  role: Role;
  createdAt: string;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  moduleId: string;
  number: number;
  text: string;
  passage?: string; // Optional reading passage or scientific data context
  options: QuestionOption[];
  correctOptionId: string;
  explanation?: string;
}

export interface ExamModule {
  id: string;
  examId: string;
  title: string; // e.g., "1. Tư duy Toán học", "2. Tư duy Đọc hiểu", "3. Tư duy Khoa học & Giải quyết vấn đề"
  category: 'math' | 'reading' | 'science';
  durationMinutes: number;
  openTime: string; // e.g., "00:00 02/05/2026"
  closeTime: string; // e.g., "02:59 07/05/2027"
  totalQuestions: number;
}

export interface Exam {
  id: string;
  title: string; // e.g., "Đề Trải nghiệm Premium 2K9 - Đề số 1"
  description: string;
  isFree: boolean;
  price?: number;
  modules: ExamModule[];
  createdAt: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  timeSpentSeconds: number;
}

export interface Submission {
  id: string;
  examId: string;
  moduleId: string;
  userId: string;
  userName: string;
  studentId: string;
  score: number; // Percentage or points
  totalQuestions: number;
  correctCount: number;
  answers: UserAnswer[];
  submittedAt: string;
  antiCheatViolationCount: number;
}

export interface AntiCheatLog {
  id: string;
  userId: string;
  userName: string;
  studentId: string;
  examId: string;
  moduleId: string;
  eventType: 'tab_switch' | 'window_blur' | 'fullscreen_exit';
  timestamp: string;
  details?: string;
}
