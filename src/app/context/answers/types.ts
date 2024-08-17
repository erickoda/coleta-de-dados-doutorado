import UserAnswers from "@/app/types/user/userAnswers";

type ContextProviderProps = {
  children: React.ReactNode;
};

type AnswersContextT = {
  userAnswers: UserAnswers;
  setUserAnswers: React.Dispatch<React.SetStateAction<UserAnswers>>;
};

export type { ContextProviderProps };
export default AnswersContextT;
