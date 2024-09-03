import { GenericAnswerRole } from "@/app/types/question/generic_answers";
import {
  IntertemporalChoice,
  GenericQuestion,
  UltimatumGameQuestion,
  IntertemporalChoiceQuestionI,
  UltimatumGameQuestionI,
} from "@/app/types/question/generic_questions";
import { isIntertemporalChoiceQuestion } from "@/app/utils/questions";

type MockedQuestionT = {
  blocks: (IntertemporalChoiceQuestionI | UltimatumGameQuestionI)[][];
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
        discount_rate: "0",
      },
      {
        id: 2,
        other_person_received_value: 150,
        other_person_offer: 20,
        discount_rate: "0",
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
        discount_rate: "0.00016",
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
        discount_rate: "0.00016",
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
        discount_rate: "0.00016",
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
        discount_rate: "0.00040",
      },
      {
        id: 8,
        other_person_received_value: 100,
        other_person_offer: 50,
      },
      {
        id: 9,
        closest: {
          value: 47,
          days: 0,
        },
        furthest: {
          value: 50,
          days: 160,
        },
        discount_rate: "0.00040",
      },
      {
        id: 10,
        closest: {
          value: 80,
          days: 0,
        },
        furthest: {
          value: 85,
          days: 157,
        },
        discount_rate: "0.00040",
      },
      {
        id: 11,
        other_person_received_value: 150,
        other_person_offer: 75,
      },
    ],
    [
      {
        id: 12,
        other_person_received_value: 50,
        other_person_offer: 20,
      },
      {
        id: 13,
        other_person_received_value: 100,
        other_person_offer: 40,
      },
      {
        id: 14,
        closest: {
          value: 22,
          days: 0,
        },
        furthest: {
          value: 25,
          days: 136,
        },
        discount_rate: "0.0010",
      },
      {
        id: 15,
        other_person_received_value: 150,
        other_person_offer: 60,
      },
      {
        id: 16,
        other_person_received_value: 50,
        other_person_offer: 15,
      },
      {
        id: 17,
        closest: {
          value: 54,
          days: 0,
        },
        furthest: {
          value: 60,
          days: 111,
        },
        discount_rate: "0.0010",
      },
      {
        id: 18,
        other_person_received_value: 100,
        other_person_offer: 30,
      },
      {
        id: 19,
        other_person_received_value: 150,
        other_person_offer: 45,
      },
      {
        id: 20,
        closest: {
          value: 67,
          days: 0,
        },
        furthest: {
          value: 75,
          days: 119,
        },
        discount_rate: "0.0010",
      },
    ],
    [
      {
        id: 21,
        closest: {
          value: 25,
          days: 0,
        },
        furthest: {
          value: 30,
          days: 80,
        },
        discount_rate: "0.0025",
      },
      {
        id: 22,
        closest: {
          value: 49,
          days: 0,
        },
        furthest: {
          value: 60,
          days: 89,
        },
        discount_rate: "0.0025",
      },
      {
        id: 23,
        other_person_received_value: 50,
        other_person_offer: 10,
      },
      {
        id: 24,
        closest: {
          value: 69,
          days: 0,
        },
        furthest: {
          value: 85,
          days: 91,
        },
        discount_rate: "0.0025",
      },
      {
        id: 25,
        closest: {
          value: 19,
          days: 0,
        },
        furthest: {
          value: 25,
          days: 53,
        },
        discount_rate: "0.0060",
      },
      {
        id: 26,
        other_person_received_value: 100,
        other_person_offer: 20,
      },
      {
        id: 27,
        closest: {
          value: 40,
          days: 0,
        },
        furthest: {
          value: 55,
          days: 62,
        },
        discount_rate: "0.0060",
      },
      {
        id: 28,
        closest: {
          value: 55,
          days: 0,
        },
        furthest: {
          value: 75,
          days: 61,
        },
        discount_rate: "0.0060",
      },
      {
        id: 29,
        other_person_received_value: 150,
        other_person_offer: 30,
      },
    ],
    [
      {
        id: 30,
        other_person_received_value: 50,
        other_person_offer: 7.5,
      },
      {
        id: 31,
        other_person_received_value: 100,
        other_person_offer: 15,
      },
      {
        id: 32,
        closest: {
          value: 24,
          days: 0,
        },
        furthest: {
          value: 35,
          days: 29,
        },
        discount_rate: "0.016",
      },
      {
        id: 33,
        other_person_received_value: 150,
        other_person_offer: 22.5,
      },
      {
        id: 34,
        other_person_received_value: 50,
        other_person_offer: 5,
      },
      {
        id: 35,
        closest: {
          value: 34,
          days: 0,
        },
        furthest: {
          value: 50,
          days: 30,
        },
        discount_rate: "0.016",
      },
      {
        id: 36,
        other_person_received_value: 100,
        other_person_offer: 10,
      },
      {
        id: 37,
        other_person_received_value: 150,
        other_person_offer: 15,
      },
      {
        id: 38,
        closest: {
          value: 54,
          days: 0,
        },
        furthest: {
          value: 80,
          days: 30,
        },
        discount_rate: "0.016",
      },
    ],
    [
      {
        id: 39,
        closest: {
          value: 14,
          days: 0,
        },
        furthest: {
          value: 25,
          days: 19,
        },
        discount_rate: "0.041",
      },
      {
        id: 40,
        closest: {
          value: 27,
          days: 0,
        },
        furthest: {
          value: 50,
          days: 21,
        },
        discount_rate: "0.041",
      },
      {
        id: 41,
        other_person_received_value: 50,
        other_person_offer: 4,
      },
      {
        id: 42,
        closest: {
          value: 41,
          days: 0,
        },
        furthest: {
          value: 75,
          days: 20,
        },
        discount_rate: "0.041",
      },
      {
        id: 43,
        closest: {
          value: 15,
          days: 0,
        },
        furthest: {
          value: 35,
          days: 13,
        },
        discount_rate: "0.10",
      },
      {
        id: 44,
        other_person_received_value: 100,
        other_person_offer: 8,
      },
      {
        id: 45,
        closest: {
          value: 25,
          days: 0,
        },
        furthest: {
          value: 60,
          days: 14,
        },
        discount_rate: "0.10",
      },
      {
        id: 46,
        closest: {
          value: 33,
          days: 0,
        },
        furthest: {
          value: 80,
          days: 14,
        },
        discount_rate: "0.10",
      },
      {
        id: 47,
        other_person_received_value: 150,
        other_person_offer: 12,
      },
    ],
    [
      {
        id: 48,
        other_person_received_value: 50,
        other_person_offer: 2.5,
      },
      {
        id: 49,
        other_person_received_value: 100,
        other_person_offer: 5,
      },
      {
        id: 50,
        closest: {
          value: 11,
          days: 0,
        },
        furthest: {
          value: 30,
          days: 7,
        },
        discount_rate: "0.25",
      },
      {
        id: 51,
        other_person_received_value: 150,
        other_person_offer: 7.5,
      },
      {
        id: 52,
        other_person_received_value: 50,
        other_person_offer: 1.5,
      },
      {
        id: 53,
        closest: {
          value: 20,
          days: 0,
        },
        furthest: {
          value: 55,
          days: 7,
        },
        discount_rate: "0.25",
      },
      {
        id: 54,
        other_person_received_value: 100,
        other_person_offer: 3,
      },
      {
        id: 55,
        other_person_received_value: 150,
        other_person_offer: 4.5,
      },
      {
        id: 56,
        closest: {
          value: 31,
          days: 0,
        },
        furthest: {
          value: 85,
          days: 7,
        },
        discount_rate: "0.25",
      },
    ],
  ],
};

const Questions: GenericQuestion[][] = MockedQuestions.blocks.map((block) => {
  return block.map((question) => {
    if (isIntertemporalChoiceQuestion(question)) {
      return new GenericQuestion(
        new IntertemporalChoice(
          question.id,
          GenericAnswerRole.Immediate,
          GenericAnswerRole.LongTerm,
          `${question.closest.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })} Hoje`,
          `${question.furthest.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })} em ${question.furthest.days} dias`,
          `Marque a Opção que preferir: `,
          question.discount_rate
        )
      );
    }

    return new GenericQuestion(
      new UltimatumGameQuestion(
        question,
        GenericAnswerRole.Reject,
        GenericAnswerRole.Accept,
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
        )}. Você recusa ou aceita a oferta?`,
        ""
      )
    );
  });
});

export default Questions;
