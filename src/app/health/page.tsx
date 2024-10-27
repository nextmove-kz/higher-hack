import { existsUser, getUser, isLoggedIn } from "@/api/auth";
import { searchVacancy } from "@/api/vacancy";
import { Fragment } from "react";
import LoginButtons from "./loginButtons";

// ЭТА СТРАНИЦА ТОЛЬКО ДЛЯ ТЕСТОВ И ПРОВЕРКИ РАБОТЫ API ПЖ НЕ ТРОГАЙТЕ ЭТО МОЕЕЕЕ
// - Иван
const HealthCheck = async () => {
  const vacancies = await searchVacancy("", "", "", "");
  const userExists = await existsUser("ivanlukov@gmail.com");
  const loggedIn = await isLoggedIn();
  let user;
  if (userExists) {
    user = await getUser();
  }

  return (
    <div>
      <h1>OK {Date.now()}</h1>
      <LoginButtons userExists={userExists} loggedIn={loggedIn} user={user} />
      <h2 className="text-4xl">Список вакансий: </h2>
      {vacancies.map((vacancy) => (
        <Fragment key={vacancy.id}>
          <hr />
          <div className="p-2">
            <h2 className="text-3xl font-bold">{vacancy.title}</h2>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: vacancy.description }}
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default HealthCheck;
