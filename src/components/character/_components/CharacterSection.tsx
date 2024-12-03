import useGetCharacterDetails from "../../../hooks/useGetCharacterDetails";
import { Contact } from "../../../types/Contact";
import { useContactData } from "../../contacts/_components/ContactDataProvider";
import PersonalInfo from "./PersonalInfo";
import EpisodesInfo from "./EpisodeInfo";
import CharacterHeader from "./CharacterHeader";

const CharacterSection = () => {
  const { selectedChracter } = useContactData();
  const { loading, data, episodes } = useGetCharacterDetails(selectedChracter);

  return (
    <div className="h-full">
      <div className="flex px-5 py-5 bg-gray-500 border-b border-l h-[155px]">
        <CharacterHeader
          loading={loading}
          name={data?.name || "-"}
        />
      </div>
      <div className="flex flex-col h-[calc(100%-155px)]">
        <PersonalInfo {...(data as Contact)} loading={loading} />
        <div className="py-2 px-5">
          <h3 className="font-semibold text-2xl">Episode Info</h3>
        </div>
        <EpisodesInfo episodes={episodes} />
      </div>
    </div>

  )
}

export default CharacterSection;