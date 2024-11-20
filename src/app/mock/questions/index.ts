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
          value: 15,
          days: 0,
        },
        furthest: {
          value: 35,
          days: 13,
        },
        discount_rate: "0",
      },
      {
        id: 2,
        other_person_received_value: 150,
        other_person_offer: 75,
        discount_rate: "0",
      },
    ],
    [
      {
        id: 3,
        other_person_received_value: 150,
        other_person_offer: 40,
      },
      {
        id: 4,
        other_person_received_value: 150,
        other_person_offer: 34,
      },
      {
        id: 5,
        other_person_received_value: 150,
        other_person_offer: 31,
      },
      {
        id: 6,
        other_person_received_value: 100,
        other_person_offer: 20,
      },
      {
        id: 7,
        other_person_received_value: 150,
        other_person_offer: 27,
      },
      {
        id: 8,
        other_person_received_value: 150,
        other_person_offer: 25,
      },
      {
        id: 9,
        other_person_received_value: 100,
        other_person_offer: 15,
      },
      {
        id: 10,
        other_person_received_value: 100,
        other_person_offer: 10,
      },
      {
        id: 11,
        other_person_received_value: 100,
        other_person_offer: 5,
      },
    ],
    [
      {
        id: 12,
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
        id: 13,
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
        id: 14,
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
        id: 15,
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
        id: 16,
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
        id: 17,
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
        id: 18,
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
        id: 19,
        closest: {
          value: 25,
          days: 0,
        },
        furthest: {
          value: 60,
          days: 14,
        },
        discount_rate: "0.1",
      },
      {
        id: 20,
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
    ],
  ],
};

function parseQuestions(MockedQuestions: MockedQuestionT) {
  const range = MockedQuestions.blocks.length - 1;
  const randomStartIndex = Math.floor(Math.random()*range) + 1;

  const tempBlock = MockedQuestions.blocks[1];
  MockedQuestions.blocks[1] = MockedQuestions.blocks[randomStartIndex];
  MockedQuestions.blocks[randomStartIndex] = tempBlock;

  return MockedQuestions.blocks.map((block) => {
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
}

const Questions: GenericQuestion[][] = parseQuestions(MockedQuestions);

export default Questions;
