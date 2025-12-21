import { FormEvent } from 'react';
import { useSearchParams } from 'react-router';

function SearchForm({ fields }: { fields: string[] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Lav array med udfyldte værdier
    const valuesArray = fields
      .map((field) => formData.get(field)?.toString().trim() || '')
      .filter((value) => value !== '');

    // Lav URLSearchParams uden push/forEach
    const params = new URLSearchParams(
      fields
        .map((field) => {
          const value = formData.get(field)?.toString().trim() || '';
          return value ? [field, value] : null;
        })
        .filter(Boolean) as [string, string][], // Type assertion
    );

    setSearchParams(params); // opdater URL
    console.log(valuesArray); // array med udfyldte queries
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field}>
          <label htmlFor={field}>{field}</label>
          <input
            id={field}
            name={field}
            defaultValue={searchParams.get(field) || ''}
          />
        </div>
      ))}

      <button type="submit">Apply filters</button>
    </form>
  );
}

export default SearchForm;
