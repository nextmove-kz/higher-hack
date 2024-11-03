"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  async function inputResult(event: React.FormEvent) {
    event.preventDefault();
    router.push(`/search?inputValue=${inputValue}&cityValue=${cityValue}`);
  }

  return (
    <div className="w-full">
      <form
        className="w-full flex justify-between items-center flex-col gap-7"
        onSubmit={inputResult}
      >
        <div className="w-1/2">
          <div className="flex h-16 bg-slate-100 px-3 py-1 gap-3 border border-slate-200   items-center rounded-lg border-solid justify-between">
            <div className="border-r-2 w-5/6">
              <Input
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
                placeholder="Должность, ключевые слова и т.д..."
                className="bg-slate-100 border-none "
              ></Input>
            </div>
            <Input
              value={cityValue}
              onChange={(event) => {
                setCityValue(event.target.value);
              }}
              placeholder="Город"
              className="bg-slate-100 border-none w-1/3"
            ></Input>
            <Button type="submit">Найти</Button>
          </div>
        </div>
        <div>
          <p>
            <Link className="text-orange-600" href="/resume/create">
              Разместите свое резюме
            </Link>{" "}
            — займет меньше 10 минут
          </p>
        </div>
      </form>
    </div>
  );
};

export default Search;
