import { useContactData } from "./ContactDataProvider";

const CharacterSection = () => {
  const { selectedChracter } = useContactData();

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
                {selectedChracter === 0 ? <i>Select Character</i> : 'Name'}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-[calc(100%-155px)]">
        <PersonalInfo />
        <div className="py-2 px-5">
          <h3 className="font-semibold text-2xl">Episode Info</h3>
        </div>
        <EpisodesInfo />
      </div>
    </div>

  )
}

const PersonalInfo = () => {
  return (
    <div className="px-5 py-2">
      <h3 className="font-semibold text-2xl pb-2">Personal Info</h3>
      <div className="border border-2 border-gray-500 p-2">
        <DetailsRow name="Status" data="Value" />
        <DetailsRow name="Gender" data="Value" />
        <DetailsRow name="Species" data="Value" />
        <DetailsRow name="Location" data="Value" />
        <DetailsRow name="Origin" data="Value" />
        <DetailsRow name="Created Date" data="Value" />
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

const EpisodesInfo = () => {
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
      {Array.from({ length: 30 }).map((_, i) => (
        <div className="grid grid-cols-4 px-5 py-3 border-b border-gray-500" key={`epi-${i}`}>
          <div>Ep {i + 1}</div>
          <div>Air Date</div>
          <div>Episode</div>
          <div>Created Date</div>
        </div>
      ))}
    </div>
  )
}

export default CharacterSection;