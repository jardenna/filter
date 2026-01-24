import { useRef } from 'react';

interface UseDebounceOptions {
  delay?: number;
}

const useDebounce = ({ delay = 500 }: UseDebounceOptions = {}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = (callback: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(callback, delay);
  };

  return { debounce };
};

export default useDebounce;
