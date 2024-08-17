import Gender from "./gender";

type UserAnswers = {
  consent_statement: {
    accepted: boolean;
    email: string;
    full_name: string;
  };
  personal_information: {
    gender: Gender;
    birth_date: Date;
    job_or_education_or_course: string;
    educational_institution: string;
    dispositive: string;
  };
};

export default UserAnswers;
