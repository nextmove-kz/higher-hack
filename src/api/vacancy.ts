"use server";
import { pocketbase } from "./pocketbase";

export const listAllVacancy = async () => {
  const pb = pocketbase();
  const records = await pb.collection("vacancy").getFullList({
    sort: "+created",
  });
  return records;
};

// export const searchVacancy = async (query: string, city: string) => {
//   let filter;
//   if (!query) {
//     filter = `city ~ "${city}"`;
//   } else {
//     filter = `title ~ "${query}" && city ~ "${city}"`;
//   }

//   const records = await pocketbase.collection("vacancy").getFullList({
//     sort: "+created",
//     filter: filter,
//   });
//   return records;
// };

// TODO: Поиск по нижнему регистру
export const searchVacancy = async (
  query: string,
  city: string,
  experience: string,
  employment_type: string
) => {
  const pb = pocketbase();
  let filter = [];

  if (query) {
    filter.push(`title ~ "${query}"`);
  }
  if (city) {
    filter.push(`city ~ "${city}"`);
  }
  if (experience) {
    filter.push(`experience ~ "${experience}"`);
  }
  if (employment_type) {
    filter.push(`employment_type ~ "${employment_type}"`);
  }

  const filterString = filter.join(" && ");

  const records = await pb.collection("vacancy").getFullList({
    sort: "+created",
    filter: filterString,
  });
  return records;
};

export const listAvailableLocations = async () => {
  const pb = pocketbase();
  const records = await pb.collection("vacancy").getFullList({
    sort: "+created",
  });
  const cities = records.map((record) => record.city);
  return [...new Set(cities)];
};

export const vacancyById = async (id: string) =>
  await pocketbase()
    .collection("vacancy")
    .getOne(id, { expand: "", cache: "no-cache" });
