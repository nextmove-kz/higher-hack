"use server";
import { pocketbase } from "./pocketbase";
import { UsersRoleOptions } from "./api_types";
import { AuthModel, RecordModel } from "pocketbase";
import { cookies } from "next/headers";

export const signIn = async (email: string, password: string) => {
  const pb = pocketbase();
  const authData = await pb
    .collection("users")
    .authWithPassword(email, password);

  cookies().set("pb_auth", pb.authStore.exportToCookie());

  return authData;
};

export const signUpCandidate = async (
  email: string,
  password: string,
  passwordConfirmation: string
) => await signUp(email, password, passwordConfirmation, UsersRoleOptions.user);

export const signUpCompany = async (
  email: string,
  password: string,
  passwordConfirmation: string
) =>
  await signUp(email, password, passwordConfirmation, UsersRoleOptions.company);

export const signUp = async (
  email: string,
  password: string,
  passwordConfirmation: string,
  role: UsersRoleOptions
) => {
  try {
    const data = {
      email: email,
      password: password,
      passwordConfirm: passwordConfirmation,
      role: role,
      emailVisibility: true,
    };
    const user = await pocketbase().collection("users").create(data);
    const authData = await signIn(email, password);
    return { error: null, data: { user, authData } };
  } catch (error: any) {
    return { error: error.response, data: null };
  }
};

export const logOut = async () => {
  pocketbase().authStore.clear();
  cookies().delete("pb_auth");
};

export const isLoggedIn = async () => {
  return pocketbase().authStore.isValid as unknown as Promise<boolean>;
};

export const getUser = async () => {
  return pocketbase().authStore.model as Promise<RecordModel>;
};

export const existsUser = async (email: string) => {
  const users = await pocketbase()
    .collection("users")
    .getList(1, 1, {
      filter: pocketbase().filter("email = {:email}", { email }),
      cache: "no-cache",
    });

  return users.totalItems > 0;
};
