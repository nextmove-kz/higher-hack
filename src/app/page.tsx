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
import { searchVacancy } from "@/api/vacancy";
import InputValue from "@/components/inputValue";
import { log } from "console";
export default function Home() {
  return (
    <div className="flex  flex-col justify-center items-center h-screen">
      <div className="w-full h-full p-5">
        <div className="w-full flex justify-between">
          <Link href="#" className="hover:underline text-lg">
            Я работодатель
          </Link>
          <div className="flex  gap-8 items-center">
            <Bell></Bell>
            <Button className="text-lg px-5">Войти</Button>
          </div>
        </div>
        <div className="w-full flex h-1/2 justify-center items-center flex-col gap-7">
          <InputValue></InputValue>
        </div>
        {/* <form
          className="w-full flex h-1/2 justify-center items-center flex-col gap-7"
          onSubmit={resultat}
        >
          <div className="w-1/2">
            <div className="flex h-16 bg-slate-100 px-3 py-1 gap-3 border border-slate-200   items-center rounded-lg border-solid justify-between">
              <div className="border-r-2 w-5/6">
                <InputValue />
              </div>
              <Input
                placeholder="Город"
                className="bg-slate-100 border-none w-1/3"
              ></Input>
              <Button asChild type="submit">
                <Link href="/search">Найти</Link>
              </Button>
            </div>
          </div>
          <div>
            <p>
              <Link className="text-orange-600" href="#">
                Разместите свое резюме
              </Link>{" "}
              — займет меньше 10 минут
            </p>
          </div>
        </form> */}
      </div>
    </div>
  );
}
