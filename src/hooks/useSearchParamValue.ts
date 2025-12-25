import { useSearchParams } from 'react-router';

type FieldType = 'text' | 'checkbox';

export type FieldConfig = {
  key: string;
  type: FieldType;
};

const useSearchParamsValue = (fields: FieldConfig[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = Object.fromEntries(
    fields.map(({ key, type }) => [
      key,
      type === 'checkbox'
        ? searchParams.has(key)
        : (searchParams.get(key) ?? ''),
    ]),
  );

  const normalizeValue = (value: string | boolean) =>
    typeof value === 'boolean' ? '1' : value;

  const setValue = (key: string, value: string | boolean) => {
    const next = new URLSearchParams(searchParams.toString());

    if (!value) {
      next.delete(key);
      setSearchParams(next);
      return;
    }

    next.set(key, normalizeValue(value));
    setSearchParams(next);
  };

  return { values, setValue };
};

export default useSearchParamsValue;
