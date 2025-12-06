import { ChangeEvent, useState } from 'react';
import './_filter.scss';

type Values = {
  address: string;
  name: string;
};

const Filter = () => {
  const initialValues: Values = {
    name: '',
    address: '',
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <section>
      <form className="filter">
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
};

export default Filter;
