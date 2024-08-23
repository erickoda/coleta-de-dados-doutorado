import {
  IntertemporalChoiceQuestionI,
  UltimatumGameQuestionI,
} from "../types/questions";

function isIntertemporalChoiceQuestion(
  value: IntertemporalChoiceQuestionI | UltimatumGameQuestionI
): value is IntertemporalChoiceQuestionI {
  return (value as IntertemporalChoiceQuestionI).closest !== undefined;
}

export { isIntertemporalChoiceQuestion };
