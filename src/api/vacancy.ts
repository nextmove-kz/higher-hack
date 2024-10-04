import { VacancyResponse } from "./api_types";
import pocketbase, { Sorting } from "./pocketbase";

export const listAllVacancy = async () => {
  const records = await pocketbase.collection("vacancy").getFullList({
    sort: "+created",
  });
  return records;
};

export const searchVacancy = async (query: string, city: string) => {
  let filter;
  if (!query) {
    filter = `city ~ "${city}"`;
  } else {
    filter = `title ~ "${query}" && city ~ "${city}"`;
  }

  const records = await pocketbase.collection("vacancy").getFullList({
    sort: "+created",
    filter: filter,
  });
  return records;
};

export const convertSkillsToList = (skills: string) => skills.split(",");
export const convertSkillListToString = (skills: string[]) => skills.join(",");
