import { z } from "zod";

export const signInSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "Email is required!" })
      .email({ message: "Invalid email address!" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long!" })
      .max(20, { message: "Password must be at most 20 characters long!" }),
  });

  export type SignInSchema = z.infer<typeof signInSchema>;

  export const signUpSchema = z.object({
    fullName: z
      .string()
      .nonempty({ message: "Full name is required!" })
      .min(2, { message: "Name must be at least 2 characters long!" }),
    email: z
      .string()
      .nonempty({ message: "Email is required!" })
      .email({ message: "Invalid email address!" }),
    phone: z
      .string()
      .nonempty({ message: "Phone is required!" })
      .min(10, { message: "Phone number must be at least 10 digits long!" })
      .regex(/^[0-9]+$/, { message: "Phone number must contain only digits!" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long!" })
      .max(20, { message: "Password must be at most 20 characters long!" }),

    // role: z
    //   .enum(["user", "company"], {
    //     errorMap: () => ({ message: "Please select a valid role" }),
    //   })
    //   .default("user"),
    passwordConfirmation: z
      .string()
      .min(8, "Password confirmation must be at least 8 characters long"),
    }).refine((data) => data.password === data.passwordConfirmation, {
      path: ["passwordConfirmation"],
      message: "Passwords do not match",
});

  export type SignUpSchema = z.infer<typeof signUpSchema>;


const MAX_FILE_SIZE = 20000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const resumeCreationSchema = z.object({
  fullName: z.string().nonempty({ message: "Full name is required!" }),
  age: z.preprocess((value) => Number(value), z
  .number({ invalid_type_error: "Age must be a number" })
  .min(18, { message: "You must be at least 18 years old" })
  ),

// Work experience section
  workExperience: z
    .array(
      z.object({
        company: z
          .string()
          .min(1, { message: "Company name is required" })
          .max(32, { message: "Company name must be no more than 32 characters" }),
        startDate: z
          .string()
          .refine(
            (date) => !isNaN(Date.parse(date)),
            { message: "Start date must be a valid date." }
          ),
        endDate: z
          .string()
          .optional()
          .refine(
            (date) => date === undefined || date === "" || !isNaN(Date.parse(date)),
            { message: "End date must be a valid date." }
          ),
        jobDescription: z
          .string()
          .min(1, { message: "Job description is required" })
          .max(1000, { message: "Job description must be no more than 1000 characters." }),
      })
    )
  .optional()
  .default([]),

    education: z.string().nonempty({ message: "Education is required!" }),
    placesOfStudy: z.array(z.string()).optional().default([]),
    skills: z.array(z.string()).optional().default([]),
    expectedSalary: z.preprocess((value) => Number(value), z
      .number({ invalid_type_error: "Salary must be a number" })
      .positive({ message: "Salary must be a positive number" })
    ),
    typeOfEmployment: z.enum(
      ["Full-time", "Part-time", "Freelance", "Contract"],
      {
        errorMap: () => ({ message: "Please select a valid type of employment" }),
      }
    ),
    img: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: `Max file size is${MAX_FILE_SIZE / 1000000}MB`,
    })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
    aboutMyself: z
      .string()
      .min(10, { message: "About myself must be at least 10 characters" }),
});

export type ResumeCreationSchema = z.infer<typeof resumeCreationSchema>;

export const experienceSchema = z.object({
  workExperience: z
    .array(
      z.object({
        company: z
          .string()
          .min(1, { message: "Company name is required" })
          .max(32, { message: "Company name must be no more than 32 characters" }),
        startDate: z
          .string()
          .refine(
            (date) => !isNaN(Date.parse(date)),
            { message: "Start date must be a valid date." }
          ),
        endDate: z
          .string()
          .optional()
          .refine(
            (date) => date === undefined || date === "" || !isNaN(Date.parse(date)),
            { message: "End date must be a valid date." }
          ),
        jobDescription: z
          .string()
          .min(1, { message: "Job description is required" })
          .max(1000, { message: "Job description must be no more than 1000 characters." }),
      })
    )
  .optional()
  .default([]),
})

export type experienceSchema = z.infer<typeof experienceSchema>;