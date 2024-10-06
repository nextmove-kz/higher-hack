"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  resumeCreationSchema,
  ResumeCreationSchema,
} from "@/lib/formValidationSchemas";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";
import DropdownInputField from "@/components/DropDownInputField";
import BadgeInputField from "@/components/BadgeInputField";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeCreationSchema>({
    resolver: zodResolver(resumeCreationSchema),
  });

  const methods = useForm();

  const [img, setImg] = useState<any>();
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>("");

  const onSubmit = handleSubmit((data) => {
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

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <FormProvider {...methods}>
          <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold text-center">Create Resume</h1>
            <div className="flex flex-col gap-4">
              <InputField
                label="Full Name"
                name="fullName"
                register={register}
                size="large"
                placeholder="John Doe"
                error={errors?.fullName}
              />
              <div className="flex gap-2">
                <InputField
                  label="Age"
                  name="age"
                  type="number"
                  register={register}
                  size="medium"
                  placeholder="30"
                  error={errors?.age}
                />
                <InputField
                  label="Work Experience"
                  name="workExperience"
                  register={register}
                  size="large"
                  placeholder="5 years in software development"
                  error={errors?.workExperience}
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Skills</label>
                <div className="flex gap-1 relative">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    placeholder="Enter a skill"
                    disabled={skills.length >= 16}
                  />
                  <button
                    onClick={handleAddSkill}
                    type="button"
                    className="text-sm text-blue-500 px-3 py-1 bg-gray-100 rounded-md ml-2"
                    disabled={skills.length >= 16}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap w-full">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <div key={index} className="flex mt-2 w-1/4 mr-1">
                        <input
                          type="text"
                          {...register(`skills.${index}`, { required: true })}
                          defaultValue={skill}
                          className="px-2 w-full py-1 text-sm font-medium rounded-full border-2 border-primary bg-primary text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                    <p className="text-gray-400 p-2">No skills added</p>
                  )}
                </div>

                {skills.length >= 16 && (
                  <p className="text-xs text-red-400">
                    Maximum 16 skills allowed
                  </p>
                )}
              </div>

              <InputField
                label="Education"
                name="education"
                register={register}
                size="large"
                placeholder="Bachelor's degree in Computer Science"
                error={errors?.education}
              />
              <div>
                <label className="text-xs text-gray-500">Place of Study</label>
                <div className="flex gap-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    placeholder="Enter a place of study"
                  />
                  <button
                    onClick={handleAddOption}
                    type="button"
                    className="text-sm text-blue-500 px-3 py-1 bg-gray-100 rounded-md ml-2"
                    disabled={options.length >= 3}
                  >
                    Add
                  </button>
                </div>

                <div className="mt-2">
                  {options.length > 0 ? (
                    options.map((option, index) => (
                      <div key={index} className="flex gap-2 mt-2 relative">
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
              </div>
              {/* <DropdownInputField
                label="Places of Study"
                name="placesOfStudy"
                placeholder="Enter a places of study"
              /> */}
              {/* <BadgeInputField
                label="Skills"
                name="skills"
                placeholder="JavaScript, React, Node.js"
              /> */}
              <InputField
                label="Expected Salary"
                name="expectedSalary"
                type="number"
                register={register}
                size="large"
                placeholder="50000"
                error={errors?.expectedSalary}
              />
              <div>
                <label className="text-xs text-gray-500">
                  Type of Employment
                </label>
                <select
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
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
              </div>
              <div>
                <label htmlFor="aboutMyself" className="text-xs text-gray-500">
                  About Myself
                </label>
                <textarea
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                  {...register("aboutMyself")}
                  placeholder="About you"
                />
                {errors.aboutMyself?.message && (
                  <p className="text-xs text-red-400">
                    {errors.aboutMyself.message.toString()}
                  </p>
                )}
              </div>
              <CldUploadWidget
                uploadPreset="resume"
                onSuccess={(result, { widget }) => {
                  setImg(result.info);
                  widget.close();
                }}
              >
                {({ open }) => {
                  return (
                    <div
                      className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                      onClick={() => open()}
                    >
                      <Image src="/upload.png" alt="" width={28} height={28} />
                      <span>Upload a photo</span>
                    </div>
                  );
                }}
              </CldUploadWidget>
            </div>
            <Button>Create Resume</Button>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default SignInForm;
