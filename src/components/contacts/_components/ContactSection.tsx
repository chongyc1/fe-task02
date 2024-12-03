import { useRef, useState } from "react";
import cn from "classnames";
import useGetContactsList from "../../../hooks/useGetContactsList";
import useScrollToContact from "../../../hooks/useScrollToContact";
import ContactRow from "./ContactRow";
import ContactFilterSection from "./ContactFilterSection";
import useDebounced from "../../../hooks/useDebounced";

const ContactSection = ({ preloadPage, id }: { preloadPage?: number; id?: string }) => {
  const {
    loading,
    data,
    maxPage,
    page,
    setPage,
    filter,
    setFilterData,
    searchMode,
  } = useGetContactsList(preloadPage);

  const contactRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string | undefined>();

  // input for filtering
  useDebounced(() => {
    if (inputValue !== undefined) {
      setFilterData("name", inputValue);
    }
  }, 800, [inputValue]);

  // Handle infinite scrolling
  const handleScroll = () => {
    if (contactRef.current) {
      const div = contactRef.current;
      if (div.scrollHeight - div.scrollTop === div.clientHeight && !loading && page < maxPage) {
        setPage(page + 1);
      }
    }
  };

  const clearFilter = () => {
    setInputValue(undefined);
    setFilterData("clear");
  };

  // Scroll to a contact when `id` is provided (/contact/:id)
  useScrollToContact(id, loading, preloadPage);

  return (
    <div className="flex flex-col h-full">
      <ContactFilterSection
        filter={filter}
        searchMode={searchMode}
        setFilterData={setFilterData}
        clearFilter={clearFilter}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <div
        className={cn("bg-gray-200 h-full relative", {
          "overflow-scroll": !loading,
          "overflow-hidden": loading,
        })}
        ref={contactRef}
        onScroll={handleScroll}
      >
        {loading && (
          <div className="sticky w-full h-full bg-[#00000075] top-0 flex items-center justify-center">
            Loading...
          </div>
        )}
        {data.length === 0 && <div className="p-5">No data</div>}
        {data.map((contact, i) => (
          <ContactRow key={`contact-${i}`} {...contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactSection;
