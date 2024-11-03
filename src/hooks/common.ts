import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/* 
Используется для обновления страницы если данные изменились в базе
Пример использования:
const refresh = useRefresh();
return <Button onClick={refresh(doSomething)}>Click me</Button>; 
*/
export const useRefresh = () => {
  const router = useRouter();

  return (func: Function) => refreshFunction(router, func);
};

const refreshFunction = (router: AppRouterInstance, anyFunc: Function) => {
  return () => {
    anyFunc();
    router.refresh();
  };
};
