"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { signUpSchema, SignUpSchema } from "@/lib/formValidationSchemas";
import { signUpCandidate } from "@/api/auth";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ClientResponseError } from "pocketbase";
import { getPocketbaseErrorMessage } from "@/api/utils";
// import { useRouter } from "next/navigation";

const ClientSignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (schema) => {
    const { error, data } = await signUpCandidate(
      schema.email,
      schema.password,
      schema.passwordConfirmation
    );

    if (error) {
      console.error("Error during sign up:", error);
      toast({
        title: "Error during sign up",
        description: getPocketbaseErrorMessage(error).message,
        variant: "destructive",
      });
    } else {
      const from = searchParams.get("from") || "/";
      router.push(from);
    }
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center ">
      <Card className="w-full max-w-md p-6">
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div>
            <h1 className="text-xl font-semibold text-center">Sign up</h1>
            <span className="text-xs text-gray-400 font-medium text-center block mt-2">
              Create your account by filling the form below
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <InputField
              label="E-mail"
              name="email"
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
              type="password"
            />
            <InputField
              label="Password confirmation"
              name="passwordConfirmation"
              register={register}
              size="large"
              placeholder="Password confirmation"
              error={errors?.password}
              type="password"
            />
            {/* <Label>Role</Label>
            <select
              className="ring-[1px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("role")}
            >
              <option value="user">user</option>
              <option value="company">company</option>
            </select>
            {errors.role?.message && (
              <p className="text-xs text-red-400">
                {errors.role.message.toString()}
              </p>
            )} */}
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

export default ClientSignUpForm;
