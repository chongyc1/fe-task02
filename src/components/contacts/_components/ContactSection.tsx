import useGetContactsList from "../../../hooks/useGetContactsList";
import ContactRow from "./ContactRow";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import useScrollToContact from "../../../hooks/useScrollToCharacterRow";

const ContactSection = ({ preloadPage, id }: { preloadPage?: number, id?: string }) => {
  const { loading, data,
    maxPage, page, setPage,
    filter,
    setFilterData,
    searchMode,
  } = useGetContactsList(preloadPage);
  const contactRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (contactRef.current) {
      const div = contactRef.current;
      if (div.scrollHeight - div.scrollTop === div.clientHeight) {
        if (loading) return;
        if (page === maxPage) return;
        setPage(page + 1);
      }
    }
  }

  const [nameInput, setNameInput] = useState<string | undefined>();
  useEffect(() => {
    let delayTyping: number | undefined;
    if (nameInput !== undefined) {
      delayTyping = setTimeout(() => {
        setFilterData('name', nameInput);
      }, 800);
    }

    return () => clearTimeout(delayTyping);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameInput]);


  useScrollToContact(id, loading, preloadPage);

  return (
    <div className="flex flex-col h-full">
      <div className="py-5 px-5 border-b">
        <div className="flex flex-col gap-y-3">
          <h3 className="font-semibold text-lg">Contact</h3>
          <input className="w-full bg-transparent border px-2 py-2" placeholder="Search Chracters"
            value={nameInput} onChange={(e) => setNameInput(e.target.value)}
          />
          <div className="flex gap-x-2">
            <select value={filter.status} onChange={(e) => setFilterData('status', e.target.value)}
              className="px-1 py-1 bg-gray-300 hover:bg-gray-400 rounded-md"
            >
              <option value="">Select Status</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
            <select value={filter.gender} onChange={(e) => setFilterData('gender', e.target.value)}
              className="px-1 py-1 bg-gray-300 hover:bg-gray-400 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
            {searchMode && (
              <button className="px-3 py-1 rounded-md
              bg-gray-300 active:bg-gray-700 active:text-white hover:bg-gray-400"
                onClick={() => setFilterData('clear')}
              >Clear</button>
            )}
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
        {loading &&
          <div className="sticky w-full h-full bg-[#00000075] top-0 flex items-center justify-center">
            Loading...
          </div>
        }
        {data.length === 0 && <div className="p-5">No data</div>}
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