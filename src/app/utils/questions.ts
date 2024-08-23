import { FutureQuestionI, OtherPersonQuestionI } from "../types/questions";

function isQuestionFuture(
  value: FutureQuestionI | OtherPersonQuestionI
): value is FutureQuestionI {
  return (value as FutureQuestionI).closest !== undefined;
}

function isQuestionOtherPerson(
  value: FutureQuestionI | OtherPersonQuestionI
): value is OtherPersonQuestionI {
  return (
    (value as OtherPersonQuestionI).other_person_received_value !== undefined
  );
}

export { isQuestionFuture, isQuestionOtherPerson };
