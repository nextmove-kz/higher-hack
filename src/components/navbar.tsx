import React, { useMemo } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getUser, isLoggedIn, logOut } from "@/api/auth";
import { AdminModel, AuthModel, RecordModel } from "pocketbase";
import { LogOutButton } from "./LogOutButton";
import { hasResume } from "@/api/resume";
import ResumeWarning from "./ResumeWarning";

const Navbar = async () => {
  const user = await getUser();
  const auth = await isLoggedIn();

  if (auth && user) {
    return <Authorized user={user} />;
  } else {
    return <Unauthorized />;
  }
};

const Unauthorized = () => {
  return (
    <div className="flex justify-between p-8 m-auto">
      <Link href="/" className="hover:underline text-lg font-mono">
        Higher Hack
      </Link>
      <div className="flex items-center">
        <Button className="text-md px-4" variant="outline" asChild>
          <Link href="/auth/sign-up">Регистрация</Link>
        </Button>
      </div>
    </div>
  );
};

const Authorized = async ({ user }: { user: RecordModel }) => {
  if (!user) return;

  const resumeCheck = await hasResume(user.id);

  return (
    <div className="flex justify-between p-8 m-auto">
      <Link href="/" className="hover:underline text-lg">
        Higher Hack
      </Link>
      <div className="flex items-center space-x-4">
        {!resumeCheck && <ResumeWarning />}
        <Link href={`/resume/${user.id}`} className="hover:underline">
          {user.email}
        </Link>
        <LogOutButton />
      </div>
    </div>
  );
};

export default Navbar;
