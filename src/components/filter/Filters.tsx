import { useSearchParams } from 'react-router';
import useFilterParams from './useFilterParams';

type FilterKey = 'category' | 'query';

export default function Filters() {
  const [params, setParams] = useSearchParams();

  const handleChange = (key: FilterKey, value: string) => {
    const next = new URLSearchParams(params);
    if (value === '') {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    setParams(next, { replace: true });
  };

  const filters = useFilterParams();
  console.log(filters);

  return (
    <form aria-label="Product filter">
      {/* CATEGORY SELECT */}
      <label htmlFor="category-filter">Category</label>
      <select
        id="category-filter"
        value={params.get('category') ?? ''}
        onChange={(e) => {
          handleChange('category', e.target.value);
        }}
      >
        <option value="">All</option>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="accessories">Accessories</option>
      </select>

      {/* TEXT SEARCH */}
      <label htmlFor="query-filter">Search</label>
      <input
        id="query-filter"
        type="search"
        value={params.get('query') ?? ''}
        onChange={(e) => {
          handleChange('query', e.target.value);
        }}
        placeholder="Search products"
      />
    </form>
  );
}
