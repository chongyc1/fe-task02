import { useEffect, useState } from "react"
import CharacterSection from "../contacts/_components/CharacterSection"
import ContactSection from "../contacts/_components/ContactSection"
import { useNavigate, useParams } from "react-router-dom"
import { useContactData } from "../contacts/_components/ContactDataProvider"
import { getContactDetail } from "../../apis/contact"
import { toast } from 'react-toastify';

const Character = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { setCharacter } = useContactData();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsCharacterExist = async (id: string) => {
      try {
        const ret = await getContactDetail(id);
        if (ret.status === 200) {
          setLoading(false);
          console.log(ret);
        } else {
          toast('Character not found', { type: 'error' });
          navigate('/contact');
        }
      } catch (error) {
        console.log(error);
        navigate('/not-found');
      }
    }

    if (id) {
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
        <ContactSection />
      </div>
      <div className="w-4/6">
        <CharacterSection />
      </div>
    </div>
  )
}

export default Character