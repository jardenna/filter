import useSearchParamsValue, {
  FieldConfig,
} from '../hooks/useSearchParamValue';

// export const checkboxItems = [
//   { id: 'apple', label: 'Apple' },
//   { id: 'banana', label: 'Banana' },
//   { id: 'orange', label: 'Orange' },
// ];
// export const defaultChecked = ['apple'];

const HomePage = () => {
  const fields: FieldConfig[] = [
    { key: 'query', type: 'text' },
    { key: 'cat', type: 'text' },
    { key: 'features', type: 'checkbox' },
  ];

  const { values, setValue, toggleValue } = useSearchParamsValue(fields);
  const checkboxItems = ['apple', 'banana', 'orange'];
  return (
    <section>
      <header>
        <h1>Home</h1>
      </header>
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
      {/* <CheckboxList
      checkboxItems={checkboxItems}
      defaultChecked={defaultChecked}
    /> */}
      {/* <SearchForm fields={['query', 'category', 'status', 'brand']} /> */}
    </section>
  );
};

export default HomePage;
