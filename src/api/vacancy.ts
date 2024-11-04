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

export const searchVacancy = async (
  query: string,
  city: string,
  experience: string,
  employment_type: string
) => {
  const pb = pocketbase();
  let filter: string[] = [];

  filter.push(`city ~ "${city}"`);
  filter.push(`experience ~ "${experience}"`);
  filter.push(`employment_type ~ "${employment_type}"`);

  const filterString = `${filter.join(" && ")} && (${filterCaseInsensitive(
    query
  )})`;

  const records = await pb.collection("vacancy").getFullList({
    sort: "+created",
    filter: filterString,
  });
  return records;
};

const filterCaseInsensitive = (query: string) => {
  if (!query) return 'title ~ ""';

  const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);
  const queryVariants = [
    query.toLowerCase(),
    query.toUpperCase(),
    query,
    capitalizedQuery,
  ];
  const queryString = queryVariants.map(
    (queryVariant) => `title ~ "${queryVariant}"`
  );
  return queryString.join(" || ");
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
