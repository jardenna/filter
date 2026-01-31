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

  /* ----------------------------- Raw API ----------------------------- */

  const getRawValue = (key: string): string | string[] | null => {
    const values = searchParams.getAll(key);

    if (values.length === 0) {
      return null;
    }

    return values.length === 1 ? values[0] : values;
  };

  const setRawValue = (key: string, value: string | string[]) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.delete(key);

    const values = isArray(value) ? value : [value];
    values.forEach((val) => {
      if (val.length > 0) {
        updatedSearchParams.append(key, val);
      }
    });

    setSearchParams(updatedSearchParams);
  };

  const updateSearchParams = (updater: (params: URLSearchParams) => void) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updater(updatedSearchParams);
    setSearchParams(updatedSearchParams);
  };

  return {
    values,
    setValue,
    toggleValue,

    // Raw API
    getRawValue,
    setRawValue,
    updateSearchParams,
  };
};

export default useSearchParamsState;
