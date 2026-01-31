import { useId, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { type ChangeInputType } from '../../types';
import './_filter.scss';

interface PriceFilterProps {
  maxPrice: string;
  minPrice: string;
  debounceMs?: number;
  max?: number;
  min?: number;
  step?: number;
  onMaxChange: (value: string) => void;
  onMinChange: (value: string) => void;
}

const clampNumberToRange = (
  value: number,
  lowerBound: number,
  upperBound: number,
) => Math.min(upperBound, Math.max(lowerBound, value));

const parseFiniteNumberOrNull = (rawValue: string) => {
  if (rawValue.trim() === '') {
    return null;
  }

  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  step = 100,
  min = 0,
  max = 10000,
}: PriceFilterProps) => {
  const describedById = useId();
  const { debounce } = useDebounce();

  // Canonical numeric values (used by range inputs + output)
  const [minimumValue, setMinimumValue] = useState(() =>
    clampNumberToRange(Number(minPrice || min), min, max),
  );
  const [maximumValue, setMaximumValue] = useState(() =>
    clampNumberToRange(Number(maxPrice || max), min, max),
  );

  // Draft values for typing (used by number inputs)
  const [minimumDraft, setMinimumDraft] = useState(() =>
    String(clampNumberToRange(Number(minPrice || min), min, max)),
  );
  const [maximumDraft, setMaximumDraft] = useState(() =>
    String(clampNumberToRange(Number(maxPrice || max), min, max)),
  );

  const commitMinimumValue = (rawValue: string) => {
    const parsedValue = parseFiniteNumberOrNull(rawValue);

    if (parsedValue === null) {
      setMinimumDraft(String(minimumValue));
      return;
    }

    const committedValue = clampNumberToRange(parsedValue, min, maximumValue);

    setMinimumValue(committedValue);
    setMinimumDraft(String(committedValue));

    debounce(() => {
      onMinChange(String(committedValue));
    });
  };

  const commitMaximumValue = (rawValue: string) => {
    const parsedValue = parseFiniteNumberOrNull(rawValue);

    if (parsedValue === null) {
      setMaximumDraft(String(maximumValue));
      return;
    }

    const committedValue = clampNumberToRange(parsedValue, minimumValue, max);

    setMaximumValue(committedValue);
    setMaximumDraft(String(committedValue));

    debounce(() => {
      onMaxChange(String(committedValue));
    });
  };

  const handleRangeChange = (event: ChangeInputType) => {
    const inputName = event.target.name;
    const inputValue = Number(event.target.value);

    if (!Number.isFinite(inputValue)) {
      return;
    }

    if (inputName === 'min') {
      const committedValue = clampNumberToRange(inputValue, min, maximumValue);

      setMinimumValue(committedValue);
      setMinimumDraft(String(committedValue));

      debounce(() => {
        onMinChange(String(committedValue));
      });
      return;
    }

    if (inputName === 'max') {
      const committedValue = clampNumberToRange(inputValue, minimumValue, max);

      setMaximumValue(committedValue);
      setMaximumDraft(String(committedValue));

      debounce(() => {
        onMaxChange(String(committedValue));
      });
    }
  };

  const leftPercent = ((minimumValue - min) / (max - min)) * 100;
  const widthPercent = ((maximumValue - minimumValue) / (max - min)) * 100;

  return (
    <fieldset className="price-filter" aria-describedby={describedById}>
      <legend>Pris</legend>

      <div className="price-slider-container">
        <div className="slider-track-bg" />
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
          value={minimumValue}
          onChange={handleRangeChange}
          className="price-slider"
          aria-label="Minimum pris"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minimumValue}
          aria-valuetext={`${minimumValue} kroner`}
        />

        <input
          type="range"
          name="max"
          id="max"
          min={min}
          max={max}
          step={step}
          value={maximumValue}
          onChange={handleRangeChange}
          className="price-slider"
          aria-label="Maksimum pris"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maximumValue}
          aria-valuetext={`${maximumValue} kroner`}
        />
      </div>

      <output id={describedById} className="price-display" aria-live="polite">
        {minimumValue} kr - {maximumValue} kr
      </output>

      <div className="price-inputs">
        <div className="price-input-group">
          <label htmlFor="minPrice">Min pris</label>
          <input
            id="minPrice"
            name="minPrice"
            type="number"
            value={minimumDraft}
            min={min}
            max={max}
            step={step}
            inputMode="numeric"
            onChange={(event) => {
              setMinimumDraft(event.target.value);
            }}
            onBlur={() => {
              commitMinimumValue(minimumDraft);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                commitMinimumValue(minimumDraft);
              }
            }}
            aria-label="Indtast minimum pris"
          />
        </div>

        <div className="price-input-group">
          <label htmlFor="maxPrice">Max pris</label>
          <input
            id="maxPrice"
            name="maxPrice"
            type="number"
            value={maximumDraft}
            min={min}
            max={max}
            step={step}
            inputMode="numeric"
            onChange={(event) => {
              setMaximumDraft(event.target.value);
            }}
            onBlur={() => {
              commitMaximumValue(maximumDraft);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                commitMaximumValue(maximumDraft);
              }
            }}
            aria-label="Indtast maksimum pris"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default PriceFilter;
