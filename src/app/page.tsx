import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Компоненты Shadcn/ui работают</CardTitle>
          <CardDescription>
            Нажмите кнопку ниже чтобы посмотреть как добавить Input и другие
            компоненты shadcn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Все добавленные компоненты появляются в{" "}
            <span className="text-zinc-700 font-bold">@/components/ui</span>.
            Наши личные компоненты создавать просто в папке{" "}
            <span className="text-zinc-700 font-bold">@/components</span>
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="https://ui.shadcn.com/docs/components/input">
              Перейти в документацию
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
