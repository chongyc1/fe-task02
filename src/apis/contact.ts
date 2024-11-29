import axios from "axios";


export const getContactList = (
  page: number,
  name: string,
  status: string,
  gender: string,
  signal: AbortSignal
) => axios.get("https://rickandmortyapi.com/api/character",
  {
    signal,
    params: {
      page,
      name,
      status,
      gender,
      limit: 100,
    }
  },
).then((response) => {
  return response
}).catch((error) => {
  return error
});


export const getContactDetail = (id: string) => axios.get(`https://rickandmortyapi.com/api/character/${id}`
).then((response) => {
  return response
}).catch((error) => {
  return error
});