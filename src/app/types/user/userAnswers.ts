import QuestionAnswer from "../questionAnswers";
import ConsentStatement from "./consent_statement";
import PersonalInformation from "./personal_information";

type UserAnswers = {
  consent_statement: ConsentStatement;
  personal_information: PersonalInformation;
  questions_answers: QuestionAnswer[];
};

export default UserAnswers;
