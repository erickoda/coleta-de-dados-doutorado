enum AnswerRole {
  Immediate = "Immediate",
  LongTerm = "LongTerm",

  Accept = "Accept",
  Reject = "Reject",

  None = "None",
}

type QuestionAnswer = {
  question_id: number;
  answer: AnswerRole;
  guessedTimeInMilliseconds: number;
};

export { AnswerRole };
export default QuestionAnswer;
