import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router';

type Filters = Record<string, string | string[]>;

export default function useURLFilter() {
  const [params, setParams] = useSearchParams();

  // Parsed filters
  const filters: Filters = {};
  params.forEach((value, key) => {
    if (filters[key]) {
      if (Array.isArray(filters[key])) {
        filters[key].push(value);
      } else {
        filters[key] = [filters[key], value];
      }
    } else {
      filters[key] = value;
    }
  });

  // Generic onChange for select, text, checkbox
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    const next = new URLSearchParams(params);

    if (type !== 'checkbox') {
      if (value === '') {
        next.delete(name);
      } else {
        next.set(name, value);
      }
      setParams(next, { replace: true });
      return;
    }

    const currentValues = next.getAll(name);
    next.delete(name);

    const nextValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    nextValues.forEach((v) => {
      next.append(name, v);
    });

    setParams(next, { replace: true });
  };

  return { params, filters, onChange };
}
