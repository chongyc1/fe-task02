import { useEffect, useState } from "react"
import CharacterSection from "../contacts/_components/CharacterSection"
import ContactSection from "../contacts/_components/ContactSection"
import { useNavigate, useParams } from "react-router-dom"
import { useContactData } from "../contacts/_components/ContactDataProvider"
import { getCharacterDetails } from "../../apis/contact"
import { toast } from 'react-toastify';

const Character = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { setCharacter } = useContactData();
  const navigate = useNavigate();

  const [preloadPage, sePreloadPage] = useState(1);

  useEffect(() => {
    const checkIsCharacterExist = async (id: string) => {
      try {
        const ret = await getCharacterDetails(parseInt(id));
        if (ret.status === 200) {
          setLoading(false);
        } else {
          toast.error('Invalid character');
          navigate('/contact');
        }
      } catch (error) {
        console.log(error);
        navigate('/not-found');
      }
    }

    if (id) {
      const contactPage = Math.ceil(parseInt(id) / 20);
      if (contactPage !== 1) {
        sePreloadPage(contactPage);
      }
      checkIsCharacterExist(id);
      setCharacter(parseInt(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      Loading...
    </div>
  );

  return (
    <div className="flex h-full border-l-2">
      <div className="w-2/6 bg-gray-500">
        <ContactSection preloadPage={preloadPage} id={id} />
      </div>
      <div className="w-4/6">
        <CharacterSection />
      </div>
    </div>
  )
}

export default Character