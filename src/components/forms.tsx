import React from "react";
import { FieldError } from "react-hook-form";
import "./forms.css";

interface FormControlProps {
  label: string;
  name: string;
  hint?: string;
  error?: FieldError;
  children?: React.ReactNode;
}

const parseErrorMessage = (error: FieldError, label) => {
  if (!error) return "";
  if (error.message) return error.message;

  if (error.type === "required") return `${label || "Field"} is required`;
  return `${label || "Field"} error: ${error.type}`;
};

export const FormControl = ({ children, label, name, hint, error }: FormControlProps) => {
  const errorMsg = parseErrorMessage(error, label);

  return (
    <div className={"form-group " + (errorMsg ? "has-error" : "")}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      {children}
      {errorMsg && <p className="text-error">{errorMsg}</p>}
      {hint && <p className="form-input-hint text-gray">{hint}</p>}
    </div>
  );
};

type InputProps = FormControlProps & React.HTMLProps<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, hint, error, ...rest }, ref) => {
    return (
      <FormControl label={label} name={name} hint={hint} error={error}>
        <input className="form-input" name={name} ref={ref} {...rest} />
      </FormControl>
    );
  }
);

type TextAreaProps = FormControlProps & React.HTMLProps<HTMLTextAreaElement>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  let { label, name, hint, error, className = "", ...rest } = props;
  return (
    <FormControl label={label} name={name} hint={hint} error={error}>
      <textarea
        className={"form-input " + className}
        name={name}
        rows={6}
        ref={ref}
        {...rest}
      ></textarea>
    </FormControl>
  );
});

type SelectProps = FormControlProps & React.HTMLProps<HTMLSelectElement>;
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, name, children, hint, error, ...rest }, ref) => {
    return (
      <FormControl label={label} name={name} hint={hint} error={error}>
        <select ref={ref} name={name} className="form-select" {...rest}>
          {children}
        </select>
      </FormControl>
    );
  }
);
