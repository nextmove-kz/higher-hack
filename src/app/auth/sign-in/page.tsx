"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { signInSchema, SignInSchema } from "@/lib/formValidationSchemas";
import { signIn } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { getPocketbaseErrorMessage } from "@/api/utils";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();
  const toaster = useToast();

  // Отправка формы
  const onSubmit = handleSubmit(async (data) => {
    await signIn(data.email, data.password);
    router.push("/");
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center ">
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
              type="password"
              error={errors?.password}
            />
          </div>
          <Button>Sign in</Button>
        </form>
        <div className="p-3 gap-2 flex flex-col">
          <p className="text-xs text-gray-400 font-medium text-center">
            Don't have an account? <Link href="/auth/sign-up">Sign up</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignInForm;
