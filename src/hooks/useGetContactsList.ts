import { useEffect, useState } from "react";
import { getContactList } from "../apis/contact";
import { toast } from "react-toastify";

export type Contact = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

type useGetContactsListReturn = {
  data: Contact[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
}

const useGetContactsList = (): useGetContactsListReturn => {

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [contactList, setContactList] = useState<Contact[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getContact = async () => {
      setLoading(true);
      console.log(1111);
      try {
        const ret = await getContactList(page, name, status, gender, signal);
        if (ret.status === 200) {
          const data = Array.isArray(ret.data?.results) ? ret.data.results : [];
          setLoading(false);
          setContactList((prevList) => [...prevList, ...data]);
          //get data
        } else {
          if (ret.code === "ERR_CANCELED") {
            //continue loading
          } else {
            // other error
          }
        }
      } catch (e) {
        console.log('UNEXPECTED ERROR', e);
        toast.error('Unexpected error');
        setLoading(false);
      }

    };
    getContact();

    return () => {
      controller.abort();
    };
  }, [page, gender, name, status]);
  return {
    data: contactList,
    loading,
    page: page,
    setPage: setPage,
  }
}

export default useGetContactsList;