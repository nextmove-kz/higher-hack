import { ResumeRecord } from "@/api/api_types";

export type Experience = {
  company: string;
  jobDescription: string;
  startDate: string;
  endDate: string;
};

export type UserExpandResume = {
  expand: { resume: ResumeRecord };
};
