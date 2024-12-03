import { useEffect, useState } from "react";
import { getContactList } from "../apis/contact";
import { toast } from "react-toastify";
import { Contact } from "../types/Contact";

export type FilterType = 'name' | 'status' | 'gender' | 'clear';
type FilterState = {
  name: string;
  status: string;
  gender: string;
};

const INITIAL_FILTER: FilterState = { name: "", status: "", gender: "" };

type useGetContactsListReturn = {
  data: Contact[];
  loading: boolean;
  page: number;
  maxPage: number;
  filter: { name: string, status: string, gender: string },
  searchMode: boolean;
  setPage: (page: number) => void;
  setFilterData: (type: FilterType, value?: string) => void;
}

const useGetContactsList = (preloadPage?: number): useGetContactsListReturn => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(preloadPage ? preloadPage : 1);
  const [maxPage, setMaxPage] = useState(1);
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [initPreload, setInitPreload] = useState(false);
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [searchMode, setSearchMode] = useState(false);

  const resetData = () => {
    setContactList([]);
    //delay to prevent data won't go to page 1
    setTimeout(() => {
      setPage(1);
      setSearchMode(false);
      setFilter(INITIAL_FILTER);
    }, 100);
  }

  const setFilterData = (type: FilterType, value?: string) => {
    if (type === 'clear') {
      resetData();
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [type]: value,
      }));
      if (!searchMode) setPage(1);
    }
  }

  useEffect(() => {
    if (filter.name !== "" || filter.status !== "" || filter.gender !== "") {
      setSearchMode(true);
      setTimeout(() => {
        setPage(1);
      }, 500);
    } else {
      setSearchMode(false);
    }
  }, [filter]);


  // get contact list
  const getContact = async (signal: AbortSignal) => {
    setLoading(true);
    try {
      const ret = await getContactList(page, filter.name, filter.status, filter.gender, signal);
      if (ret.status === 200) {
        setMaxPage(ret.data.info.pages);
        const data = Array.isArray(ret.data?.results) ? ret.data.results : [];
        setContactList((prev) =>
          searchMode && page === 1 ? data : [...prev, ...data]
        );
      } else {
        console.log('ERROR', ret.response?.data?.error);
        setContactList([]);
      }
    } catch (e) {
      console.log('UNEXPECTED ERROR', e);
      toast.error('Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  // preload contact list
  const preLoadContact = async (preloadPage: number, signal: AbortSignal) => {
    setLoading(true);
    try {
      const contacts: Contact[] | ((prevState: Contact[]) => Contact[]) = [];
      for (let loadPage = 0; loadPage < preloadPage; loadPage++) {
        const ret = await getContactList(loadPage + 1, filter.name, filter.status, filter.gender, signal);
        if (ret.status === 200) {
          setMaxPage(ret.data.info.pages);
          contacts.push(...ret.data.results);
        }
      }
      setContactList(contacts);
      setInitPreload(true);
    } catch (e) {
      console.log('UNEXPECTED ERROR-', e);
      toast.error('Unexpected error-');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (preloadPage !== undefined && preloadPage !== 1 && !initPreload) {
      preLoadContact(preloadPage, signal);
    } else {
      getContact(signal);
    }

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, searchMode, preloadPage]);

  return {
    data: contactList,
    loading,
    page,
    maxPage,
    filter,
    searchMode,
    setPage,
    setFilterData,
  }
}

export default useGetContactsList;
