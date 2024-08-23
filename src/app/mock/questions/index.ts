import { AnswerRole } from "@/app/types/questionAnswers";
import {
  FutureQuestion,
  GenericQuestion,
  OtherPersonQuestion,
  QuestionFuture,
  QuestionOtherPerson,
} from "@/app/types/questions";
import { isQuestionFuture } from "@/app/utils/questions";

export type MockedQuestionT = {
  blocks: (QuestionFuture | QuestionOtherPerson)[][];
};

const MockedQuestions: MockedQuestionT = {
  blocks: [
    [
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
    ],
    [
      {
        id: 3,
        closest: {
          value: 34,
          days: 0,
        },
        furthest: {
          value: 35,
          days: 186,
        },
      },
      {
        id: 4,
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
        id: 5,
        other_person_received_value: 50,
        other_person_offer: 25,
      },
      {
        id: 6,
        closest: {
          value: 78,
          days: 0,
        },
        furthest: {
          value: 80,
          days: 162,
        },
      },
      {
        id: 7,
        closest: {
          value: 28,
          days: 0,
        },
        furthest: {
          value: 30,
          days: 179,
        },
      },
      {
        id: 8,
        other_person_received_value: 100,
        other_person_offer: 50,
      },
      {
        id: 7,
        closest: {
          value: 47,
          days: 0,
        },
        furthest: {
          value: 50,
          days: 160,
        },
      },
      {
        id: 8,
        closest: {
          value: 80,
          days: 0,
        },
        furthest: {
          value: 85,
          days: 157,
        },
      },
      {
        id: 9,
        other_person_received_value: 150,
        other_person_offer: 75,
      },
    ],
    [
      {
        id: 10,
        other_person_received_value: 50,
        other_person_offer: 20,
      },
      {
        id: 11,
        other_person_received_value: 100,
        other_person_offer: 40,
      },
      {
        id: 12,
        closest: {
          value: 22,
          days: 0,
        },
        furthest: {
          value: 25,
          days: 136,
        },
      },
      {
        id: 13,
        other_person_received_value: 150,
        other_person_offer: 60,
      },
      {
        id: 14,
        other_person_received_value: 50,
        other_person_offer: 15,
      },
      {
        id: 15,
        closest: {
          value: 54,
          days: 0,
        },
        furthest: {
          value: 60,
          days: 111,
        },
      },
      {
        id: 16,
        other_person_received_value: 100,
        other_person_offer: 30,
      },
      {
        id: 17,
        other_person_received_value: 150,
        other_person_offer: 45,
      },
      {
        id: 18,
        closest: {
          value: 67,
          days: 0,
        },
        furthest: {
          value: 75,
          days: 119,
        },
      },
    ],
    [
      {
        id: 19,
        closest: {
          value: 25,
          days: 0,
        },
        furthest: {
          value: 30,
          days: 80,
        },
      },
      {
        id: 20,
        closest: {
          value: 49,
          days: 0,
        },
        furthest: {
          value: 60,
          days: 89,
        },
      },
      {
        id: 21,
        other_person_received_value: 50,
        other_person_offer: 10,
      },
      {
        id: 22,
        closest: {
          value: 69,
          days: 0,
        },
        furthest: {
          value: 85,
          days: 91,
        },
      },
      {
        id: 23,
        closest: {
          value: 19,
          days: 0,
        },
        furthest: {
          value: 25,
          days: 53,
        },
      },
      {
        id: 24,
        other_person_received_value: 100,
        other_person_offer: 20,
      },
      {
        id: 25,
        closest: {
          value: 40,
          days: 0,
        },
        furthest: {
          value: 55,
          days: 62,
        },
      },
      {
        id: 26,
        closest: {
          value: 55,
          days: 0,
        },
        furthest: {
          value: 75,
          days: 61,
        },
      },
      {
        id: 27,
        other_person_received_value: 150,
        other_person_offer: 30,
      },
    ],
    [
      {
        id: 28,
        other_person_received_value: 50,
        other_person_offer: 7.5,
      },
      {
        id: 29,
        other_person_received_value: 100,
        other_person_offer: 15,
      },
      {
        id: 30,
        closest: {
          value: 24,
          days: 0,
        },
        furthest: {
          value: 35,
          days: 29,
        },
      },
      {
        id: 31,
        other_person_received_value: 150,
        other_person_offer: 22.5,
      },
      {
        id: 32,
        other_person_received_value: 50,
        other_person_offer: 5,
      },
      {
        id: 33,
        closest: {
          value: 34,
          days: 0,
        },
        furthest: {
          value: 50,
          days: 30,
        },
      },
      {
        id: 34,
        other_person_received_value: 100,
        other_person_offer: 10,
      },
      {
        id: 35,
        other_person_received_value: 150,
        other_person_offer: 15,
      },
      {
        id: 36,
        closest: {
          value: 54,
          days: 0,
        },
        furthest: {
          value: 80,
          days: 30,
        },
      },
    ],
    [
      {
        id: 37,
        closest: {
          value: 14,
          days: 0,
        },
        furthest: {
          value: 25,
          days: 19,
        },
      },
      {
        id: 38,
        closest: {
          value: 27,
          days: 0,
        },
        furthest: {
          value: 50,
          days: 21,
        },
      },
      {
        id: 39,
        other_person_received_value: 50,
        other_person_offer: 4,
      },
      {
        id: 40,
        closest: {
          value: 41,
          days: 0,
        },
        furthest: {
          value: 75,
          days: 20,
        },
      },
      {
        id: 41,
        closest: {
          value: 15,
          days: 0,
        },
        furthest: {
          value: 35,
          days: 13,
        },
      },
      {
        id: 42,
        other_person_received_value: 100,
        other_person_offer: 8,
      },
      {
        id: 43,
        closest: {
          value: 25,
          days: 0,
        },
        furthest: {
          value: 60,
          days: 14,
        },
      },
      {
        id: 44,
        closest: {
          value: 33,
          days: 0,
        },
        furthest: {
          value: 80,
          days: 14,
        },
      },
      {
        id: 45,
        other_person_received_value: 150,
        other_person_offer: 12,
      },
    ],
    [
      {
        id: 46,
        other_person_received_value: 50,
        other_person_offer: 2.5,
      },
      {
        id: 47,
        other_person_received_value: 100,
        other_person_offer: 5,
      },
      {
        id: 48,
        closest: {
          value: 11,
          days: 0,
        },
        furthest: {
          value: 30,
          days: 7,
        },
      },
      {
        id: 49,
        other_person_received_value: 150,
        other_person_offer: 7.5,
      },
      {
        id: 50,
        other_person_received_value: 50,
        other_person_offer: 1.5,
      },
      {
        id: 51,
        closest: {
          value: 20,
          days: 0,
        },
        furthest: {
          value: 55,
          days: 7,
        },
      },
      {
        id: 52,
        other_person_received_value: 100,
        other_person_offer: 3,
      },
      {
        id: 53,
        other_person_received_value: 150,
        other_person_offer: 4.5,
      },
      {
        id: 54,
        closest: {
          value: 31,
          days: 0,
        },
        furthest: {
          value: 85,
          days: 7,
        },
      },
    ],
  ],
};

export const ParsedMockedQuestions: GenericQuestion[][] =
  MockedQuestions.blocks.map((block) => {
    return block.map((question) => {
      if (isQuestionFuture(question)) {
        return new GenericQuestion(
          new FutureQuestion(
            question,
            AnswerRole.Immediate,
            AnswerRole.LongTerm,
            `${question.closest.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })} Hoje`,
            `${question.furthest.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })} em ${question.furthest.days} dias`,
            "Marque a Opção que preferir"
          )
        );
      }

      return new GenericQuestion(
        new OtherPersonQuestion(
          question,
          AnswerRole.Reject,
          AnswerRole.Accept,
          "Recusar",
          "Aceitar",
          `${question.other_person_received_value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })} para dividir com você. Ele lhe ofereceu ${question.other_person_offer.toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}. Você recusa ou aceita a oferta?.`
        )
      );
    });
  });

export default MockedQuestions;
