type inputProps = {
  placeholder: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  validStatus?: string;
  className?: string;
};

const InputText = ({
  placeholder,
  id,
  onChange,
  value,
  validStatus,
  className
}: inputProps) => {
  return (
    <div className={(className ? className : "")}>
      <input
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
  );
};

export default InputText;
