"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { signUpSchema, SignUpSchema } from "@/lib/formValidationSchemas";
// import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <h1 className="text-xl font-semibold text-center">Sign up</h1>
          <span className="text-xs text-gray-400 font-medium text-center">
            Create your account by filling the form below
          </span>
          <div className="flex flex-col gap-4">
            <InputField
              label="Full Name"
              name="fullName"
              register={register}
              size="large"
              placeholder="John Doe"
              error={errors?.fullName}
            />
            <div className="flex items-center gap-2">
              <InputField
                label="E-mail"
                name="email"
                register={register}
                size="large"
                placeholder="example@mail.com"
                error={errors?.email}
              />
              <InputField
                label="Phone"
                name="phone"
                register={register}
                size="large"
                placeholder="1234567890"
                error={errors?.phone}
              />
            </div>
            <InputField
              label="Password"
              name="password"
              register={register}
              size="large"
              placeholder="Password"
              error={errors?.password}
            />
          </div>
          <Button>Create account</Button>
        </form>
        <div className="p-3 gap-2 flex flex-col">
          <p className="text-xs text-gray-400 font-medium text-center">
            Already have an account? <Link href="/auth/sign-in">Sign in</Link>
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

export default SignUpForm;
