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
    { key: 'category', type: 'text' },
    { key: 'inStock', type: 'checkbox' },
    { key: 'onSale', type: 'checkbox' },
  ];
  const { values, setValue } = useSearchParamsValue(fields);

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
        {fields.map(({ key, type }) =>
          type === 'checkbox' ? (
            <label key={key}>
              <input
                type="checkbox"
                checked={values[key] as boolean}
                onChange={(e) => {
                  setValue(key, e.target.checked);
                }}
              />
              {key}
            </label>
          ) : (
            <input
              key={key}
              value={values[key] as string}
              onChange={(e) => {
                setValue(key, e.target.value);
              }}
            />
          ),
        )}

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
