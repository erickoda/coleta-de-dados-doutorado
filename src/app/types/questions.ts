import { AnswerRole } from "./questionAnswers";
import UserAnswers from "./user/userAnswers";

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
};

export type UltimatumGameQuestionI = {
  id: number;
  other_person_received_value: number;
  other_person_offer: number;
};

export interface QuestionI {
  id: number;
  title: string;
  first: {
    answer: AnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
  second: {
    answer: AnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
}

export class IntertemporalChoice implements QuestionI {
  id: number;
  first: {
    answer: AnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
  second: {
    answer: AnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
  title: string;
  constructor(
    id: number,
    firstAnswer: AnswerRole,
    secondAnswer: AnswerRole,
    firstContent: string,
    secondContent: string,
    title: string
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
  }
}

export class UltimatumGameQuestion implements QuestionI {
  id: number;
  first: {
    answer: AnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
  second: {
    answer: AnswerRole;
    content: string;
    getAnswer(userAnswers: UserAnswers): UserAnswers;
  };
  title: string;

  constructor(
    question: UltimatumGameQuestionI,
    firstQuestionAnswer: AnswerRole,
    secondQuestionAnswer: AnswerRole,
    firstQuestionContent: string,
    secondQuestionContent: string,
    title: string
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
  }
}

export class GenericQuestion {
  question: QuestionI;

  constructor(question: QuestionI) {
    this.question = question;
  }
}
