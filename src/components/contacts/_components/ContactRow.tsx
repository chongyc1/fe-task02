import { useNavigate } from "react-router-dom";
import { useContactData } from "./ContactDataProvider";
import { Contact } from "../../../types/Contact";

const ContactRow = ({ id, name, species, image,
  // gender, status //DEBUG USE
}: Contact) => {
  const navigate = useNavigate();
  const { setCharacter } = useContactData();
  const handleNavigate = (id: number) => {
    setCharacter(id);
    navigate(`/contact/${id}`);
  }

  return (
    <div className="group cursor-pointer" onClick={() => handleNavigate(id)} id={`contact-${id}`}>
      <div className="border border-b-gray-400 px-2 py-3 group-hover:bg-gray-300">
        <div className="flex items-center">
          <div>
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img
                src={image}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="pl-3 min-w-0">
            <div className="truncate font-semibold">{name}</div>
            <div className="italic">{species}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactRow;