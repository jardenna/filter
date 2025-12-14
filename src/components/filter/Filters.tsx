import useURLFilter from './useURLFilter';

export const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

export const columnOptions = [
  { id: 'name', label: 'Name' },
  { id: 'price', label: 'Price' },
  { id: 'stock', label: 'Stock' },
];

const fruitsList = ['name', 'price', 'stock'];

export default function Filters() {
  const { params, filters, onChange } = useURLFilter();
  console.log(filters);

  return (
    <form aria-label="Product filter">
      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        value={params.get('category') ?? ''}
        onChange={onChange}
      >
        <option value="">All</option>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="accessories">Accessories</option>
      </select>

      <fieldset>
        <legend>Fruits</legend>
        {fruitsList.map((fruit) => (
          <div key={fruit}>
            <input
              type="checkbox"
              id={`fruit-${fruit}`}
              name="fruit"
              value={fruit}
              checked={params.getAll('fruit').includes(fruit)}
              onChange={onChange}
            />
            <label htmlFor={`fruit-${fruit}`}>{fruit}</label>
          </div>
        ))}
      </fieldset>

      <label htmlFor="query">Search</label>
      <input
        id="query"
        name="query"
        type="search"
        value={params.get('query') ?? ''}
        onChange={onChange}
        placeholder="Search products"
      />
    </form>
  );
}
