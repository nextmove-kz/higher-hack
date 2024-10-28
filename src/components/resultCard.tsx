"use client";
import React from "react";
import { Button } from "@/components/ui/button";
const ResultCard = (data: any) => {
  return (
    <div className="flex justify-center w-full pb-3 ">
      <div className="w-[80vw] bg-slate-50 border flex justify-between items-center p-6 rounded-2xl">
        <div className="flex-col">
          <div>
            <p>{data.title}</p>
          </div>
          <div className="gap-6">
            <p>{data.city}</p>
            <p>{data.updated}</p>
          </div>
        </div>
        <Button>Перейти</Button>
      </div>
    </div>
  );
};

export default ResultCard;
