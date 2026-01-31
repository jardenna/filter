import { ChangeEvent, useId, useMemo, useState } from 'react';

type SecondaryOptionType = {
  labelText: string;
  value: string;
};

export type PrimaryOptionType = {
  labelText: string;
  secondaryOptions: readonly SecondaryOptionType[];
  value: string;
};

type DynamicFilterProps = {
  options: readonly PrimaryOptionType[];
  selectedValues: string[];

  getRawValue: (key: string) => string | string[] | null;
  onRemove: (value: string) => void;

  onSelect: (value: string) => void;
  setRawValue: (key: string, value: string | string[]) => void;
};

const buildSecondaryKey = (primaryValue: string) => `${primaryValue}Op`;
const buildInputKey = (primaryValue: string) => `${primaryValue}Val`;

const getStringOrFallback = (
  value: string | string[] | null,
  fallback: string,
) => {
  if (!value) {
    return fallback;
  }
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }
  return value;
};

export default function DynamicFilter({
  options,
  selectedValues,
  onSelect,
  onRemove,
  getRawValue,
  setRawValue,
}: DynamicFilterProps) {
  const baseId = useId();

  const [pickerValue, setPickerValue] = useState<string>('none');

  const optionsMap = useMemo(
    () => new Map(options.map((optionItem) => [optionItem.value, optionItem])),
    [options],
  );

  const availableOptions = useMemo(() => {
    const selectedSet = new Set(selectedValues);
    return options.filter((optionItem) => !selectedSet.has(optionItem.value));
  }, [options, selectedValues]);

  const handlePickerChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.target.value;

    setPickerValue(nextValue);

    if (nextValue === 'none') {
      return;
    }

    const optionItem = optionsMap.get(nextValue);
    if (!optionItem) {
      setPickerValue('none');
      return;
    }

    const secondaryKey = buildSecondaryKey(nextValue);
    const inputKey = buildInputKey(nextValue);

    const defaultSecondaryValue = optionItem.secondaryOptions[0]?.value ?? '';

    setRawValue(secondaryKey, defaultSecondaryValue);
    setRawValue(inputKey, '');

    onSelect(nextValue);
    setPickerValue('none');
  };

  const pickerId = `${baseId}-picker`;

  return (
    <section aria-label="Dynamic filters">
      <div>
        <label htmlFor={pickerId}>Add filter</label>
        <select
          id={pickerId}
          value={pickerValue}
          onChange={handlePickerChanged}
        >
          <option value="none">Select a filter</option>
          {availableOptions.map((optionItem) => (
            <option key={optionItem.value} value={optionItem.value}>
              {optionItem.labelText}
            </option>
          ))}
        </select>
      </div>

      {selectedValues.length > 0 && (
        <div aria-label="Selected filters">
          {selectedValues.map((selectedValue) => {
            const optionItem = optionsMap.get(selectedValue);
            if (!optionItem) {
              return null;
            }

            const secondaryKey = buildSecondaryKey(selectedValue);
            const inputKey = buildInputKey(selectedValue);

            const defaultSecondaryValue =
              optionItem.secondaryOptions[0]?.value ?? '';

            const selectedSecondaryValue = getStringOrFallback(
              getRawValue(secondaryKey),
              defaultSecondaryValue,
            );

            const selectedInputValue = getStringOrFallback(
              getRawValue(inputKey),
              '',
            );

            const fieldsetId = `${baseId}-fieldset-${selectedValue}`;
            const legendId = `${fieldsetId}-legend`;
            const secondaryId = `${fieldsetId}-secondary`;
            const inputId = `${fieldsetId}-input`;

            return (
              <fieldset key={selectedValue} aria-labelledby={legendId}>
                <legend id={legendId}>{optionItem.labelText}</legend>

                <div>
                  <label htmlFor={secondaryId}>Type</label>
                  <select
                    id={secondaryId}
                    value={selectedSecondaryValue}
                    onChange={(event) => {
                      setRawValue(secondaryKey, event.target.value);
                    }}
                  >
                    {optionItem.secondaryOptions.map((secondaryOption) => (
                      <option
                        key={secondaryOption.value}
                        value={secondaryOption.value}
                      >
                        {secondaryOption.labelText}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor={inputId}>Value</label>
                  <input
                    id={inputId}
                    type="text"
                    value={selectedInputValue}
                    onChange={(event) => {
                      setRawValue(inputKey, event.target.value);
                    }}
                    autoComplete="off"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onRemove(selectedValue);
                  }}
                >
                  Remove
                </button>
              </fieldset>
            );
          })}
        </div>
      )}
    </section>
  );
}
