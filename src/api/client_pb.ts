import PocketBase from "pocketbase";
import { TypedPocketBase } from "./api_types";
import { pocketbaseHost } from "./pocketbase";

const clientPocketBase = new PocketBase(pocketbaseHost) as TypedPocketBase;
clientPocketBase.autoCancellation(false);
export default clientPocketBase;
