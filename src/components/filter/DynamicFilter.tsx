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

type FeatureStateType = Record<
  string,
  {
    inputValue: string;
    secondaryValue: string;
  }
>;

type DynamicFilterProps = {
  options: readonly PrimaryOptionType[];
  selectedValues: string[];
  onToggleSelected: (value: string) => void;
};

const getDefaultSecondaryValue = (primaryOption: PrimaryOptionType) =>
  primaryOption.secondaryOptions[0]?.value ?? '';

const getOrCreateState = (
  previousState: FeatureStateType,
  primaryOption: PrimaryOptionType,
): FeatureStateType[string] => {
  const existingState = previousState[primaryOption.value];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (existingState) {
    return existingState;
  }

  return {
    secondaryValue: getDefaultSecondaryValue(primaryOption),
    inputValue: '',
  };
};

export default function DynamicFilter({
  selectedValues,
  options,
  onToggleSelected,
}: DynamicFilterProps) {
  const baseId = useId();

  const [pickerValue, setPickerValue] = useState<string>('none');
  const [featureState, setFeatureState] = useState<FeatureStateType>({});

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

    onToggleSelected(nextValue);
    setPickerValue('none');
  };

  const handleRemoveClicked = (valueToRemove: string) => {
    onToggleSelected(valueToRemove);
  };

  const handleSecondaryChanged = (
    primaryValue: string,
    secondaryValue: string,
  ) => {
    const optionItem = optionsMap.get(primaryValue);
    if (!optionItem) {
      return;
    }

    setFeatureState((previousState) => ({
      ...previousState,
      [primaryValue]: {
        ...getOrCreateState(previousState, optionItem),
        secondaryValue,
      },
    }));
  };

  const handleInputChanged = (primaryValue: string, inputValue: string) => {
    const optionItem = optionsMap.get(primaryValue);
    if (!optionItem) {
      return;
    }

    setFeatureState((previousState) => ({
      ...previousState,
      [primaryValue]: {
        ...getOrCreateState(previousState, optionItem),
        inputValue,
      },
    }));
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

            const itemState = getOrCreateState(featureState, optionItem);

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
                    value={itemState.secondaryValue}
                    onChange={(event) => {
                      handleSecondaryChanged(selectedValue, event.target.value);
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
                    value={itemState.inputValue}
                    onChange={(event) => {
                      handleInputChanged(selectedValue, event.target.value);
                    }}
                    autoComplete="off"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleRemoveClicked(selectedValue);
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
