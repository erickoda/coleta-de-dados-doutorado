import QuestionAnswer from "../question/generic_answers";
import ConsentStatement from "./consent_statement";
import FinalQuestionBlock from "./final_questions";
import PersonalInformation from "./personal_information";
import TimeSpent from "./time_spent";

type UserAnswers = {
  consent_statement: ConsentStatement;
  personal_information: PersonalInformation;
  questions_answers: QuestionAnswer[];
  final_questions: FinalQuestionBlock;
  time_spent: TimeSpent[];
};

export default UserAnswers;
