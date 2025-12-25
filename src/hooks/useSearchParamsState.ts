import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

type SearchParamState = Record<string, string | string[]>;

const isArray = (value: unknown): value is string[] => Array.isArray(value);

const useSearchParamsState = <T extends SearchParamState>(defaults: T) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const next = new URLSearchParams(searchParams.toString());

    Object.entries(defaults).forEach(([key, defaultValue]) => {
      if (isArray(defaultValue)) {
        if (next.getAll(key).length === 0) {
          defaultValue.forEach((v) => {
            next.append(key, v);
          });
        }
      } else {
        if (!next.has(key)) {
          next.set(key, defaultValue);
        }
      }
    });

    setSearchParams(next, { replace: true });
  }, []);

  const values = Object.fromEntries(
    Object.entries(defaults).map(([key, defaultValue]) => [
      key,
      isArray(defaultValue)
        ? searchParams.getAll(key)
        : (searchParams.get(key) ?? defaultValue),
    ]),
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

    if (!current.includes(value)) {
      [...current, value].forEach((v) => {
        next.append(key as string, v);
      });
    } else {
      current
        .filter((v) => v !== value)
        .forEach((v) => {
          next.append(key as string, v);
        });
    }

    setSearchParams(next);
  };

  return { values, setValue, toggleValue };
};

export default useSearchParamsState;
