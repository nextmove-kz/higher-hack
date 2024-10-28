import { Suspense } from "react";
import SearchPage from "./client-page";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <SearchPage />
    </Suspense>
  );
}
