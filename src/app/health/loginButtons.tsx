"use client";
import { Button } from "@/components/ui/button";
import { doSignIn, doSignUp } from "./actions";
import { logOut, signIn } from "@/api/auth";
import { useRefresh } from "@/hooks/common";
import { AuthModel } from "pocketbase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginButtons = ({
  userExists,
  loggedIn,
  user,
}: {
  userExists: boolean;
  loggedIn: boolean;
  user?: AuthModel;
}) => {
  const refresh = useRefresh();
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      await signIn("ivanlukov@gmail.com", "12345678");
      toast.success("Signed in");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      router.refresh();
    }
  };

  if (loggedIn) {
    return (
      <div>
        <Button onClick={refresh(logOut)} variant="ghost">
          Log out
        </Button>
        <span>{user && user.email}</span>
      </div>
    );
  } else if (userExists) {
    return <Button onClick={handleSignIn}>Sign in</Button>;
  } else {
    return (
      <Button onClick={refresh(doSignUp)} variant="outline">
        Sign up
      </Button>
    );
  }
};

export default LoginButtons;
