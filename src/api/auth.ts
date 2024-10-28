"use server";
import pocketbase from "./pocketbase";
import { UsersRoleOptions } from "./api_types";

// pocketbase.authStore.onChange((authData) => {
//   console.log("authStore changed", authData);
// });

export const signIn = async (email: string, password: string) => {
  const authData = await pocketbase
    .collection("users")
    .authWithPassword(email, password);

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
  const data = {
    email: email,
    password: password,
    passwordConfirm: passwordConfirmation,
    role: role,
    emailVisibility: true,
  };
  const user = await pocketbase.collection("users").create(data);
  const authData = await signIn(email, password);

  return { user, authData };
};

export const logOut = async () => {
  pocketbase.authStore.clear();
};

export const isLoggedIn = async () => {
  return pocketbase.authStore.isValid;
};

export const getUser = async () => {
  return pocketbase.authStore.model;
};

export const existsUser = async (email: string) => {
  const users = await pocketbase.collection("users").getList(1, 1, {
    filter: pocketbase.filter("email = {:email}", { email }),
    cache: "no-cache",
  });

  return users.totalItems > 0;
};

export const isAuthenticated = () => {
  return pocketbase.authStore.isValid;
};

export const getCurrentUser = () => {
  return pocketbase.authStore.model;
};