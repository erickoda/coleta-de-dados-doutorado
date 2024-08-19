import { QuestionFuture, QuestionOtherPerson } from "@/app/types/questions";

const MockedQuestions: (QuestionFuture | QuestionOtherPerson)[] = [
  {
    id: 1,
    closest: {
      value: 54,
      days: 0,
    },
    furthest: {
      value: 55,
      days: 117,
    },
  },

  {
    id: 2,
    other_person_received_value: 150,
    other_person_offer: 20,
  },
];

export default MockedQuestions;
