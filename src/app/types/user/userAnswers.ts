import QuestionAnswer from "../question/generic_answers";
import ConsentStatement from "./consent_statement";
import FinalQuestionBlock from "./final_questions";
import PersonalInformation from "./personal_information";

type UserAnswers = {
  consent_statement: ConsentStatement;
  personal_information: PersonalInformation;
  questions_answers: QuestionAnswer[];
  final_questions: FinalQuestionBlock;
};

export default UserAnswers;
