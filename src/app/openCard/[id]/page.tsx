import React from "react";
import { vacancyById } from "@/api/vacancy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const page = async ({ params }: { params: { id: string } }) => {
  const data = await vacancyById(params.id);
  console.log(data.active);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 p-10">
      <div className="flex w-full flex-col col-span-1 gap-5">
        <div className="flex w-full">
          <div className="bg-slate-100 flex flex-col gap-1 rounded-2xl p-4 w-full">
            <h1 className="font-bold text-3xl">{data.title}</h1>
            <p className="text-md">
              от {data.min_salary} до {data.max_salary}
            </p>
            <p className="text-md rounded-lg pt-5 justify-center ">
              Требуемый опыт:{" "}
              {data.experience == "none" ? "без опыта" : data.experience}{" "}
              {data.experience == "3-6"
                ? "лет"
                : data.experience == "6+"
                ? "лет"
                : data.experience == "none"
                ? ""
                : "года"}
            </p>
            <p className="text-md rounded-lg   justify-center ">
              {data.employment_type == "full_time" && "Полный рабочий день"}
              {data.employment_type == "part_time" && "Неполный рабочий день"}
              {data.employment_type == "project" && "Проектная работа"}
              {data.employment_type == "voluntary" && "Волентерская работа"}
              {data.employment_type == "internship" && "Стажировка"}
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
        <div className="bg-slate-100 p-3 rounded-2xl">
          <p>Напишите телефон чтобы работодатель мог с вами связаться</p>
          <div className="flex gap-1">
            <Input placeholder="Телефон, почта...."></Input>
            <Button>Связаться</Button>
          </div>
        </div>
      </div>

      <div className="p-5 col-span-3 h-full">
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
        {data.skills && (
          <div className="flex flex-col gap-1 pt-5 h-full" key={data.id}>
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
  );
};

export default page;
