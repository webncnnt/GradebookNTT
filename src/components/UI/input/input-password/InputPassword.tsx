import React, { HTMLAttributes } from "react";

type inputProps = {
  placeholder: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  validStatus?: string;
  errorText?: string;
} & Omit<HTMLAttributes<HTMLInputElement>, "onChange">;

const InputPassword = React.forwardRef<HTMLInputElement, inputProps>(({ placeholder, id, onChange, errorText, value, validStatus, ...rest }, ref) => {
  return (
    <>
      <input
        ref={ref}
        {...rest}
        placeholder={placeholder}
        type="password"
        id={id}
        className={"input input--text " + (validStatus ? validStatus : "")}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} className="label label--text">
        {placeholder}
      </label>
      {validStatus === "invalid" && <div className="input__helper-error">{errorText}</div>}
    </>
  );
});

export default InputPassword;
