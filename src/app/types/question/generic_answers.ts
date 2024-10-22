enum GenericAnswerRole {
  Immediate = "Imediata",
  LongTerm = "Longo Prazo",

  Accept = "Aceito",
  Reject = "Rejeitado",

  None = "None",
}

type Answer = {
  question_id: number;
  answer: GenericAnswerRole;
  time: number;
  guessedTimeInMilliseconds: number;
};

export { GenericAnswerRole };
export default Answer;
