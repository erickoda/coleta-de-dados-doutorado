enum GenericAnswerRole {
  Immediate = "1",
  LongTerm = "0",

  Accept = "0",
  Reject = "1",

  None = "None",
}

type Answer = {
  question_id: number;
  answer: GenericAnswerRole;
  guessedTimeInMilliseconds: number;
};

export { GenericAnswerRole };
export default Answer;
