import React, { Suspense } from "react";
import ClientSignUpForm from "./clientPage";

const Page = () => {
  return (
    <Suspense>
      <ClientSignUpForm />
    </Suspense>
  );
};

export default Page;
