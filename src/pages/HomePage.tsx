import useSearchParamsValue from '../hooks/useSearchParamValue';

// export const checkboxItems = [
//   { id: 'apple', label: 'Apple' },
//   { id: 'banana', label: 'Banana' },
//   { id: 'orange', label: 'Orange' },
// ];
// export const defaultChecked = ['apple'];

const HomePage = () => {
  const fields = ['query', 'category', 'status', 'brand', 'color'];
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
        {fields.map((key) => (
          <input
            key={key}
            name={key}
            value={values[key]}
            onChange={(e) => {
              setValue(key, e.target.value);
            }}
          />
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
