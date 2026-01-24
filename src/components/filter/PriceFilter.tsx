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

type RangeKey = 'min' | 'max';

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

  const debounce = (fn: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(fn, debounceMs);
  };

  const update = (name: RangeKey, value: string) => {
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
          min={min}
          max={max}
          value={minValue}
          onChange={(e) => {
            update('min', e.target.value);
          }}
          className="price-slider price-slider--min"
          aria-label="Minimum pris"
        />

        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={(e) => {
            update('max', e.target.value);
          }}
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
            name="minPrice"
            type="number"
            value={minValue}
            onChange={(event: ChangeInputType) => {
              update('min', event.target.value);
            }}
            min={min}
            max={max}
            inputMode="numeric"
          />
        </div>

        <div className="price-input-group">
          <label htmlFor="maxPrice">Max pris</label>
          <input
            id="maxPrice"
            name="maxPrice"
            type="number"
            value={maxValue}
            onChange={(event: ChangeInputType) => {
              update('max', event.target.value);
            }}
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
