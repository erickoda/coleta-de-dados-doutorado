import { GenericAnswerRole } from "./generic_answers";
import UserAnswers from "../user/userAnswers";

export type IntertemporalChoiceQuestionI = {
  id: number;
  closest: {
    value: number;
    days: number;
  };
  furthest: {
    value: number;
    days: number;
  };
  discount_rate: string;
};

export type UltimatumGameQuestionI = {
  id: number;
  other_person_received_value: number;
  other_person_offer: number;
};

export interface QuestionI {
  id: number;
  title: string;
  discount_rate: string;
  first: {
    answer: GenericAnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
  second: {
    answer: GenericAnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
}

export class IntertemporalChoice implements QuestionI {
  id: number;
  first: {
    answer: GenericAnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
  second: {
    answer: GenericAnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
  title: string;
  discount_rate: string;
  constructor(
    id: number,
    firstAnswer: GenericAnswerRole,
    secondAnswer: GenericAnswerRole,
    firstContent: string,
    secondContent: string,
    title: string,
    discount_rate: string
  ) {
    this.id = id;
    this.title = title;
    this.first = {
      answer: firstAnswer,
      content: firstContent,
      getAnswer: (userAnswers: UserAnswers): UserAnswers => {
        return {
          ...userAnswers,
          questions_answers: userAnswers.questions_answers.map((user_answer) =>
            user_answer.question_id === this.id
              ? {
                  ...user_answer,
                  answer: this.first.answer,
                }
              : user_answer
          ),
        };
      },
    };
    this.second = {
      answer: secondAnswer,
      content: secondContent,
      getAnswer: (userAnswers: UserAnswers): UserAnswers => {
        return {
          ...userAnswers,
          questions_answers: userAnswers.questions_answers.map((user_answer) =>
            user_answer.question_id === this.id
              ? {
                  ...user_answer,
                  answer: this.second.answer,
                }
              : user_answer
          ),
        };
      },
    };
    this.discount_rate = discount_rate;
  }
}

export class UltimatumGameQuestion implements QuestionI {
  id: number;
  first: {
    answer: GenericAnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
  second: {
    answer: GenericAnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
  title: string;
  discount_rate: string;
  constructor(
    question: UltimatumGameQuestionI,
    firstQuestionAnswer: GenericAnswerRole,
    secondQuestionAnswer: GenericAnswerRole,
    firstQuestionContent: string,
    secondQuestionContent: string,
    title: string,
    discount_rate: string
  ) {
    this.id = question.id;
    this.title = title;
    this.first = {
      answer: firstQuestionAnswer,
      content: firstQuestionContent,
      getAnswer: (userAnswers: UserAnswers): UserAnswers => {
        return {
          ...userAnswers,
          questions_answers: userAnswers.questions_answers.map((user_answer) =>
            user_answer.question_id === this.id
              ? {
                  ...user_answer,
                  answer: this.first.answer,
                }
              : user_answer
          ),
        };
      },
    };
    this.second = {
      answer: secondQuestionAnswer,
      content: secondQuestionContent,
      getAnswer: (userAnswers: UserAnswers): UserAnswers => {
        return {
          ...userAnswers,
          questions_answers: userAnswers.questions_answers.map((user_answer) =>
            user_answer.question_id === this.id
              ? {
                  ...user_answer,
                  answer: this.second.answer,
                }
              : user_answer
          ),
        };
      },
    };
    this.discount_rate = discount_rate;
  }
}

export class GenericQuestion {
  question: QuestionI;

  constructor(question: QuestionI) {
    this.question = question;
  }
}
