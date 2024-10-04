import { listAllVacancy, searchVacancy } from "@/api/vacancy";
import { Fragment } from "react";

// ЭТА СТРАНИЦА ТОЛЬКО ДЛЯ ТЕСТОВ И ПРОВЕРКИ РАБОТЫ API ПЖ НЕ ТРОГАЙТЕ ЭТО МОЕЕЕЕ
// - Иван
const HealthCheck = async () => {
  const vacancies = await searchVacancy("", "");

  return (
    <div>
      <h1>OK {Date.now()}</h1>
      <h2 className="text-4xl">Список вакансий: </h2>
      {vacancies.map((vacancy) => (
        <Fragment key={vacancy.id}>
          <hr />
          <div className="p-2 my-4">
            <h2 className="text-3xl font-bold">{vacancy.title}</h2>
            <div className="p-4 bg-slate-100 w-1/3">
              {vacancy.skills && <p>Навыки: {vacancy.skills}</p>}
              {vacancy.salary ? (
                <p>Зарплата: {vacancy.salary}</p>
              ) : (
                <p className="italic">Зарплата не указана</p>
              )}
              {vacancy.city && <p>Город: {vacancy.city}</p>}
            </div>

            <div
              className="mt-4 prose"
              dangerouslySetInnerHTML={{ __html: vacancy.description }}
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default HealthCheck;
