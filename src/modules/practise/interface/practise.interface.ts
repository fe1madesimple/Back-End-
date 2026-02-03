// src/modules/content/interface/content.interface.ts

export interface QuickQuizResponse {
  moduleId: string;
  moduleName: string;
  subjectName: string;
  questions: {
    id: string;
    text: string;
    options: string[];
    order: number;
  }[];
  totalAvailable: number;
}



export interface TopicChallengeResponse {
  moduleId: string;
  moduleName: string;
  subjectName: string;
  questions: {
    id: string;
    text: string;
    options: string[];
    order: number;
  }[];
  totalAvailable: number;
}