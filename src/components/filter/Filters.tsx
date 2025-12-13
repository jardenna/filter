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

    const currentValues = next.getAll(name);

    next.delete(name);

    const nextValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    nextValues.forEach((v) => {
      next.append(name, v);
    });

    setParams(next, { replace: true });
  }

  const filters = useFilterParams();
  console.log(filters);

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
      {/* Fruit*/}
      <div>
        <input
          type="checkbox"
          id="fruit"
          name="fruit"
          value="apple"
          checked={params.getAll('fruit').includes('apple')}
          onChange={onChange}
        />{' '}
        <label htmlFor="fruit">apple</label>
      </div>

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
