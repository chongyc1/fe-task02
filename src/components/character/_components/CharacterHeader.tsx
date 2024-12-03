import { useNavigate } from "react-router-dom";
import { useContactData } from "../../contacts/_components/ContactDataProvider";
import Avatar from "./Avatar";

const CharacterHeader = ({ loading, name }: { loading: boolean, name: string }) => {
  const { selectedChracter, setCharacter } = useContactData();

  const navigate = useNavigate();

  const backToContact = () => {
    setCharacter(0);
    navigate('/contact');
  }

  return (
    <div className="flex items-center w-full">
      <div>
        <Avatar />
      </div>
      <div className="pl-5">
        <div>
          <h1 className="text-3xl">
            {selectedChracter === 0 ? <i>Select Character</i> : loading ? '' : name}
          </h1>
        </div>
      </div>
      <div className="absolute right-0 pe-5">
        <button
          className="px-3 py-1 bg-white rounded-md hover:bg-gray-200"
          onClick={() => backToContact()}>
          Back
        </button>
      </div>
    </div>
  )
}

export default CharacterHeader;