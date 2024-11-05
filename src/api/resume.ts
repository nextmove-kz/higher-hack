"use server";
import { permanentRedirect } from "next/navigation";
import { pocketbase } from "./pocketbase";

export const getResume = async (id: string) => {
  const pb = pocketbase();
  const resume = await pb.collection("resume").getOne(id, {
    expand: "experience",
  });
  return resume;
};

export const getUserByResume = async (id: string) => {
  const pb = pocketbase();
  const user = await pb.collection("users").getFirstListItem(`resume="${id}"`);
  return user;
}

export const getExperience = async (id: string) => {
  const pb = pocketbase();
  const experience = await pb.collection("experience").getFullList({
    filter: `resume="${id}"`,
  });
  return experience;
}

export const userToResume = async (userId: string, resume: string) => {
  const pb = pocketbase();
  const updatedUser = await pb.collection("users").update(userId, {
    resume: resume,
  });
  return updatedUser;
};

export const resumeRedirect = async (resumeId: string) => {
  const pb = pocketbase();
  if (resumeId) {
    permanentRedirect(`/resume/${resumeId}`);
  }
};
export const createResume = async (resume: any) => {
  const pb = pocketbase();

  const data = await pb.collection("resume").create(resume);
  return data;
};

export const createExperience = async (experiences: any) => {
  const pb = pocketbase();

  const experiencePromises = experiences.map(async (experience: any) => {
    return await pb.collection("experience").create(experience);
  });

  const results = await Promise.all(experiencePromises);
  return results;
};

export const createSingleExperience = async (
  id: string,
  company: string,
  description: string,
  startDate: string,
  endDate: string
) => {
  const pb = pocketbase();
  const experience = {
    id,
    company,
    description,
    startDate,
    endDate,
  };
  await pb.collection("experience").create(experience);
};


export const hasResume = async (userId: string) => {
  const pb = pocketbase();
  const resumes = await pb.collection("users").getList(1, 1, {
    filter: `resume != '' && id = "${userId}"`,
  });
  return resumes.totalItems > 0;
};
