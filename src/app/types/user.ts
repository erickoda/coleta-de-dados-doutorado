export enum Gender {
  Female = "Feminino",
  Male = "Masculino",
  Non_Binary = "Não-binário",
  Not_Informed = "Prefiro não informar",
}

type User = {
  termo_de_consentimento: {
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

export default User;
