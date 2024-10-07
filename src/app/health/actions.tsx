"use server";

import { logOut, signIn, signUpCandidate } from "@/api/auth";

export const doSignUp = async () => {
  await signUpCandidate("ivanlukov@gmail.com", "12345678", "12345678");
};

export const doSignIn = async () => {
  try {
    await signIn("ivanlukov@gmail.com", "12345678");
    return { success: true, error: null };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};
