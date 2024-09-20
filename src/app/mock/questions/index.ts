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
        other_person_received_value: 100,
        other_person_offer: 50,
      },
      {
        id: 4,
        other_person_received_value: 100,
        other_person_offer: 40,
      },
      {
        id: 5,
        other_person_received_value: 100,
        other_person_offer: 30,
      },
      {
        id: 6,
        other_person_received_value: 100,
        other_person_offer: 20,
      },
      {
        id: 7,
        other_person_received_value: 100,
        other_person_offer: 15,
      },
      {
        id: 8,
        other_person_received_value: 100,
        other_person_offer: 10,
      },
      {
        id: 9,
        other_person_received_value: 100,
        other_person_offer: 8,
      },
      {
        id: 10,
        other_person_received_value: 100,
        other_person_offer: 5,
      },
      {
        id: 11,
        other_person_received_value: 100,
        other_person_offer: 3,
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
        `Um participante recebeu 
        ${question.other_person_received_value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })} para dividir com você. Ele lhe ofereceu ${question.other_person_offer.toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          }
        )}. Se você recusar ninguem receberá, caso você aceite ambos receberão conforme a divisão.`,
        ""
      )
    );
  });
});

export default Questions;
