import { ClientResponseError } from "pocketbase";

type MockPocketbaseError = {
  data: {
    [key: string]: ErrorData;
  };
};

type ErrorData = { code: string; message: string };

interface ErrorItem extends ErrorData {
  key: string;
}

export const getPocketbaseErrorMessage = (
  response: MockPocketbaseError
): ErrorItem => {
  console.log("response", response);
  return Object.entries(response.data).map(([key, value]) => ({
    key,
    code: value.code,
    message: value.message,
  }))[0];
};
