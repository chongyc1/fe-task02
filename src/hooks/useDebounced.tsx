import { useEffect } from "react";

const useDebounced = (callback: () => void, delay: number, deps: unknown[]) => {
  useEffect(() => {
    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
};

export default useDebounced;