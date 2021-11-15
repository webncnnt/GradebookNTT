type inputProps = {
  label: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  validStatus?: string;
};

const InputPassword = ({label, id, onChange, value, validStatus }: inputProps) => {
  return (
    <>
      <input
        type="password"
        id={id}
        className={"input input--text " + (validStatus ? validStatus : "")}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} className="label label--text">
        {label}
      </label>
    </>
  );
};

export default InputPassword;
