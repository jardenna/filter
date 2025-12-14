import CheckboxList from '../components/filter/CheckboxList';

const checkboxItems = [
  { id: 'apple', label: 'Apple' },
  { id: 'banana', label: 'Banana' },
  { id: 'orange', label: 'Orange' },
];
const defaultChecked = ['apple'];

const HomePage = () => (
  <section>
    <header>
      <h1>Home</h1>
    </header>
    <CheckboxList
      checkboxItems={checkboxItems}
      defaultChecked={defaultChecked}
    />
  </section>
);

export default HomePage;
