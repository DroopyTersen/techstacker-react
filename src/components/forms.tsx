import React from "react";
import "./forms.css";

interface FormControlProps {
  label: string;
  id: string;
  hint?: string;
  error?: Error | string;
  children?: React.ReactNode;
}
const parseErrorMessage = (error: string | Error) => {
  if (typeof error === "string") return error;
  return error?.message ?? "";
};
export const FormControl = ({ children, label, id, hint, error }: FormControlProps) => {
  const errorMsg = parseErrorMessage(error);
  return (
    <div className={"form-group " + (errorMsg ? "has-error" : "")}>
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {errorMsg && <p className="form-input-hint text-error">{errorMsg}</p>}
      {hint && <p className="form-input-hint text-muted">{hint}</p>}
    </div>
  );
};

type InputProps = FormControlProps & React.HTMLProps<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, hint, error, ...rest }, ref) => {
    return (
      <FormControl label={label} id={id} hint={hint} error={error}>
        <input className="form-input" name={id} id={id} ref={ref} {...rest} />
      </FormControl>
    );
  }
);

type TextAreaProps = FormControlProps & React.HTMLProps<HTMLTextAreaElement>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  let { label, id, hint, error, ...rest } = props;
  return (
    <FormControl label={label} id={id} hint={hint} error={error}>
      <textarea className="form-input" name={id} id={id} rows={6} ref={ref} {...rest}></textarea>
    </FormControl>
  );
});

type SelectProps = FormControlProps & React.HTMLProps<HTMLSelectElement>;
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, children, hint, error, ...rest }, ref) => {
    return (
      <FormControl label={label} id={id} hint={hint} error={error}>
        <select ref={ref} id={id} name={id} className="form-select" {...rest}>
          {children}
        </select>
      </FormControl>
    );
  }
);
