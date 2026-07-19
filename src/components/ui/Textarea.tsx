import { useId, type TextareaHTMLAttributes } from "react";
import inputStyles from "./Input.module.css";
import styles from "./Textarea.module.css";

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  label?: string;
  helperText?: string;
  error?: string;
  id?: string;
}

export function Textarea({
  label,
  helperText,
  error,
  id,
  className = "",
  required,
  rows = 4,
  ...rest
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;

  return (
    <div className={`${inputStyles.field} ${className}`.trim()}>
      {label && (
        <label htmlFor={textareaId} className={inputStyles.label}>
          {label}
          {required && (
            <span className={inputStyles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div className={`${inputStyles.inputWrap} ${styles.wrap}`} data-invalid={Boolean(error)}>
        <textarea
          id={textareaId}
          rows={rows}
          className={`${inputStyles.input} ${styles.textarea}`}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...rest}
        />
      </div>
      {error ? (
        <p id={errorId} className={inputStyles.errorText} role="alert">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={helperId} className={inputStyles.helperText}>
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
