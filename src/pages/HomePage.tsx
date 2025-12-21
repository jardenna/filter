import SearchForm from '../components/SearchFilter';

export const checkboxItems = [
  { id: 'apple', label: 'Apple' },
  { id: 'banana', label: 'Banana' },
  { id: 'orange', label: 'Orange' },
];
export const defaultChecked = ['apple'];

const HomePage = () => (
  <section>
    <header>
      <h1>Home</h1>
    </header>
    {/* <CheckboxList
      checkboxItems={checkboxItems}
      defaultChecked={defaultChecked}
    /> */}
    <SearchForm fields={['query', 'category', 'status', 'brand']} />
  </section>
);

export default HomePage;
