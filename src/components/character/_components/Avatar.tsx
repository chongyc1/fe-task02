import { useContactData } from "../../contacts/_components/ContactDataProvider";

const Avatar = () => {
  const { selectedChracter } = useContactData();
  return (
    <>
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
    </>
  )
}

export default Avatar;