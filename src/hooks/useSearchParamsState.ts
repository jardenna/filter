import { useSearchParams } from 'react-router';

type SearchParamState = Record<string, string | string[]>;

const isArray = (value: unknown): value is string[] => Array.isArray(value);

const useSearchParamsState = <T extends SearchParamState>(defaults: T) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = Object.fromEntries(
    Object.entries(defaults).map(([key, defaultValue]) => {
      if (isArray(defaultValue)) {
        const current = searchParams.getAll(key);
        return [key, current.length ? current : defaultValue];
      }

      return [key, searchParams.get(key) ?? defaultValue];
    }),
  ) as T;

  const setValue = (key: keyof T, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set(key as string, value);
    setSearchParams(next);
  };

  const toggleValue = (key: keyof T, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const current = next.getAll(key as string);

    next.delete(key as string);

    const nextValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    nextValues.forEach((v) => {
      next.append(key as string, v);
    });
    setSearchParams(next);
  };

  const clear = (key?: keyof T) => {
    const next = new URLSearchParams(searchParams.toString());

    if (key) {
      next.delete(key as string);
    } else {
      Object.keys(defaults).forEach((k) => {
        next.delete(k);
      });
    }

    setSearchParams(next);
  };

  return { values, setValue, toggleValue, clear };
};

export default useSearchParamsState;
