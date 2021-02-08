import React from "react";
import "./forms.css";

interface FormControlProps {
  label: string;
  id: string;
  hint?: string;
  children?: React.ReactNode;
}
export const FormControl = ({ children, label, id, hint }: FormControlProps) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint && <p className="form-input-hint">{hint}</p>}
    </div>
  );
};

export interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  id: string;
  isMultiline?: boolean;
  [key: string]: any;
}

type InputProps = FormControlProps & React.HTMLProps<HTMLInputElement>;
export const Input = ({ label, id, hint, ...rest }: InputProps) => {
  return (
    <FormControl label={label} id={id} hint={hint}>
      <input className="form-input" name={id} id={id} {...rest} />
    </FormControl>
  );
};

type TextAreaProps = FormControlProps & React.HTMLProps<HTMLTextAreaElement>;

export const TextArea = ({ label, id, hint, ...rest }: TextAreaProps) => {
  return (
    <FormControl label={label} id={id} hint={hint}>
      <textarea className="form-input" name={id} id={id} rows={6} {...rest}></textarea>
    </FormControl>
  );
};
type SelectProps = FormControlProps & React.HTMLProps<HTMLSelectElement>;
export const Select = ({ label, id, children, hint, ...rest }: SelectProps) => {
  return (
    <FormControl label={label} id={id} hint={hint}>
      <select id={id} name={id} className="form-select" {...rest}>
        {children}
      </select>
    </FormControl>
  );
};
