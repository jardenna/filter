import { ChangeEvent, useState } from 'react';

const Filter = () => {
  const initialState = {
    test: '',
  };
  const [values, setValues] = useState(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <section>
      <form>
        <div className="input-container">
          <label htmlFor="test">Test</label>
          <input type="text" id="test" name="test" onChange={handleChange} />
        </div>
      </form>
    </section>
  );
};

export default Filter;
