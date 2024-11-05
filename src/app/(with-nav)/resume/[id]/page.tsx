"use client";
import { getUser } from "@/api/auth";
import { getExperience, getResume, getUserByResume } from "@/api/resume";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

// const data = {
//   fullName: "John Doe",
//   age: 25,
//   workExperience: [
//     {
//       company: "Tech Company",
//       startDate: "2020-01-15",
//       endDate: "2022-05-20",
//       jobDescription:
//         "Worked as a full-stack developer, building web applications using Remix.",
//     },
//   ],
//   education: "Bachelor of Computer Science",
//   placesOfStudy: ["MIT", "Community College"],
//   skills: ["JavaScript", "React", "Remix"],
//   expectedSalary: 50000,
//   typeOfEmployment: "Full-time",
//   img: "/placeholder-user_2.jpg",
//   aboutMyself:
//     "I am a passionate developer with a strong interest in web technologies and software development.",
//   phone: "1234567890",
//   email: "example@mail.com",
//   viewed: 123,
//   suitable: 123,
// };

interface Resume {
  id: string;
  fullName: string;
  age: number | string;
  skills: string;
  expectedSalary: number | string;
  city: string;
  education: string;
  placesOfStudy: string;
  typeOfEmployment: string;
  email: string;
  phoneNumber: string;
  aboutMyself: string;
}

// interface Experience {
//   workExperience: Array<{
//     id: string;
//     company: string;
//     jobDescription: string;
//     startDate: string;
//     endDate: string;
//   }>;
// }

interface Experience {
  workExperience: Array<{
    id: string;
    company: string;
    jobDescription: string;
    startDate: string;
    endDate: string;
  }>;
}

interface User {
  id: string;
  email: string;
}

const resumePage = () => {
  const [data, setData] = useState<Resume>();
  const [user, setUser] = useState<User>();
  const [workExperience, setWorkExperience] = useState<Experience>();
  const router = useRouter();
  const id = useParams<{ id: string }>().id;

  useEffect(() => {
    const fetchResume = async () => {
      const resumeResponse = await getResume(id);
      const resume: Resume = {
        id: resumeResponse.id,
        fullName: resumeResponse.full_name,
        age: resumeResponse.age,
        skills: resumeResponse.skills,
        expectedSalary: resumeResponse.salary,
        city: resumeResponse.city,
        education: resumeResponse.education_levels,
        placesOfStudy: resumeResponse.education,
        typeOfEmployment: resumeResponse.employment_type,
        email: resumeResponse.email,
        phoneNumber: resumeResponse.phone_number,
        aboutMyself: resumeResponse.about,
        // workExperience: resumeResponse.experience.map((exp: any) => ({
        //   company: exp.company,
        //   jobDescription: exp.job_description,
        //   startDate: exp.start_date,
        //   endDate: exp.end_date,
        // })),
      };

      const experienceResponse = await getExperience(resume.id);
      const experience = experienceResponse.map((exp: any) => ({
        id: exp.id,
        company: exp.company_name,
        jobDescription: exp.description,
        startDate: exp.start_date,
        endDate: exp.end_date,
      }));
      setWorkExperience({ workExperience: experience });
      console.log("workExperience", workExperience);
      const user = await getUserByResume(resume.id);
      console.log("user", user);
      console.log("data", resume);
      setUser(user);
      setData(resume);
    };
    fetchResume();
  }, [id]);
  return (
    <div className="mx-auto p-6">
      <div className="rounded-xl">
        <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
          <CardHeader className="relative border-orange-300 border-r-[9px] p-0 bg-orange-500 rounded-t-xl">
            <div className=" flex flex-col border-white rounded-sm m-5">
              <h1 className="flex text-5xl text-white font-semibold mt-5 ml-5 gap-2">
                Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute top-4 right-4"
              >
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M15 18a3 3 0 1 0-6 0" />
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                <circle cx="12" cy="13" r="2" />
              </svg>
              <div className="pl-5 flex items-center space-x-4 p-2 ml-2 mb-2">
                <div>
                  <Image
                    src={"/placeholder-user_2.jpg"}
                    alt="Profile picture"
                    width={200}
                    height={200}
                    className="w-36 h-w-36 object-cover rounded-full cursor-pointer"
                  />
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                  <div className="border-t-2 border-white p-5">
                    <div className="flex">
                      <p className="text-white text-2xl font-semibold">
                        {"Name: "}
                      </p>
                      <p className="text-white text-2xl ml-2">{` ${data?.fullName}`}</p>
                      {/* <GoTriangleLeft
                        color="white"
                        size={24}
                        className="mt-1"
                      /> */}
                    </div>
                    <div className="flex">
                      <p className="text-white text-xl font-semibold">
                        {"Age: "}
                      </p>
                      <p className="text-white text-xl ml-2">{data?.age}</p>
                      {/* <GoTriangleLeft color="white" size={24} /> */}
                    </div>
                  </div>
                </div>
              </div>
              <Image
                src="/clipboard.png"
                alt=""
                width={400}
                height={400}
                className="absolute bottom-0 right-5 "
              />
              {/* TODO: Add stats
              <div className="absolute bottom-1 left-6 flex">
                <p className="text-md text-gray-300 font-medium text-center">{`Suitable vacancies: ${data.suitable} • Viewed: ${data.viewed}`}</p>
              </div> */}
            </div>
          </CardHeader>
          <div>
            <section className="border-b-2 border-gray-300 p-5">
              <h2 className="text-xl font-semibold mb-4 flex gap-2">
                Work Experience
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
                >
                  <path d="M12 12h.01" />
                  <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                  <rect width="20" height="14" x="2" y="6" rx="2" />
                </svg>
              </h2>
              {Array.isArray(workExperience?.workExperience) &&
              workExperience.workExperience.length > 0 ? (
                workExperience?.workExperience.map((job, index) => (
                  <Card className="mb-4" key={index}>
                    <CardContent className="flex flex-col gap-2 p-4">
                      <div className="gap-4 relative">
                        <div>
                          <Label className="text-gray-500">Company</Label>
                          <p>{job.company}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500">Start Date</Label>
                          <p>{job.startDate}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500">End Date</Label>
                          <p>{job.endDate}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label className="text-gray-500">Job Description</Label>
                        <p>{job.jobDescription}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No jobs added</p>
              )}
            </section>
            <section className="border-b-2 border-gray-300 p-5">
              <h2 className="flex text-xl font-semibold mb-4 gap-2 ">
                Skills
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
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </h2>
              <div className="flex gap-2">
                {data?.skills && data.skills.split(",").length > 0 ? (
                  data?.skills
                    .split(",")
                    .map((skill: string, index: number) => (
                      <div key={skill + index}>
                        <Badge>{skill}</Badge>
                      </div>
                    ))
                ) : (
                  <p>No skills added</p>
                )}
              </div>
            </section>
            <section className="border-b-2 border-gray-300 p-5">
              <h2 className="flex text-xl font-semibold mb-4 gap-2">
                Education
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
                >
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                  <path d="M22 10v6" />
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                </svg>
              </h2>
              {data?.education && data?.education.length > 0 ? (
                <Card className="mb-4">
                  <CardContent className="flex flex-col gap-2 p-4">
                    <Label className="text-gray-500">Education degree</Label>
                    <p>{data?.education}</p>
                    <div className="flex gap-2 relative">
                      <div>
                        <Label className="text-gray-500">Places of Study</Label>
                        <div className="flex gap-2">
                          {data?.placesOfStudy &&
                          data?.placesOfStudy.split(", ").length > 0 ? (
                            data?.placesOfStudy
                              .split(", ")
                              .map((place, index) => (
                                <div key={place + index}>
                                  <p>{`${index + 1}. ${place}`}</p>
                                </div>
                              ))
                          ) : (
                            <p>No places added</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <p>No education added</p>
              )}
            </section>
            <section className="border-b-2 border-gray-300 p-5">
              <h2 className="flex text-xl font-semibold mb-4 gap-2">
                Expectations
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
                  <Label className="text-gray-500">Expected Salary</Label>
                  <p>{data?.expectedSalary}</p>
                  <Label className="text-gray-500">Type of Employment</Label>
                  <p>{data?.typeOfEmployment}</p>
                  <div className="mt-4">
                    <Label className="text-gray-500">About Myself</Label>
                    <p>{data?.aboutMyself}</p>
                  </div>
                </CardContent>
              </Card>
            </section>
            <section className="p-5">
              <h2 className="flex text-xl font-semibold mb-4 gap-2">
                Contacts
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
                >
                  <path d="M16 2v2" />
                  <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                  <path d="M8 2v2" />
                  <circle cx="12" cy="11" r="3" />
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                </svg>
              </h2>
              <Card className="mb-4">
                <CardContent className="flex flex-col gap-2 p-4">
                  <Label className="text-gray-500">Phone</Label>
                  <p>{user?.phone}</p>
                  <Label className="text-gray-500">Email</Label>
                  <p>{user?.email}</p>
                </CardContent>
              </Card>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default resumePage;
