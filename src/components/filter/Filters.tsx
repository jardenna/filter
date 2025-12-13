import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router';
import useFilterParams from './useFilterParams';

export const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

export default function Filters() {
  const [params, setParams] = useSearchParams();

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
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

    // checkbox handling: convert to single CSV param
    const currentCSV = next.get(name) || '';
    const currentValues = currentCSV
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

    const nextValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    if (nextValues.length === 0) {
      next.delete(name);
    } else {
      next.set(name, nextValues.join(', '));
    }

    setParams(next, { replace: true });
  }

  const filters = useFilterParams();
  console.log(filters);

  // simple checkbox rendering without loops
  const isChecked = (fruit: string) =>
    params
      .get('fruit')
      ?.split(',')
      .map((v) => v.trim())
      .includes(fruit) || false;

  return (
    <form aria-label="Product filter">
      {/* CATEGORY SELECT */}
      <label htmlFor="category-filter">Category</label>
      <select
        id="category-filter"
        name="category"
        value={params.get('category') ?? ''}
        onChange={onChange}
      >
        <option value="">All</option>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="accessories">Accessories</option>
      </select>

      {/* FRUITS */}
      {options.map((option) => {
        const id = `fruit-${option.value}`;
        return (
          <div key={option.value}>
            <input
              type="checkbox"
              id={id}
              name="fruit"
              value={option.value}
              checked={isChecked(option.value)}
              onChange={onChange}
            />
            <label htmlFor={id}>{option.label}</label>
          </div>
        );
      })}

      {/* TEXT SEARCH */}
      <label htmlFor="query-filter">Search</label>
      <input
        id="query-filter"
        name="query"
        type="search"
        value={params.get('query') ?? ''}
        onChange={onChange}
        placeholder="Search products"
      />
    </form>
  );
}
