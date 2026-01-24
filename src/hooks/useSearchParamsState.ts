import { useSearchParams } from 'react-router';

type SearchParamState = Record<string, string | string[]>;

const isArray = (value: unknown): value is string[] => Array.isArray(value);

const useSearchParamsState = <T extends SearchParamState>(defaults: T) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParamValue = (key: string, defaultValue: string | string[]) => {
    if (isArray(defaultValue)) {
      const allValues = searchParams.getAll(key);
      return allValues.length > 0 ? allValues : defaultValue;
    }
    return searchParams.get(key) ?? defaultValue;
  };

  const values = Object.fromEntries(
    Object.entries(defaults).map(([key, defaultValue]) => [
      key,
      getParamValue(key, defaultValue),
    ]),
  ) as T;

  const setValue = (key: keyof T, value: string | string[]) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.delete(key as string);

    const values = isArray(value) ? value : [value];
    values.forEach((val) => {
      updatedSearchParams.append(key as string, val);
    });

    setSearchParams(updatedSearchParams);
  };

  const toggleValue = (key: keyof T, value: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    const current = values[key] as string[];

    updatedSearchParams.delete(key as string);

    if (!current.includes(value)) {
      [...current, value].forEach((val) => {
        updatedSearchParams.append(key as string, val);
      });
    } else {
      current
        .filter((val) => val !== value)
        .forEach((val) => {
          updatedSearchParams.append(key as string, val);
        });
    }

    setSearchParams(updatedSearchParams);
  };

  return { values, setValue, toggleValue };
};

export default useSearchParamsState;
