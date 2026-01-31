import DynamicFilter from '../components/filter/DynamicFilter';
import PriceFilter from '../components/filter/PriceFilter';
import useSearchParamsState from '../hooks/useSearchParamsState';
export type DynamicSecondaryOptionType = {
  labelText: string;
  value: string;
};

export type DynamicPrimaryOptionType = {
  labelText: string;
  secondaryOptions: readonly DynamicSecondaryOptionType[];
  value: string;
};

export const dynamicFilterOptions: readonly DynamicPrimaryOptionType[] = [
  {
    value: 'createdAt',
    labelText: 'Created at',
    secondaryOptions: [
      { value: 'before', labelText: 'Before' },
      { value: 'after', labelText: 'After' },
      { value: 'between', labelText: 'Between' },
    ],
  },
  {
    value: 'status',
    labelText: 'Status',
    secondaryOptions: [
      { value: 'is', labelText: 'Is' },
      { value: 'isNot', labelText: 'Is not' },
    ],
  },
  {
    value: 'amount',
    labelText: 'Amount',
    secondaryOptions: [
      { value: 'gt', labelText: 'Greater than' },
      { value: 'lt', labelText: 'Less than' },
    ],
  },
];

const ParamsPage = () => {
  const { values, setValue, toggleValue } = useSearchParamsState({
    query: '',
    cat: 'all',
    features: ['apple'],
    minPrice: '',
    maxPrice: '',
  });

  const checkboxItems = [
    { label: 'banana', value: 'banana' },
    { label: 'orange', value: 'orange' },
    { label: 'apple', value: 'apple' },
  ];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(values);
      }}
    >
      <input
        value={values.query}
        onChange={(event) => {
          setValue('query', event.target.value);
        }}
      />
      <select
        value={values.cat}
        onChange={(event) => {
          setValue('cat', event.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="fruit">Fruit</option>
        <option value="vegetable">Vegetable</option>
      </select>

      {checkboxItems.map(({ label, value }) => (
        <div key={value}>
          <input
            id={value}
            type="checkbox"
            checked={values.features.includes(value)}
            onChange={() => {
              toggleValue('features', value);
            }}
          />
          <label htmlFor={value}>{label}</label>
        </div>
      ))}

      <PriceFilter
        key={`${values.minPrice}-${values.maxPrice}`}
        minPrice={values.minPrice}
        maxPrice={values.maxPrice}
        onMinChange={(value) => {
          setValue('minPrice', value);
        }}
        onMaxChange={(value) => {
          setValue('maxPrice', value);
        }}
        min={0}
        max={10000}
      />
      <DynamicFilter
        options={dynamicFilterOptions}
        selectedValues={values.features}
        onToggleSelected={(value) => {
          toggleValue('features', value);
        }}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default ParamsPage;
