enum AnswerRole {
  Immediate = "Imediata",
  LongTerm = "Longo Prazo",

  Accept = "Aceito",
  Reject = "Rejeitado",

  None = "None",
}

type QuestionAnswer = {
  question_id: number;
  answer: AnswerRole;
  guessedTimeInMilliseconds: number;
};

export { AnswerRole };
export default QuestionAnswer;
