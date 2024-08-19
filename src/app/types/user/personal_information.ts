import { Dayjs } from "dayjs";
import Gender from "./gender";

type PersonalInformation = {
  gender: Gender;
  birth_date: Dayjs | null;
  job_or_education_or_course: string;
  educational_institution: string;
  device: string;
};

export default PersonalInformation;
