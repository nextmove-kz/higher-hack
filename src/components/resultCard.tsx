"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { VacancyRecord, VacancyResponse } from "@/api/api_types";
const ResultCard = ({ data }: { data: VacancyResponse }) => {
  return (
    <div className="flex justify-center w-full pb-3 ">
      <Link href={"/openCard/" + data.id} className="w-full">
        <div className="w-full bg-slate-50 border flex justify-between items-center p-6 rounded-2xl hover:shadow-lg transition-all">
          <div className="flex-col">
            <div className="flex gap-2 justify-center items-center">
              <p className="font-bold text-xl">{data.title}</p>
              <p className="text-sm rounded-lg p-1 bg-slate-200 justify-center  flex">
                Опыт:{" "}
                {data.experience == "none" ? "без опыта" : data.experience}{" "}
                {data.experience == "3-6"
                  ? "лет"
                  : data.experience == "6+"
                  ? "лет"
                  : data.experience == "none"
                  ? ""
                  : "года"}
              </p>
            </div>
            <div className="gap-6">
              <p className="text-sm">{data.city}</p>
              <p className="text-sm">{data.updated.slice(0, 16)}</p>
            </div>
          </div>

          <Button
            onClick={() => (window.location.href = "/openCard/" + data.id)}
          >
            Перейти
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ResultCard;
