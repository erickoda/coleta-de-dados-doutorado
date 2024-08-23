import {
  IntertemporalChoiceQuestionI,
  UltimatumGameQuestionI,
} from "../types/question/generic_questions";

function isIntertemporalChoiceQuestion(
  value: IntertemporalChoiceQuestionI | UltimatumGameQuestionI
): value is IntertemporalChoiceQuestionI {
  return (value as IntertemporalChoiceQuestionI).closest !== undefined;
}

export { isIntertemporalChoiceQuestion };
