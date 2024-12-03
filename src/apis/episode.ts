import { instance } from "./base";

export const getEpisodeList = (episodes: string) => instance.get(`episode/${episodes}`,
  {
    params: {
    }
  },
).then((response) => {
  return response
}).catch((error) => {
  return error
});