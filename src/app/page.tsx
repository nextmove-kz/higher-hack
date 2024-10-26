import { Button } from "@/components/ui/button";

import Link from "next/link";
import Bell from "@/components/bell";
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
      </div>
    </div>
  );
}
