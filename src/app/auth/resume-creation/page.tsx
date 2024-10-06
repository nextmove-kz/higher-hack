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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

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

              <InputField
                label="Age"
                name="age"
                type="number"
                register={register}
                size="large"
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

              <InputField
                label="Education"
                name="education"
                register={register}
                size="large"
                placeholder="Bachelor's degree in Computer Science"
                error={errors?.education}
              />
              <DropdownInputField
                label="Places of Study"
                name="placesOfStudy"
                placeholder="Enter a places of study"
              />
              <BadgeInputField
                label="Skills"
                name="skills"
                register={register}
                placeholder="JavaScript, React, Node.js"
              />
              <InputField
                label="Expected Salary"
                name="expectedSalary"
                type="number"
                register={register}
                size="large"
                placeholder="50000"
                error={errors?.expectedSalary}
              />
              <div className="">
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
              {/* <textarea
              label="About Myself"
              name="aboutMyself"
              register={register}
              placeholder="Briefly describe yourself"
              error={errors?.aboutMyself}
            /> */}
            </div>
            <Button>Create Resume</Button>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default SignInForm;
