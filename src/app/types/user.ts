export enum gender {
  female,
  male,
  non_binary,
  not_informed,
}

type User = {
  termo_de_consentimento: {
    accepted: boolean;
    email: string;
    full_name: string;
  };
  personal_information: {
    gender: gender;
    birth_date: Date;
    job_or_education_or_course: string;
    educational_institution: string;
    dispositive: string;
  };
};

export default User;
