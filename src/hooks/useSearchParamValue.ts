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
        ? searchParams.getAll(key)
        : (searchParams.get(key) ?? ''),
    ]),
  );

  const normalizeValue = (value: string) => value;

  const setValue = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete(key);
    next.append(key, normalizeValue(value));
    setSearchParams(next);
  };

  const toggleValue = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const current = next.getAll(key);

    next.delete(key);

    if (!current.includes(value)) {
      [...current, value].forEach((value) => {
        next.append(key, value);
      });
    } else {
      current
        .filter((value) => value !== value)
        .forEach((value) => {
          next.append(key, value);
        });
    }

    setSearchParams(next);
  };

  return { values, setValue, toggleValue };
};

export default useSearchParamsValue;
