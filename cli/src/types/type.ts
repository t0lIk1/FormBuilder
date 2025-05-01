export enum QuestionType {
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  NUMBER = 'NUMBER',
  CHECKBOX = 'CHECKBOX',
  SELECT = 'SELECT',
}

export interface TagI {
  id: number | string;
  name: string;
}

export interface AnswerI {
  id: number;
  formId: number;
  questionId: number;
  value: string | string[];
}[]

export interface TemplateFormValuesI {
  topic: string;
  title: string;
  description: string;
  isPublic: boolean;
}

export interface QuestionI {
  id?: number;
  question: string;
  description: string;
  type: QuestionType;
  isRequired: boolean;
  options?: string[];
  order?: number;
  showInTable: boolean;
  templateId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserI {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isBlocked: boolean;
  createdAt: string;
}

export interface LikesI {
  id: number;
  userId: number;
  templateId: number;
  createdAt: string;
  updatedAt: string;
}

export interface FormI {
  id?: number;
  templateId?: number;
  userId?: number;
  answers: AnswerI;
  submittedAt?: string;
}

export type TemplateCreateDto = Omit<TemplateI, 'id' | 'createdAt' | 'updatedAt'> & {
  questions: QuestionI[];
  tags: string[];
};

export interface TemplateI {
  id: number;
  title: string;
  description: string;
  topic: string;
  isPublic: boolean;
  authorId?: number;
  createdAt?: string;
  updatedAt?: string;
  questions?: QuestionI[];
  tags?: string[] | [];
  likes?: LikesI[];
  forms?: FormI[];
  user?: UserI;
}

export interface TemplateFormValues {
  title: string;
  description: string;
  topic: string;
  isPublic: boolean;
  questions: QuestionI[];
  tags: string[];
}

export interface TemplateApiResponse {
  data: TemplateI;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


export interface ValidationError {
  path: string;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: ValidationError[];
  statusCode?: number;
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
}