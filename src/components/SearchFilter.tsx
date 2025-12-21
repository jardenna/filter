import { FormEvent } from 'react';
import { useSearchParams } from 'react-router';

function SearchForm({ fields }: { fields: string[] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Læs værdier direkte fra form inputs
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams);

    const valuesArray: string[] = [];

    fields.forEach((field) => {
      const value = formData.get(field)?.toString().trim() || '';
      if (value) {
        params.set(field, value); // opdater searchParams
        valuesArray.push(value); // til array
      } else {
        params.delete(field); // fjern hvis tom
      }
    });

    setSearchParams(params); // opdater URL
    console.log(valuesArray); // her er dit array med udfyldte queries
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field}>
          <label htmlFor={field}>{field}</label>
          <input
            id={field}
            name={field}
            defaultValue={searchParams.get(field) || ''} // uncontrolled input
          />
        </div>
      ))}

      <button type="submit">Apply filters</button>
    </form>
  );
}

export default SearchForm;
