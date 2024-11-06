export type tOptionsOfQuestion = {
  optionId: number;
  questionId: number;
  optionText: string;
  score: number;
  createdAt: string;
  updatedAt: string;
};
export type tQuestionResponse = {
  questionId: number;
  surveyId: number;
  parentQuestionId: number | null;
  questionText: string;
  questionTypeId: number;
  responseFormat?: 'text_input' | 'parent_question' | 'single_choice';
  options: tOptionsOfQuestion[];
  answer: number | string | null;
};
