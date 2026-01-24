import { useRef, useState } from 'react';
import { type ChangeInputType } from '../../types';
import './_filter.scss';

interface PriceFilterProps {
  maxPrice: string;
  minPrice: string;
  debounceMs?: number;
  max?: number;
  min?: number;
  onMaxChange: (value: string) => void;
  onMinChange: (value: string) => void;
}

const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  min = 0,
  max = 10000,
  debounceMs = 500,
}: PriceFilterProps) => {
  const [minValue, setMinValue] = useState(() => Number(minPrice || min));
  const [maxValue, setMaxValue] = useState(() => Number(maxPrice || max));

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = (callback: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(callback, debounceMs);
  };

  const update = (event: ChangeInputType) => {
    const { name, value } = event.target;

    if (name !== 'min' && name !== 'max') {
      return;
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    if (name === 'min') {
      if (numericValue > maxValue) {
        return;
      }

      setMinValue(numericValue);
      debounce(() => {
        onMinChange(String(numericValue));
      });
      return;
    }

    if (numericValue < minValue) {
      return;
    }

    setMaxValue(numericValue);
    debounce(() => {
      onMaxChange(String(numericValue));
    });
  };

  const describedById = 'price-filter-current-range';

  return (
    <fieldset className="price-filter" aria-describedby={describedById}>
      <legend>Pris</legend>

      <div className="price-slider-container">
        <input
          type="range"
          name="min"
          id="min"
          min={min}
          max={max}
          value={minValue}
          onChange={update}
          className="price-slider price-slider--min"
          aria-label="Minimum pris"
        />

        <input
          type="range"
          name="max"
          id="max"
          min={min}
          max={max}
          value={maxValue}
          onChange={update}
          className="price-slider price-slider--max"
          aria-label="Maksimum pris"
        />
      </div>

      <output id={describedById} className="price-display" aria-live="polite">
        {minValue} kr - {maxValue} kr
      </output>

      <div className="price-inputs">
        <div className="price-input-group">
          <label htmlFor="minPrice">Min pris</label>
          <input
            id="minPrice"
            name="min"
            type="number"
            value={minValue}
            onChange={update}
            min={min}
            max={max}
            inputMode="numeric"
          />
        </div>

        <div className="price-input-group">
          <label htmlFor="maxPrice">Max pris</label>
          <input
            id="maxPrice"
            name="max"
            type="number"
            value={maxValue}
            onChange={update}
            min={min}
            max={max}
            inputMode="numeric"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default PriceFilter;
