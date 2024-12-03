import { instance } from "./base";

export const getContactList = (
  page: number,
  name: string,
  status: string,
  gender: string,
  signal: AbortSignal
) => instance.get("character",
  {
    signal,
    params: {
      page,
      name,
      status,
      gender,
    }
  },
).then((response) => {
  return response
}).catch((error) => {
  return error;
});


export const getCharacterDetails = (id: number) => instance.get(`character/${id}`
).then((response) => {
  return response;
}).catch((error) => {
  return error;
});