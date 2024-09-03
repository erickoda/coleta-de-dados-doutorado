import Answer from "../question/generic_answers";

export type ParsedAnswers = {
  user_email: string;
  question: string;
  discount_rate: string;
} & Answer;
