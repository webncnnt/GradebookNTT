import React, { HTMLAttributes } from "react";

type inputProps = {
  placeholder: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  validStatus?: string;
  className?: string;
  errorText?: string;
} & Omit<HTMLAttributes<HTMLInputElement>, "onChange">;

const InputText = React.forwardRef<HTMLInputElement, inputProps>(
  ({ placeholder, id, onChange, value, validStatus, errorText, className, ...rest }, ref) => {
    return (
      <div className={className ? className : ""}>
        <div>
          <input
            {...rest}
            ref={ref}
            placeholder={placeholder}
            type="text"
            id={id}
            className={"input input--text " + (validStatus ? validStatus : "")}
            value={value}
            onChange={onChange}
          />
          <label htmlFor={id} className="label label--text">
            {placeholder}
          </label>
        </div>
        {validStatus === "invalid" && <div className="input__helper-error">{errorText}</div>}
      </div>
    );
  }
);

export default InputText;
