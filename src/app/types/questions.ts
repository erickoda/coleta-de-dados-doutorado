export type QuestionFuture = {
  id: number;
  closest: {
    value: number;
    days: number;
  };
  furthest: {
    value: number;
    days: number;
  };
};

export type QuestionOtherPerson = {
  id: number;
  other_person_received_value: number;
  other_person_offer: number;
};
