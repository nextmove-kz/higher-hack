"use client";

import Link from "next/link";
import { Button } from "./ui/button";

const BackButton = () => {
  const history = window.history;

  return (
    <Button
      className="text-lg px-5"
      onClick={() => history.back()}
      variant="link"
    >
      Назад
    </Button>
  );
};

export default BackButton;
