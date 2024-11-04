import PocketBase from "pocketbase";
import { TypedPocketBase } from "./api_types";

const clientPocketBase = new PocketBase(
  "https://pocketbase.nextmove.kz:4321"
) as TypedPocketBase;
clientPocketBase.autoCancellation(false);
export default clientPocketBase;
