import PocketBase from "pocketbase";
import { TypedPocketBase } from "./api_types";
import { cookies } from "next/headers";

export const pocketbaseHost = "https://pocketbase.nextmove.kz:4321";

export function pocketbase() {
  const pb = new PocketBase(pocketbaseHost) as TypedPocketBase;
  pb.autoCancellation(false);

  const cookie = cookies().get("pb_auth");
  if (cookie) {
    pb.authStore.loadFromCookie(`${cookie.value}`);
  }

  return pb;
}
