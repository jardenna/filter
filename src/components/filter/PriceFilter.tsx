import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
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
}: PriceFilterProps) => {
  const [minValue, setMinValue] = useState(() => Number(minPrice || min));
  const [maxValue, setMaxValue] = useState(() => Number(maxPrice || max));
  const { debounce } = useDebounce();

  const handlePriceChange = (event: ChangeInputType) => {
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

  // Calculate filled track position and width
  const leftPercent = ((minValue - min) / (max - min)) * 100;
  const widthPercent = ((maxValue - minValue) / (max - min)) * 100;

  const step = 100;

  return (
    <fieldset className="price-filter" aria-describedby={describedById}>
      <legend>Pris</legend>
      <div className="price-slider-container">
        {/* Background track */}
        <div className="slider-track-bg" />

        {/* Filled track */}
        <div
          className="slider-track-filled"
          style={{
            left: `${leftPercent}%`,
            width: `${widthPercent}%`,
          }}
        />

        <input
          type="range"
          name="min"
          id="min"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handlePriceChange}
          className="price-slider price-slider--min"
          aria-label="Minimum pris"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minValue}
          aria-valuetext={`${minValue} kroner`}
          tabIndex={0}
        />
        <input
          type="range"
          name="max"
          id="max"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handlePriceChange}
          className="price-slider price-slider--max"
          aria-label="Maksimum pris"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maxValue}
          aria-valuetext={`${maxValue} kroner`}
          tabIndex={0}
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
            onChange={handlePriceChange}
            min={min}
            max={max}
            step={step}
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
            onChange={handlePriceChange}
            min={min}
            max={max}
            step={step}
            inputMode="numeric"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default PriceFilter;
