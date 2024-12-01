import { useEffect, useState } from "react";
import { getContactList } from "../apis/contact";
import { toast } from "react-toastify";
import { Contact } from "../types/Contact";

type FilterType = 'name' | 'status' | 'gender' | 'clear';
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

  const [filter, setFilter] = useState({
    name: "",
    status: "",
    gender: "",
  })

  const [searchMode, setSearchMode] = useState(false);

  const setFilterData = (type: FilterType, value?: string) => {
    if (type === 'clear') {
      setSearchMode(false);
      setFilter({
        name: "",
        status: "",
        gender: "",
      });
      return;
    }
    if (!searchMode) setPage(1);
    setFilter((prevFilter) => ({
      ...prevFilter,
      [type]: value,
    }))
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
  }, [filter])

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getContact = async () => {
      setLoading(true);
      try {
        const ret = await getContactList(page, filter.name, filter.status, filter.gender, signal);
        if (ret.status === 200) {
          setMaxPage(ret.data.info.pages);
          const data = Array.isArray(ret.data?.results) ? ret.data.results : [];
          setLoading(false);
          if (searchMode && page === 1) {
            setContactList(data);
          } else {
            setContactList((prevList) => [...prevList, ...data]);
          }
          //get data
        } else {
          if (ret.code === "ERR_CANCELED") {
            //continue loading
          } else {
            console.log('ERROR', ret.response?.data?.error);
            // other error
          }
          setContactList([]);
          setLoading(false);
        }
      } catch (e) {
        console.log('UNEXPECTED ERROR', e);
        toast.error('Unexpected error');
        setLoading(false);
      }
    };

    const preLoadContact = async (preloadPage: number) => {
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
        setLoading(false);
      } catch (e) {
        console.log('UNEXPECTED ERROR-', e);
        toast.error('Unexpected error-');
        setLoading(false);
      }
    }

    if (preloadPage !== undefined && preloadPage !== 1 && !initPreload) {
      preLoadContact(preloadPage);
    } else {
      getContact();
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
    searchMode: searchMode,
    setPage: setPage,
    setFilterData: setFilterData,
  }
}

export default useGetContactsList;