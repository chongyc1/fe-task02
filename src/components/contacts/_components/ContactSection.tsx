import useGetContactsList from "../../../hooks/useGetContactsList";
import ContactRow from "./ContactRow";
import { useRef } from "react";
import cn from "classnames";

const ContactSection = () => {
  const { loading, data, page, setPage } = useGetContactsList();
  const contactRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (contactRef.current) {
      const div = contactRef.current;
      if (div.scrollHeight - div.scrollTop === div.clientHeight) {
        setPage(page + 1);
        console.log('Reached bottom');
      }
    }
  }
  return (
    <div className="flex flex-col h-full">
      <div className="py-5 px-5 border-b">
        <div className="flex flex-col gap-y-3">
          <h3 className="font-semibold text-lg">Contact</h3>
          <input className="w-full bg-transparent border px-2 py-2" placeholder="Search Chracters" />
          <div className="flex gap-x-2">
            <select>
              <option value="">Select Status</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
            <select>
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
      </div>
      <div className={cn('bg-gray-200 h-full relative', {
        'overflow-scroll': !loading,
        'overflow-hidden': loading,
      })}
        ref={contactRef}
        onScroll={() => handleScroll()}
      >
        {data.map((contact, i) => (
          <ContactRow key={`contact-${i}`}
            {...contact}
          />
        ))}
      </div>
    </div>
  )
}

export default ContactSection;