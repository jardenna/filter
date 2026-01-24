import useSearchParamsState from '../hooks/useSearchParamsState';

const ParamsPage = () => {
  const { values, setValue, toggleValue } = useSearchParamsState({
    query: '',
    cat: 'all',
    features: ['apple'],
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

      <button type="submit">Search</button>
    </form>
  );
};

export default ParamsPage;
