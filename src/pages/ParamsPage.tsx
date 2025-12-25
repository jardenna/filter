import useSearchParamsState from '../hooks/useSearchParamsState';

const ParamsPage = () => {
  const { values, setValue, toggleValue } = useSearchParamsState({
    query: '',
    cat: 'all',
    features: ['apple'] as string[],
  });

  // console.log({ values, setValue, toggleValue, clear });
  const checkboxItems = ['apple', 'banana', 'orange'];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(values);
      }}
    >
      <input
        value={values.query}
        onChange={(e) => {
          setValue('query', e.target.value);
        }}
      />
      <input
        value={values.cat}
        onChange={(e) => {
          setValue('cat', e.target.value);
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
