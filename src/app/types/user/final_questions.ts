enum OneToFive {
  _1 = "1",
  _2 = "2",
  _3 = "3",
  _4 = "4",
  _5 = "5",
}

enum MinSalary {
  None = "Nenhuma",
  UntilOne = "Até um salário-mínimo (até R$ 1.412,00)",
  OneToTree = "De 1 a 3 salários-mínimos (de R$ 1.412,01 até R$ 4.236,00)",
  TreeToSix = "De 3 a 6 salários-mínimos (de R$ 4.236,01 até R$ 8.472,00)",
  SixToNine = "De 6 a 9 salários-mínimos (de R$ 8.472,01 até R$ 12.708,00)",
  NineToTwelve = "De 9 a 12 salários-mínimos (de R$ 12.708,01 até R$ 16.944,00)",
  HigherThenTwelve = "De 12 salários-mínimos ou mais (mais de R$ 16.944,01)",
}

enum DichotomousAnswer {
  Yes = "Sim",
  No = "Não",
  Maybe = "Talvez",
}

type FinalQuestionBlock = {
  relaxed_level: OneToFive | null;
  salary: MinSalary | null;
  quantity_of_dependents: number | null;
  have_enough_income: DichotomousAnswer | null;
  have_answered_with_attention: DichotomousAnswer | null;
  have_something_disturbed_you: DichotomousAnswer | null;
  something_to_add: string | null;
  impulsivity: OneToFive | null;
  auto_control: OneToFive | null;
};

export { OneToFive, MinSalary, DichotomousAnswer };

export default FinalQuestionBlock;
