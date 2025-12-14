import React, { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

interface CheckboxItem {
  id: string;
  label: string;
}

interface Props {
  checkboxItems: CheckboxItem[];
  defaultChecked: string[];
}

const CheckboxList: React.FC<Props> = ({ checkboxItems, defaultChecked }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Initialize checked items on first render
  useEffect(() => {
    const paramsChecked = searchParams.get('items');
    const itemsFromParams = paramsChecked ? paramsChecked.split(',') : [];
    const initialChecked = Array.from(
      new Set([...defaultChecked, ...itemsFromParams]),
    );
    setCheckedItems(initialChecked);
  }, []);

  // Sync checkedItems to URL params safely
  useEffect(() => {
    const nonDefault = checkedItems.filter(
      (item) => !defaultChecked.includes(item),
    );
    if (nonDefault.length) {
      setSearchParams({ items: nonDefault.join(',') });
    } else {
      setSearchParams({});
    }
  }, [checkedItems, defaultChecked, setSearchParams]);

  const handleChange = (id: string) => {
    setCheckedItems((prev) => {
      const isChecked = prev.includes(id);
      if (isChecked) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Checked items:', checkedItems);
  };

  const handleReset = () => {
    setCheckedItems(defaultChecked);
  };

  const disabled = checkedItems.length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <ul className="checkbox-list">
        {checkboxItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              id={`column-${item.id}`}
              checked={checkedItems.includes(item.id)}
              onChange={() => {
                handleChange(item.id);
              }}
            />
            <label htmlFor={`column-${item.id}`}>{item.label}</label>
          </li>
        ))}
        <button type="submit" className={disabled ? 'disabled' : ''}>
          {disabled ? 'Please choose at least 1 column' : 'Submit'}
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </ul>
    </form>
  );
};

export default CheckboxList;
