import React, { Suspense } from "react";
import ClientSignInForm from "./clientPage";

const Page = () => {
  return (
    <Suspense>
      <ClientSignInForm />
    </Suspense>
  );
};

export default Page;
