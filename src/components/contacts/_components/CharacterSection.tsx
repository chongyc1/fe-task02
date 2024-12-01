import dayjs from "dayjs";
import useGetCharacterDetails from "../../../hooks/useGetCharacterDetails";
import { Contact } from "../../../types/Contact";
import { useContactData } from "./ContactDataProvider";
import { Episode } from "../../../types/Episode";

const CharacterSection = () => {
  const { selectedChracter } = useContactData();
  const { loading, data, epis } = useGetCharacterDetails(selectedChracter);

  return (
    <div className="h-full">
      <div className="flex px-5 py-5 bg-gray-500 border-b border-l h-[155px]">
        <div className="flex items-center">
          <div>
            {selectedChracter === 0 ?
              <div className="w-[110px] h-[110px] bg-gray-200 rounded-full" />
              :
              <div className="w-[110px] h-[110px] rounded-full overflow-hidden">
                <img
                  src={`https://rickandmortyapi.com/api/character/avatar/${selectedChracter}.jpeg`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            }
          </div>
          <div className="pl-5">
            <div className="text-3xl">
              <h1>
                {selectedChracter === 0 ? <i>Select Character</i> : loading ? '' : data?.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-[calc(100%-155px)]">
        <PersonalInfo {...(data as Contact)} loading={loading} />
        <div className="py-2 px-5">
          <h3 className="font-semibold text-2xl">Episode Info</h3>
        </div>
        <EpisodesInfo episodes={epis} />
      </div>
    </div>

  )
}

const PersonalInfo = ({ status, gender, species, location, origin, created, loading }: Contact & { loading: boolean }) => {
  const getValue = (value: string | undefined | null, isDate?: boolean) =>
    loading ? "..." : isDate ?
      dayjs(value).format('YYYY-MM-DD hh:mm:ss')
      : value || "-";
  return (
    <div className="px-5 py-2">
      <h3 className="font-semibold text-2xl pb-2">Personal Info</h3>
      <div className="border border-2 border-gray-500 p-2">
        <DetailsRow name="Status" data={getValue(status)} />
        <DetailsRow name="Gender" data={getValue(gender)} />
        <DetailsRow name="Species" data={getValue(species)} />
        <DetailsRow name="Location" data={getValue(location?.name)} />
        <DetailsRow name="Origin" data={getValue(origin?.name)} />
        <DetailsRow name="Created Date" data={getValue(created, true)} />
      </div>
    </div>
  )
}

const DetailsRow = ({ name, data }: { name: string, data: string }) => {
  return (
    <div className="flex justify-center pb-1">
      <div className="w-[25%]">
        <span className="font-semibold">{name}</span>
        <span className="float-right">:</span></div>
      <div className="w-[75%] pl-5">
        <span className="font-semibold">{data}</span>
      </div>
    </div>
  )
}

const EpisodesInfo = ({ episodes }: { episodes: Episode[] }) => {
  return (
    <div className="-full overflow-scroll">
      <div className="sticky top-0">
        <div className="grid grid-cols-4 px-5 py-2 border-b-4 border-black bg-white font-bold">
          <div>Name</div>
          <div>Air Date</div>
          <div>Episode</div>
          <div>Created Date</div>
        </div>
      </div>
      {episodes.map((epi, i) => (
        <div className="grid grid-cols-4 px-5 py-3 border-b border-gray-500" key={`epi-${i}`}>
          <div>{epi.name}</div>
          <div>{dayjs(epi.air_date).format("YYYY-MM-DD hh:mm:ss")}</div>
          <div>{epi.episode}</div>
          <div>{dayjs(epi.created).format("YYYY-MM-DD hh:mm:ss")}</div>
        </div>
      ))}
    </div>
  )
}

export default CharacterSection;