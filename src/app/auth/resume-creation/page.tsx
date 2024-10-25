"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  experienceSchema,
  resumeCreationSchema,
  ResumeCreationSchema,
} from "@/lib/formValidationSchemas";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import ExperienceForm from "@/components/ExperienceForm";

const ResumeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeCreationSchema>({
    resolver: zodResolver(resumeCreationSchema),
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>("");

  const onSubmit = (data: ResumeCreationSchema) => {
    console.log("submiting data");
    console.log(data);
  };

  const onSubmitExperience = (data: experienceSchema) => {
    console.log("submiting data");
    console.log(data);
  };

  const handleAddOption = () => {
    if (inputValue.trim() && options.length < 3) {
      setOptions([...options, inputValue]);
      setInputValue("");
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && skills.length < 16) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // const handleRemoveJob = (index: number) => {
  //   setJobs(jobs.filter((_, i) => i !== index));
  // };

  // const handleAddJob = () => {
  //   if (jobInput !== undefined && jobs.length < 4) {
  //     const newJob = { id: nanoid(), value: jobInput };
  //     setJobs([...jobs, newJob]);
  //     setJobInput(jobInput + 1);
  //   }
  // };

  // const handleRemoveJob = (id: string) => {
  //   setJobs(jobs.filter((job) => job.id !== id));
  // };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    document.getElementById("file-input")?.click();
  };

  return (
    <div className="mx-auto p-6 bg-gray-100">
      <form
        className="flex flex-col gap-6 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="rounded-xl">
          <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
            <CardHeader className="relative border-orange-300 border-r-[9px] p-0 bg-orange-500 rounded-t-xl">
              <div className="flex flex-col border-white rounded-sm m-5">
                <h1 className="flex text-5xl text-white font-semibold mt-5 ml-5 gap-2">
                  Create Your Resume
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m6 17 5-5-5-5" />
                    <path d="m13 17 5-5-5-5" />
                  </svg>
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  color="white"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="absolute top-4 right-4"
                >
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M15 18a3 3 0 1 0-6 0" />
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                  <circle cx="12" cy="13" r="2" />
                </svg>
                <div className="flex items-center space-x-4 p-5 ml-2 mb-2">
                  <div>
                    <img
                      src={
                        imagePreview ? imagePreview : "/placeholder-user.jpg"
                      }
                      alt="Preview"
                      className="w-36 h-36 object-cover rounded-full cursor-pointer"
                      onClick={triggerFileSelect}
                    />
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        handleImageUpload(event);
                        register("img").onChange(event);
                      }}
                      className="hidden"
                    />
                    {errors.img?.message && (
                      <p className="text-xs text-white">
                        {errors.img.message.toString()}
                      </p>
                    )}
                  </div>
                  <div className="p-5 flex flex-col">
                    <div className="flex gap-2 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        color="white"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className=""
                      >
                        <rect width="8" height="4" x="8" y="2" rx="1" />
                        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
                        <path d="M16 4h2a2 2 0 0 1 1.73 1" />
                        <path d="M8 18h1" />
                        <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                      </svg>
                      <p className="text-2xl text-white font-semibold">Bio</p>
                    </div>
                    <div>
                      <div className="flex">
                        <Input
                          className="block w-full text-2xl px-0 py-2 text-white placeholder-gray-200 bg-transparent border-0 border-b-2 border-gray-100 focus:ring-0 focus:border-white transition-colors duration-200"
                          placeholder="Type your full name..."
                          {...register("fullName")}
                        />
                        {/* <GoTriangleLeft
                          color="white"
                          size={24}
                          className="ml-2 mt-2"
                        /> */}
                      </div>
                      {errors.fullName?.message && (
                        <p className="text-xs text-white">
                          {errors.fullName.message.toString()}
                        </p>
                      )}
                      <div className="flex">
                        <Input
                          type="number"
                          className="block w-full px-0 py-2 text-white placeholder-gray-200 bg-transparent border-0 border-b-2 border-gray-100 focus:ring-0 focus:border-white transition-colors duration-200"
                          placeholder="Type your age..."
                          {...register("age")}
                        />
                        {/* <GoTriangleLeft
                          color="white"
                          size={24}
                          className="ml-2 mt-4"
                        /> */}
                      </div>
                      {errors.age?.message && (
                        <p className="text-xs text-white">
                          {errors.age.message.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <Image
                  src="/pen-drawing-tools.png"
                  alt=""
                  width={200}
                  height={200}
                  className="absolute bottom-0 right-5 "
                />
              </div>
            </CardHeader>
            <div>
              <section className=" border-b-2 border-gray-300 p-5">
                <h2 className="text-xl font-semibold mb-4 flex gap-2">
                  Work Experience
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 12h.01" />
                    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                    <rect width="20" height="14" x="2" y="6" rx="2" />
                  </svg>
                </h2>
                <ExperienceForm />
                {/* {jobs.length > 0 ? (
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
                                {...register(
                                  `workExperience.${index}.startDate`
                                )}
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
                )} */}
              </section>

              <section className="border-b-2 border-gray-300 p-5">
                <h2 className="flex text-xl font-semibold mb-4 gap-2">
                  Skills
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </h2>
                <div>
                  <div className="flex gap-1 relative">
                    <Input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="block w-full px-0 py-2 text-gray-900 placeholder-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-orange-500 transition-colors duration-200"
                      placeholder="Enter a skill"
                      disabled={skills.length >= 16}
                    />
                  </div>
                  <div className="flex flex-wrap w-full">
                    {skills.length > 0 ? (
                      skills.map((skill, index) => (
                        <div
                          key={skill + index}
                          className="flex mt-2 w-1/6 mr-1"
                        >
                          <input
                            type="text"
                            {...register(`skills.${index}`, {
                              required: true,
                            })}
                            defaultValue={skill}
                            className="px-1 w-full text-sm font-medium rounded-full border-2 border-primary bg-primary text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            placeholder="Enter a skill"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(index)}
                            className="text-gray-400 ml-0.5"
                          >
                            ✖
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 p-2"></p>
                    )}
                  </div>

                  {skills.length >= 16 && (
                    <p className="text-xs text-red-400">
                      Maximum 16 skills allowed
                    </p>
                  )}
                  {errors.skills?.message && (
                    <p className="text-xs text-red-400">
                      {errors.skills.message.toString()}
                    </p>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={handleAddSkill}
                    disabled={skills.length >= 16}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Skill
                  </Button>
                </div>
              </section>
              <section className=" border-b-2 border-gray-300 p-5">
                <h2 className="flex text-xl font-semibold mb-4 gap-2">
                  Education
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                    <path d="M22 10v6" />
                    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                  </svg>
                </h2>
                <Card className="mb-4">
                  <CardContent className="flex flex-col gap-2 p-4">
                    <Label>Education degree</Label>
                    <select
                      className="ring-1 ring-gray-300 p-2 rounded-md text-sm w-full"
                      {...register("education")}
                    >
                      <option value="Associate">Associate's degree</option>
                      <option value="Bachelor">Bachelor's degree</option>
                      <option value="Master">Master's degree</option>
                      <option value="Doctor">Doctoral degree</option>
                    </select>
                    {errors.typeOfEmployment?.message && (
                      <p className="text-xs text-red-400">
                        {errors.typeOfEmployment.message.toString()}
                      </p>
                    )}

                    <div>
                      <Label>Place of Study</Label>
                      <div className="flex gap-1 relative">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="ring-1 ring-gray-300 p-2 rounded-md text-sm w-full"
                          placeholder="Enter a place of study"
                        />
                      </div>
                      {errors.placesOfStudy?.message && (
                        <p className="text-xs text-red-400">
                          {errors.placesOfStudy.message.toString()}
                        </p>
                      )}

                      <div className="mt-2">
                        {options.length > 0 ? (
                          options.map((option, index) => (
                            <div
                              key={option + index}
                              className="flex gap-2 mt-2 relative"
                            >
                              <input
                                type="text"
                                {...register(`placesOfStudy.${index}`, {
                                  required: true,
                                })}
                                defaultValue={option}
                                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                                placeholder="Enter a place of study"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveOption(index)}
                                className="text-red-500 px-2 py-1"
                              >
                                ✖
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 p-2">No places added</p>
                        )}
                      </div>
                      {options.length >= 3 && (
                        <p className="text-xs text-red-400">
                          Maximum 3 places of study allowed
                        </p>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-2"
                        onClick={handleAddOption}
                        disabled={options.length >= 3}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Another Place
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
              <section className=" border-gray-300 p-5 ">
                <h2 className="flex text-xl font-semibold mb-4 gap-2">
                  Expectations
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                    <path d="M20 3v4" />
                    <path d="M22 5h-4" />
                    <path d="M4 17v2" />
                    <path d="M5 18H3" />
                  </svg>
                </h2>
                <Card className="mb-4">
                  <CardContent className="flex flex-col gap-2 p-4">
                    <Input
                      type="number"
                      className="block w-full px-0 py-2 text-gray-900 placeholder-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-orange-500 transition-colors duration-200"
                      placeholder="Type your expected salary..."
                      {...register("expectedSalary")}
                    />
                    {errors.expectedSalary?.message && (
                      <p className="text-xs text-red-400">
                        {errors.expectedSalary.message.toString()}
                      </p>
                    )}

                    <Label>Type of Employment</Label>
                    <select
                      className="ring-[1px] ring-gray-300 p-2 rounded-md text-sm w-full"
                      {...register("typeOfEmployment")}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Contract">Contract</option>
                    </select>
                    {errors.typeOfEmployment?.message && (
                      <p className="text-xs text-red-400">
                        {errors.typeOfEmployment.message.toString()}
                      </p>
                    )}

                    <div className="mt-4">
                      <Label>About Myself</Label>
                      <Textarea
                        className="min-h-[100px]"
                        {...register("aboutMyself")}
                        placeholder="About me"
                      />
                      {errors.aboutMyself?.message && (
                        <p className="text-xs text-red-400">
                          {errors.aboutMyself.message.toString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </section>
              <Button className="w-full mt-5 rounded-b-xl" type="submit">
                Create Resume
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
