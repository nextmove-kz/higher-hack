import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import Bell from "@/components/bell";
import ResultCard from "@/components/resultCard";
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-full h-full p-5">
        <div className="w-full flex justify-between">
          <a href="#" className="hover:underline text-lg">
            Я работодатель
          </a>
          <div className="flex  gap-8 items-center">
            <Bell></Bell>
            <Button className="text-lg px-5">Войти</Button>
          </div>
        </div>
        <form className="w-full flex h-1/2 justify-center items-center flex-col gap-7">
          <div className="w-1/2">
            <div className="flex h-16 bg-slate-100 px-3 py-1 gap-3 border border-slate-200   items-center rounded-lg border-solid justify-between">
              <div className="border-r-2 w-5/6">
                <Input
                  placeholder="Должность, ключевые слова и т.д..."
                  className="bg-slate-100 border-none "
                ></Input>
              </div>
              <Input
                placeholder="Город"
                className="bg-slate-100 border-none w-1/3"
              ></Input>
              <Link href="/search">
                <Button>Найти</Button>
              </Link>
            </div>
          </div>
          <div>
            <p>
              <a className="text-orange-600" href="#">
                Разместите свое резюме
              </a>{" "}
              - займет меньше 10 минут
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
