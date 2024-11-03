"use client";
import { experienceSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

type ExperienceFormProps = {
  onSubmit: (a: React.FormEvent<HTMLFormElement>) => void;
};

const ExperienceForm = ({ onSubmit }: ExperienceFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<experienceSchema>({
    resolver: zodResolver(experienceSchema),
  });

  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState<number[]>([]);
  const [jobInput, setJobInput] = useState<number>(0);

  const handleAddJob = () => {
    if (jobInput !== undefined && jobs.length < 4) {
      setJobs([...jobs, jobInput]);
      setJobInput(jobInput + 1);
    }
  };

  const handleRemoveJob = (job: number) => {
    setJobs(jobs.filter((j) => j !== job));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-5 w-5"
          >
            <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
            <path d="M2 6h4" />
            <path d="M2 10h4" />
            <path d="M2 14h4" />
            <path d="M2 18h4" />
            <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
          </svg>
          Open Form
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <ScrollArea className={jobs.length > 0 ? "max-h-[80vh]" : "h-full"}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Enter Your Information</DialogTitle>
              <DialogDescription>
                Fill out this form with your details. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div key={job}>
                  <Card className="mb-4">
                    <CardContent className="flex flex-col gap-2 p-4">
                      <div className="gap-4 relative">
                        <button
                          type="button"
                          onClick={() => handleRemoveJob(job)}
                          className="text-red-500 px-2 py-1 absolute top-[-10px] right-[-10px]"
                        >
                          ✖
                        </button>
                        <div>
                          <Label>Company</Label>
                          <Input
                            placeholder="Tech Corp"
                            {...register(`workExperience.${index}.company`)}
                          />
                        </div>
                        <div>
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            className="placeholder-gray-200"
                            {...register(`workExperience.${index}.startDate`)}
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input
                            type="date"
                            className="placeholder-gray-200"
                            {...register(`workExperience.${index}.endDate`)}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label>Job Description</Label>
                        <Textarea
                          placeholder="Describe your responsibilities and achievements..."
                          className="min-h-[100px]"
                          {...register(
                            `workExperience.${index}.jobDescription`
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-gray-400 p-2"></p>
            )}
            {errors.workExperience?.message && (
              <p className="text-xs text-red-400">
                {errors.workExperience.message.toString()}
              </p>
            )}
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onClick={handleAddJob}
              disabled={jobs.length >= 12}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Job
            </Button>

            <DialogFooter className="mt-2">
              <Button
                type="submit"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceForm;
