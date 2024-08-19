enum AnswerRole {
  Immediate = "Immediate",
  LongTerm = "LongTerm",

  Accept = "Accept",
  Reject = "Reject",
}

type QuestionAnswer = {
  id: string;
  answer: AnswerRole;
  guessedTimeInMilliseconds: number;
};

export { AnswerRole };
export default QuestionAnswer;
