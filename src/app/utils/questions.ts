import { QuestionFuture, QuestionOtherPerson } from "../types/questions";

function isQuestionFuture(
  value: QuestionFuture | QuestionOtherPerson
): value is QuestionFuture {
  return (value as QuestionFuture).closest !== undefined;
}

function isQuestionOtherPerson(
  value: QuestionFuture | QuestionOtherPerson
): value is QuestionOtherPerson {
  return (
    (value as QuestionOtherPerson).other_person_received_value !== undefined
  );
}

export { isQuestionFuture, isQuestionOtherPerson };
