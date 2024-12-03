import { useEffect, useState } from "react";
import { getCharacterDetails } from "../apis/contact";
import { Contact } from "../types/Contact";
import { getEpisodeList } from "../apis/episode";
import { Episode } from "../types/Episode";

type useGetCharacterDetailsReturn = {
  loading: boolean;
  data?: Contact;
  episodes: Episode[];
}

const processEpisode = async (episodes: string[]) => {
  const allEpList = Array.isArray(episodes) ? episodes : [];
  const allEps = allEpList.map((ep: string) => ep.replace('https://rickandmortyapi.com/api/episode/', '')).join(',');
  const ret = await getEpisodeList(allEps);
  if (ret.status === 200) {
    return Array.isArray(ret.data) ? ret.data : [{ ...ret.data }];
  }
  return [];
}

const useGetCharacterDetails = (id: number): useGetCharacterDetailsReturn => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Contact>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const getCharacter = async () => {
      setLoading(true);
      setEpisodes([]);
      try {
        const ret = await getCharacterDetails(id);
        if (ret.status === 200) {
          setData(ret.data);
          const proceesedEpisode = await processEpisode(ret.data.episode);
          setEpisodes(proceesedEpisode);
        } else {
          setData(undefined);
          console.log('Invalid character');
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getCharacter();
  }, [id]);

  return {
    loading,
    data,
    episodes,
  }
}

export default useGetCharacterDetails;