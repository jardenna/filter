import { ChangeEvent, FormEvent, MouseEvent, RefObject } from 'react';

export type ButtonEventType = MouseEvent<HTMLButtonElement>;
export type ChangeInputType = ChangeEvent<HTMLInputElement>;
export type ChangeTextAreaType = ChangeEvent<HTMLTextAreaElement>;
export type BlurEventType = { target: { name: string } };
export type FormEventType = FormEvent<HTMLFormElement>;
export type RefElementType = RefObject<HTMLElement | null>;
export type RefInputType = RefObject<HTMLInputElement | null>;
export type RefFormType = RefObject<HTMLFormElement | null>;

export type SortOrderType = 'asc' | 'desc';

export type OmitChecked<T, K extends keyof T> = Omit<T, K>;

export type OptionType<T = string> = {
  label: string;
  value: T;
};

export type AriaLabelData = {
  ariaLabels: string[];
  unit: string;
};

export type OptionGroupHeading = {
  id: string;
  title: string;
  errorText?: string;
};

export type InputChangeHandler = (event: ChangeInputType) => void;

export type ImgExtention = 'png' | 'jpg' | 'WebP';

export type ProductListChoiceProps = {
  groupTitle: OptionGroupHeading;
  name: string;
  onChange: InputChangeHandler;
};

export type InputType =
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export type AriaHasPopup =
  | boolean
  | 'menu'
  | 'listbox'
  | 'tree'
  | 'grid'
  | 'dialog';

export type AriaCurrentType =
  | 'page'
  | 'step'
  | 'location'
  | 'date'
  | 'time'
  | 'true'
  | 'false';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type AriaLive = 'off' | 'assertive' | 'polite';

export type ControlInputType = Extract<InputType, 'checkbox' | 'radio'>;

export type Filters = Record<string, string[]>;

export type FiltersCountResult = {
  countsByKey: Record<string, number>;
  totalCount: number;
};
