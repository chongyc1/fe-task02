import { useState, useEffect } from 'react';

const useScrollToContact = (id: string | undefined, loading: boolean, preloadPage?: number) => {
  const [hasRun, setHasRun] = useState(false);

  const scrollToContact = (id: string) => {
    const element = document.getElementById(`contact-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (!hasRun && preloadPage && !loading && id) {
      scrollToContact(id);
      setHasRun(true);
    }
  }, [loading, id, preloadPage, hasRun]);

  return hasRun;
};

export default useScrollToContact;
