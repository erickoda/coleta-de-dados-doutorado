import { AnswerRole } from "./questionAnswers";
import UserAnswers from "./user/userAnswers";

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

export interface QuestionAnswerI {
  question: QuestionFuture | QuestionOtherPerson;
  firstQuestionAnswer: AnswerRole;
  secondQuestionAnswer: AnswerRole;
  firstQuestionContent: string;
  secondQuestionContent: string;
  questionTitle: string;

  answerFirstQuestion(userAnswers: UserAnswers): UserAnswers;
  answerSecondQuestion(userAnswers: UserAnswers): UserAnswers;
}

export class FutureQuestion implements QuestionAnswerI {
  question: QuestionFuture;
  firstQuestionAnswer: AnswerRole;
  secondQuestionAnswer: AnswerRole;
  firstQuestionContent: string;
  secondQuestionContent: string;
  questionTitle: string;

  constructor(
    question: QuestionFuture,
    firstQuestionAnswer: AnswerRole,
    secondQuestionAnswer: AnswerRole,
    firstQuestionContent: string,
    secondQuestionContent: string,
    questionTitle: string
  ) {
    this.question = question;
    this.firstQuestionAnswer = firstQuestionAnswer;
    this.secondQuestionAnswer = secondQuestionAnswer;
    this.firstQuestionContent = firstQuestionContent;
    this.secondQuestionContent = secondQuestionContent;
    this.questionTitle = questionTitle;
  }

  answerFirstQuestion(userAnswers: UserAnswers): UserAnswers {
    return {
      ...userAnswers,
      questions_answers: userAnswers.questions_answers.map((user_answer) =>
        user_answer.question_id === this.question.id
          ? {
              ...user_answer,
              answer: this.firstQuestionAnswer,
            }
          : user_answer
      ),
    };
  }

  answerSecondQuestion(userAnswers: UserAnswers): UserAnswers {
    return {
      ...userAnswers,
      questions_answers: userAnswers.questions_answers.map((user_answer) =>
        user_answer.question_id === this.question.id
          ? {
              ...user_answer,
              answer: this.secondQuestionAnswer,
            }
          : user_answer
      ),
    };
  }
}

export class OtherPersonQuestion implements QuestionAnswerI {
  question: QuestionOtherPerson;
  firstQuestionAnswer: AnswerRole;
  secondQuestionAnswer: AnswerRole;
  firstQuestionContent: string;
  secondQuestionContent: string;
  questionTitle: string;

  constructor(
    question: QuestionOtherPerson,
    firstQuestionAnswer: AnswerRole,
    secondQuestionAnswer: AnswerRole,
    firstQuestionContent: string,
    secondQuestionContent: string,
    questionTitle: string
  ) {
    this.question = question;
    this.firstQuestionAnswer = firstQuestionAnswer;
    this.secondQuestionAnswer = secondQuestionAnswer;
    this.firstQuestionContent = firstQuestionContent;
    this.secondQuestionContent = secondQuestionContent;
    this.questionTitle = questionTitle;
  }

  answerFirstQuestion(userAnswers: UserAnswers): UserAnswers {
    return {
      ...userAnswers,
      questions_answers: userAnswers.questions_answers.map((user_answer) =>
        user_answer.question_id === this.question.id
          ? {
              ...user_answer,
              answer: this.firstQuestionAnswer,
            }
          : user_answer
      ),
    };
  }

  answerSecondQuestion(userAnswers: UserAnswers): UserAnswers {
    return {
      ...userAnswers,
      questions_answers: userAnswers.questions_answers.map((user_answer) =>
        user_answer.question_id === this.question.id
          ? {
              ...user_answer,
              answer: this.secondQuestionAnswer,
            }
          : user_answer
      ),
    };
  }
}

export class GenericQuestion {
  questionAnswer: QuestionAnswerI;

  constructor(questionAnswer: QuestionAnswerI) {
    this.questionAnswer = questionAnswer;
  }
}
