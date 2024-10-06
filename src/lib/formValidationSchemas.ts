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
  });

  export type SignUpSchema = z.infer<typeof signUpSchema>;

  export const resumeCreationSchema = z.object({
    fullName: z.string().nonempty({ message: "Full name is required!" }),
    age: z.preprocess((value) => Number(value), z
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, { message: "You must be at least 18 years old" })
    ),
    workExperience: z
      .string()
      .nonempty({ message: "Work experience is required!" }),
    education: z.string().nonempty({ message: "Education is required!" }),
    placesOfStudy: z
      .string()
      .nonempty({ message: "Places of study are required!" }),
    skills: z.string().nonempty({ message: "Skills are required!" }),
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
    img: z.any(),
    aboutMyself: z
      .string()
      .min(10, { message: "About myself must be at least 10 characters" }),
  });

  export type ResumeCreationSchema = z.infer<typeof resumeCreationSchema>;