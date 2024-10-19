"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Bell from "@/components/bell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listAvailableLocations, searchVacancy } from "@/api/vacancy";
import ResultCard from "@/components/resultCard";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("inputValue");
  const cityValue = searchParams.get("cityValue");

  const [res, setRes] = useState<any>();

  useEffect(() => {
    if (inputValue !== null || cityValue !== null) {
      const fetchData = async () => {
        const results = await searchVacancy(inputValue || "", cityValue || "");
        setRes(results);
      };
      fetchData();
    }
  }, [query, cityValue]);

  const [inputValue, setInputValue] = useState("");
  async function Search(event: React.FormEvent) {
    event.preventDefault();
    const vacancy = await searchVacancy(inputValue, "");
    console.log(vacancy);
    setRes(vacancy);
  }

  return (
    <Suspense>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-full h-full p-5">
          <div className="w-full flex justify-between">
            <Link href="#" className="hover:underline text-lg">
              Я работодатель
            </Link>
            <div className="flex gap-8 items-center">
              <Bell></Bell>
              <Button className="text-lg px-5">Войти</Button>
            </div>
          </div>
          <form
            className="w-full flex h-1/2 justify-center items-center flex-col"
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

              <Button type="submit" className="h-16 px-[5%]">
                Найти
              </Button>
            </div>
          </form>
          {res?.map((item: any) => {
            return (
              <ResultCard
                key={item.id}
                data={item.title}
                city={item.city}
                updated={item.updated}
              />
            );
          })}
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
