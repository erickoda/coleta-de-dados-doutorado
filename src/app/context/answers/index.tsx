import { createContext, useContext, useState } from "react";
import AnswersContextT, { ContextProviderProps } from "./types";
import UserAnswers from "@/app/types/user/userAnswers";
import Gender from "@/app/types/user/gender";

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
      birth_date: new Date(),
      job_or_education_or_course: "",
      educational_institution: "",
      dispositive: "",
    },
  } as UserAnswers);

  console.log(userAnswers);

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
