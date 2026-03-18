export interface ExamSittingResponse {
  id: string;
  name: string;
  examDate: string;
  registrationDeadline?: string;
  resultsDate?: string;
  daysUntil: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
