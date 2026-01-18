import useSearchParamsState from '../hooks/useSearchParamsState';

const ParamsPage = () => {
  const { values, setValue, toggleValue } = useSearchParamsState({
    query: '',
    cat: 'all',
    features: ['apple'] as string[],
  });

  const checkboxItems = ['apple', 'banana', 'orange'];

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
      <input
        value={values.cat}
        onChange={(event) => {
          setValue('cat', event.target.value);
        }}
      />

      {checkboxItems.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            checked={values.features.includes(item)}
            onChange={() => {
              toggleValue('features', item);
            }}
          />
          {item}
        </label>
      ))}

      <button type="submit">Search</button>
    </form>
  );
};

export default ParamsPage;
