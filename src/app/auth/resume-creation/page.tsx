"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  resumeCreationSchema,
  ResumeCreationSchema,
} from "@/lib/formValidationSchemas";
// import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

const ResumeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeCreationSchema>({
    resolver: zodResolver(resumeCreationSchema),
  });

  // const [img, setImg] = useState<any>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>("");
  const [jobs, setJobs] = useState<number[]>([]);
  const [jobInput, setJobInput] = useState<number>(0);

  const onSubmit = handleSubmit((data) => {
    console.log("submiting data");
    console.log(data);
  });

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

  const handleAddJob = () => {
    if (jobInput !== undefined && jobs.length < 4) {
      setJobs([...jobs, jobInput]);
      setJobInput(jobInput + 1);
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleRemoveJob = (index: number) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

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
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div>
          <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
            <CardHeader className=" border-gray-300 p-0 rounded-sm bg-orange-500">
              <div className="flex flex-col border-white rounded-sm m-5">
                <h1 className="text-5xl text-white font-semibold mt-5 ml-5">
                  Create Your Resume
                </h1>
                <div className="flex items-center space-x-4 p-5 ml-2 mb-2">
                  <div>
                    <img
                      src={
                        imagePreview ? imagePreview : "/placeholder-user.jpg"
                      }
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full cursor-pointer"
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
                  </div>
                  {/* <CldUploadWidget
                    uploadPreset="resume"
                    onSuccess={(result, { widget }) => {
                      setImg(result.info);
                      widget.close();
                    }}
                  >
                    {({ open }) => {
                      return (
                        <div
                          className="text-xl text-white flex flex-col items-center gap-2 cursor-pointer"
                          onClick={() => open()}
                        >
                          <Image
                            src="/placeholder-user.jpg"
                            alt=""
                            className="rounded-full"
                            width={150}
                            height={150}
                          />
                        </div>
                      );
                    }}
                  </CldUploadWidget> */}
                  <div>
                    <Input
                      className="block w-full text-2xl px-0 py-2 text-white placeholder-gray-200 bg-transparent border-0 border-b-2 border-gray-100 focus:ring-0 focus:border-white transition-colors duration-200"
                      placeholder="Type your full name..."
                      {...register("fullName")}
                    />
                    <Input
                      type="number"
                      className="block w-full px-0 py-2 text-white placeholder-gray-200 bg-transparent border-0 border-b-2 border-gray-100 focus:ring-0 focus:border-white transition-colors duration-200"
                      placeholder="Type your age..."
                      {...register("age")}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <div>
              <section className=" border-b-2 border-gray-300 p-5">
                <h2 className="text-xl font-semibold mb-4">Work Experience</h2>

                {jobs.length > 0 ? (
                  jobs.map((job, index) => (
                    <Card className="mb-4" key={job}>
                      <CardContent className="p-4">
                        <div className="gap-4 relative">
                          <button
                            type="button"
                            onClick={() => handleRemoveJob(index)}
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
                  ))
                ) : (
                  <p className="text-gray-400 p-2"></p>
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
              </section>

              <section className="border-b-2 border-gray-300 p-5">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
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
                        <div key={index} className="flex mt-2 w-1/6 mr-1">
                          <input
                            type="text"
                            {...register(`skills.${index}`, {
                              required: true,
                            })}
                            defaultValue={skill}
                            className="px-1 w-full text-sm font-medium rounded-full border-2 border-primary bg-primary text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            placeholder="Enter a skill"
                            disabled={true}
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
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                <Card className="mb-4">
                  <CardContent className="p-4">
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

                      <div className="mt-2">
                        {options.length > 0 ? (
                          options.map((option, index) => (
                            <div
                              key={index}
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
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Expectations</h2>
                    <Input
                      type="number"
                      className="block w-full px-0 py-2 text-gray-900 placeholder-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-orange-500 transition-colors duration-200"
                      placeholder="Type your expected salary..."
                      {...register("expectedSalary")}
                    />

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
              <Button className="w-full mt-5" type="submit">
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
