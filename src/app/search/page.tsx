"use client"; // Явно указываем, что компонент должен быть клиентским
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Bell from "@/components/bell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchVacancy } from "@/api/vacancy";
import ResultCard from "@/components/resultCard";
import { useSearchParams } from "next/navigation";

// Компонент для обработки поиска
const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("inputValue");
  const cityValue = searchParams.get("cityValue");

  const [res, setRes] = useState<any>(null);

  useEffect(() => {
    if (query || cityValue) {
      const fetchData = async () => {
        const results = await searchVacancy(query || "", cityValue || "");
        setRes(results);
      };
      fetchData();
    }
  }, [query, cityValue]); // Теперь следим за query и cityValue

  return (
    <>
      {res?.map((item: any) => (
        <ResultCard
          key={item.id}
          data={item.title}
          city={item.city}
          updated={item.updated}
        />
      ))}
    </>
  );
};

const Page = () => {
  const [inputValue, setInputValue] = useState("");

  // Обрабатываем поиск вакансий по нажатию
  async function Search(event: React.FormEvent) {
    event.preventDefault();
    const vacancy = await searchVacancy(inputValue, "");
    console.log(vacancy);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-full h-full p-5">
        <div className="w-full flex justify-between">
          <Link href="#" className="hover:underline text-lg">
            Я работодатель
          </Link>
          <div className="flex gap-8 items-center">
            <Bell />
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

        <Suspense fallback={<div>Загрузка...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
