import { createContext, useContext, useEffect, useState } from "react";
import AnswersContextT, { ContextProviderProps } from "./types";
import UserAnswers from "@/app/types/user/userAnswers";
import Gender from "@/app/types/user/gender";
import Questions from "@/app/mock/questions";
import Answer, {
  GenericAnswerRole,
} from "@/app/types/question/generic_answers";

const AnswersContext = createContext<AnswersContextT>({} as AnswersContextT);

const AnswersProvider = ({ children }: ContextProviderProps) => {
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({
    consent_statement: {
      accepted: false,
      email: "",
      full_name: "",
    },
    personal_information: {
      gender: Gender.Female,
      birth_date: null,
      job_or_education_or_course: "",
      educational_institution: "",
      device: "",
    },
    questions_answers: [],
    final_questions: {
      relaxed_level: null,
      salary: null,
      quantity_of_dependents: null,
      have_enough_income: null,
      have_answered_with_attention: null,
      have_something_disturbed_you: null,
      something_to_add: null,
      impulsivity: null,
      auto_control: null,
    },
    time_spent: [],
  });

  useEffect(() => {
    setUserAnswers({
      ...userAnswers,
      questions_answers: (() => {
        const questions_answers: Answer[] = [];
        for (const block of Questions) {
          for (const generic_question of block) {
            questions_answers.push({
              question_id: generic_question.question.id,
              answer: GenericAnswerRole.None,
              guessedTimeInMilliseconds: 0
            });
          }
        }
        return questions_answers;
      })(),
      time_spent: (() => {
        const time_spent = [];
        for (let i = 0; i < 2; i++) {
          time_spent.push({
            initial: 0,
            final: 0,
          });
        }
        return time_spent;
      })(),
    });
  }, []);

  return (
    <AnswersContext.Provider value={{ userAnswers, setUserAnswers }}>
      {children}
    </AnswersContext.Provider>
  );
};

function useAnswers() {
  const context = useContext(AnswersContext);
  if (!context) {
    throw new Error("useAnswers must be used within a AnswersProvider");
  }
  return context;
}

export { AnswersProvider, useAnswers };
