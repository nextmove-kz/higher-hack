"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Bell from "@/components/bell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchVacancy } from "@/api/vacancy";
import ResultCard from "@/components/resultCard";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { VacancyResponse } from "@/api/api_types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/navbar";

const SearchResults = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get("inputValue");
  const cityValue = searchParams.get("cityValue");
  const Workexperience = searchParams.get("experience");
  const employment_type = searchParams.get("employment_type");

  const [active, setActive] = useState("false");
  const [dateFilter, setDateFilter] = useState<"new" | "old" | null>(null);

  const [res, setRes] = useState<any>(null);

  function sortirovka(
    a: VacancyResponse<unknown>,
    b: VacancyResponse<unknown>
  ) {
    if (dateFilter != null) {
      if (dateFilter == "new") {
        let date1 = new Date(a.updated);
        let date2 = new Date(b.updated);
        return Number(date2) - Number(date1);
      }
      if (dateFilter == "old") {
        let date1 = new Date(a.updated);
        let date2 = new Date(b.updated);
        return Number(date1) - Number(date2);
      }
    }
    return 0;
  }

  function activeSort(results: VacancyResponse[]) {
    if (active === "true") {
      return results.filter((item) => item.active === true);
    }
    return results;
  }

  useEffect(
    useDebouncedCallback(() => {
      const fetchData = async () => {
        const results = await searchVacancy(
          query || "",
          cityValue || "",
          Workexperience || "",
          employment_type || ""
        );
        results.sort(sortirovka);

        const activeResults = activeSort(results);
        setRes(activeResults);
        console.log(results);
      };
      fetchData();
    }, 300),
    [query, cityValue, Workexperience, employment_type, dateFilter, active]
  );

  return (
    <>
      <div className="gap-7 flex flex-col items-start py-5 px-[10vw]">
        <div className="flex gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-2xl">
                {dateFilter
                  ? dateFilter == "new"
                    ? "Новые"
                    : "Старые"
                  : "Сортировка"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 pl-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDateFilter("new")}>
                Новые
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateFilter("old")}>
                Старые
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setDateFilter(null)}
              >
                Сбросить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={() => {
                if (active == "false") {
                  setActive("true");
                } else {
                  setActive("false");
                }
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Только активные вакансии
            </label>
          </div>
        </div>
        {res?.map((item: VacancyResponse) => (
          <ResultCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const cityValue = searchParams.get("cityValue");
  const Workexperience = searchParams.get("experience");
  const employment_type = searchParams.get("employment_type");

  const [city, setCity] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [workType, setWorkType] = useState<string | null>(null);
  const [active, setActive] = useState("False");

  const [inputValue, setInputValue] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      inputValue === null &&
      city === null &&
      experience === null &&
      workType === null &&
      active === null
    )
      return;
    router.push(
      `${pathname}?inputValue=${inputValue || ""}&cityValue=${
        city || ""
      }&experience=${experience || ""}&employment_type=${workType || ""}`
    );
  }, [inputValue, city, experience, workType]);

  async function Search(event: React.FormEvent) {
    event.preventDefault();
    try {
      const vacancy = await searchVacancy(
        inputValue || "",
        city || "",
        experience || "",
        employment_type || ""
      );
    } catch (e) {
      console.error("ОШИБКА СОЕДИНЕНИЯ: " + e);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-full h-full p-5">
        <form
          className="w-full flex h-1/6  justify-center items-center flex-col"
          onSubmit={Search}
        >
          <div className="flex items-center gap-7 w-4/6 justify-start">
            <div className="flex h-16 bg-slate-100 px-3 py-1 border border-slate-200 w-1/2 items-center rounded-lg border-solid">
              <div className="w-full">
                <Input
                  onChange={(event) => {
                    setInputValue(event.target.value);
                  }}
                  placeholder="Найдите вакансию"
                  className="bg-slate-100 border-none"
                />
              </div>
            </div>
            {/* Город */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {cityValue ? cityValue : "Город"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 pl-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCity("Сарань")}>
                  Сарань
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCity("Караганда")}>
                  Караганда
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCity("Новосибирск")}>
                  Новосибирск
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setCity("")}
                >
                  Сбросить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Опыт работы */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {Workexperience ? Workexperience : "Опыт работы"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 pl-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setExperience("1-3")}>
                  1-3
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExperience("3-6")}>
                  3-6
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExperience("6+")}>
                  6+
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setExperience("")}
                >
                  Сбросить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Тип занятости */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {employment_type ? employment_type : "Тип Занятости"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 pl-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setWorkType("full_time")}>
                  full time
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setWorkType("part_time")}>
                  part time
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setWorkType("project")}>
                  project
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setWorkType("voluntary")}>
                  voluntary
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setWorkType("internship")}>
                  internship
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setWorkType("")}
                >
                  Сбросить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </form>
        <Suspense fallback={<div>Загрузка...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchPage;
