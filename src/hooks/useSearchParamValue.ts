/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useSearchParams } from 'react-router';

type FieldType = 'text' | 'checkbox';

export type FieldConfig = {
  key: string;
  type: FieldType;
};

export const useSearchParamsValue = (fields: FieldConfig[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const values: Record<string, string | boolean> = {};
  fields.forEach(({ key, type }) => {
    values[key] =
      type === 'checkbox'
        ? searchParams.has(key)
        : (searchParams.get(key) ?? '');
  });

  const setValue = (key: string, value: string | boolean) => {
    const next = new URLSearchParams(searchParams.toString());

    if (typeof value === 'boolean') {
      value ? next.set(key, '1') : next.delete(key);
    } else {
      value ? next.set(key, value) : next.delete(key);
    }

    setSearchParams(next);
  };

  return { values, setValue };
};

export default useSearchParamsValue;
