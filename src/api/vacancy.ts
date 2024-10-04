import pocketbase, { Sorting } from "./pocketbase";

export const listAllVacancy = async (sort: Sorting = "+created") => {
  const records = await pocketbase.collection("vacancy").getFullList({
    sort: sort,
  });
  return records;
};
