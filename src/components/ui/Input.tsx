import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Input.module.css";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label?: string;
  helperText?: string;
  error?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  id?: string;
}

export function Input({
  label,
  helperText,
  error,
  iconStart,
  iconEnd,
  id,
  className = "",
  required,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`${styles.field} ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div className={styles.inputWrap} data-invalid={Boolean(error)}>
        {iconStart && (
          <span className={styles.icon} aria-hidden="true">
            {iconStart}
          </span>
        )}
        <input
          id={inputId}
          className={styles.input}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...rest}
        />
        {iconEnd && (
          <span className={styles.icon} aria-hidden="true">
            {iconEnd}
          </span>
        )}
      </div>
      {error ? (
        <p id={errorId} className={styles.errorText} role="alert">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
