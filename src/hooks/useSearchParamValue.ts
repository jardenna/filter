import { useSearchParams } from 'react-router';

export const useSearchParamsValue = (fields: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const values: Record<string, string> = {};
  fields.forEach((key) => {
    values[key] = searchParams.get(key) ?? '';
  });

  const setValue = (key: string, newValue: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (newValue) {
      newParams.set(key, newValue);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return { values, setValue };
};

export default useSearchParamsValue;
