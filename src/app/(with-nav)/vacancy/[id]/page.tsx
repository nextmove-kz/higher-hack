import React from "react";
import { vacancyById } from "@/api/vacancy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/navbar";
import { VacancyRecord, VacancyResponse } from "@/api/api_types";
import Link from "next/link";
import BackButton from "@/components/BackButton";

const page = async ({ params }: { params: { id: string } }) => {
  const data = await vacancyById(params.id);

  return (
    <div>
      <div className="w-5/6 mx-auto">
        <div className="w-full flex gap-5 items-baseline">
          <VacancyCard data={data} />
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 ">
            <div className="px-5 col-span-3 ">
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
              {data.skills && (
                <div className="flex flex-col gap-1 pt-5 " key={data.id}>
                  <h1 className="font-bold text-xl">Навыки:</h1>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.split(",").map((item) => {
                      return (
                        <div className="bg-slate-300 rounded-2xl p-1 px-3">
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VacancyCard = ({ data }: { data: VacancyResponse }) => {
  return (
    <div className="w-1/2 ">
      <BackButton />
      <div className="bg-slate-100 flex flex-col gap-1 rounded-2xl p-4 w-full">
        <h1 className="font-bold text-3xl">{data.title}</h1>
        <p className="text-md">
          от {data.min_salary} до {data.max_salary}
        </p>
        <p className="text-md rounded-lg pt-5 justify-center ">
          Требуемый опыт: {experience(data.experience)}
        </p>
        <p className="text-md rounded-lg justify-center">
          {employmentType(data.employment_type)}
        </p>
        <p className="text-sm text-gray-500 pt-5">Город - {data.city}</p>
        <p className="text-sm text-gray-500">
          Последнее обновление - {data.updated.slice(0, 16)}
        </p>

        {data.active == true ? (
          <p className="text-green-500">Вакансия активна</p>
        ) : (
          <p className="text-red-500">Вакансия не активна</p>
        )}

        <div className="flex  justify-center">
          <Button className="w-full hover:bg-white hover:text-black hover:transition-all">
            Откликнуться
          </Button>
        </div>
      </div>
    </div>
  );
};

const employmentType = (type: string) => {
  const types = {
    full_time: "Полный рабочий день",
    part_time: "Неполный рабочий день",
    project: "Проектная работа",
    voluntary: "Волонтерская работа",
    internship: "Стажировка",
  } as const;
  return types[type as keyof typeof types];
};

const experience = (experience: string) => {
  if (experience == "none") return "без опыта";
  if (experience == "3-6" || experience == "6+") return experience + " лет";
  return experience + " года";
};

export default page;
