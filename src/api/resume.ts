import { UserExpandResume } from "@/types/resume";
import { ResumeRecord } from "./api_types";
import { pocketbase } from "./pocketbase";
import { error } from "console";

export const getResume = async (id: string) => {
  const pb = pocketbase();
  const resume = await pb.collection("resume").getOne(id);
  return resume;
};

export const createResume = async (resume: any) => {
  const pb = pocketbase();
  const data = await pb.collection("resume").create(resume);
  return data;
};

export const hasResume = async (userId: string) => {
  const pb = pocketbase();
  const resumes = await pb.collection("users").getList(1, 1, {
    filter: `resume != '' && id = "${userId}"`,
  });
  return resumes.totalItems > 0;
};

export const resumeById = async (userId: string) => {
  const pb = pocketbase();
  const { expand }: UserExpandResume = await pb
    .collection("users")
    .getFirstListItem(`id = "${userId}" && resume != ""`, {
      expand: "resume",
    });
  return expand.resume;
};
