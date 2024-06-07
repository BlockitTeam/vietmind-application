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
  questionText: string;
  questionTypeId: number;
  options: tOptionsOfQuestion[];
  answer: number | string | null;
};
