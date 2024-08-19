import { createContext, useContext, useEffect, useState } from "react";
import AnswersContextT, { ContextProviderProps } from "./types";
import UserAnswers from "@/app/types/user/userAnswers";
import Gender from "@/app/types/user/gender";
import MockedQuestions from "@/app/mock/questions";
import { AnswerRole } from "@/app/types/questionAnswers";

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
  });

  useEffect(() => {
    setUserAnswers({
      ...userAnswers,
      questions_answers: MockedQuestions.map((question) => ({
        question_id: question.id,
        answer: AnswerRole.None,
        guessedTimeInMilliseconds: 0,
      })),
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
