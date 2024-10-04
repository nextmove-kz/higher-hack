"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/ui/inputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required!" })
    .email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long!" })
    .max(20, { message: "Password must be at most 20 characters long!" }),
});

type Inputs = z.infer<typeof schema>;

const SignInForm = ({ data }: { data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <h1 className="text-xl font-semibold text-center">Sign in</h1>
          <span className="text-xs text-gray-400 font-medium text-center">
            Enter your credentials to access your account
          </span>
          <div className="flex flex-col gap-4">
            <InputField
              label="E-mail"
              name="email"
              defaultValue={data?.email}
              register={register}
              size="large"
              placeholder="example@mail.com"
              error={errors?.email}
            />
            <InputField
              label="Password"
              name="password"
              register={register}
              size="large"
              placeholder="Password"
              error={errors?.password}
            />
            <div className="flex items-center gap-2">
              <Checkbox />
              <span className="text-xs text-gray-400 font-medium">
                Remember me
              </span>
            </div>
          </div>
          <Button>Sign in</Button>
        </form>
        <div className="p-3 gap-2 flex flex-col">
          <p className="text-xs text-gray-400 font-medium text-center">
            Don't have an account? <Link href="/auth/sign-up">Sign up</Link>
          </p>
          {/* <p className="text-xs text-gray-400 font-medium text-center">
            Forgot your password?{" "}
            <Link href="/auth/forgot-password">Reset password</Link>
          </p> */}
        </div>
      </Card>
    </div>
  );
};

export default SignInForm;