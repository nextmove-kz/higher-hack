import pocketbase from "./pocketbase";

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
