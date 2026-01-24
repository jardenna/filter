import { useEffect, useState } from 'react';
import './_filter.scss';

interface PriceFilterProps {
  maxPrice: string;
  minPrice: string;
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
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleSliderMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (numValue <= Number(localMax)) {
      setLocalMin(value);
      onMinChange(value);
    }
  };

  const handleSliderMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (numValue >= Number(localMin)) {
      setLocalMax(value);
      onMaxChange(value);
    }
  };

  const handleInputMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalMin(value);
    if (value === '' || !isNaN(Number(value))) {
      onMinChange(value);
    }
  };

  const handleInputMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalMax(value);
    if (value === '' || !isNaN(Number(value))) {
      onMaxChange(value);
    }
  };

  return (
    <div className="price-filter">
      <h3>Pris</h3>

      <div className="price-slider-container">
        <input
          type="range"
          min={min}
          max={max}
          value={localMin || min}
          onChange={handleSliderMinChange}
          className="price-slider price-slider--min"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localMax || max}
          onChange={handleSliderMaxChange}
          className="price-slider price-slider--max"
        />
      </div>

      <div className="price-display">
        <span>
          {localMin || min} kr - {localMax || max} kr
        </span>
      </div>

      <div className="price-inputs">
        <div className="price-input-group">
          <label htmlFor="minPrice">Min pris</label>
          <input
            id="minPrice"
            type="number"
            value={localMin}
            onChange={handleInputMinChange}
            placeholder="0"
            min={min}
            max={max}
          />
        </div>
        <div className="price-input-group">
          <label htmlFor="maxPrice">Max pris</label>
          <input
            id="maxPrice"
            type="number"
            value={localMax}
            onChange={handleInputMaxChange}
            placeholder={max.toString()}
            min={min}
            max={max}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
