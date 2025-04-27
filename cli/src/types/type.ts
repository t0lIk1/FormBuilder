export interface TemplateI {
  id: number;
  title: string;
  description: string;
  topic: string;
  isPublic: boolean;
  authorId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  questions?: QuestionI[];
  tags?: TagI[];
  likes?: LikesI[];
  forms?: Array<any>;
  user?: UserI;
}

export interface QuestionI {
  id: number;
  question: string;
  description: string;
  type: QuestionType;
  isRequired: boolean;
  options?: string[];
  order: number;
  showInTable: boolean;
  templateId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TagI {
  id: number;
  name: string;
}

export interface LikesI {
  id: number,
  userId: number,
  templateId: number,
  createdAt: string,
  updatedAt: string
}

export enum QuestionType {
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  NUMBER = 'NUMBER',
  CHECKBOX = 'CHECKBOX',
  SELECT = 'SELECT',
}

export interface UserI {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isBlocked: boolean;
  createdAt: string;
}