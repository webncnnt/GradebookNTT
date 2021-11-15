type inputProps = {
  name: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const InputDate = ({ name, id, onChange, value }: inputProps) => {
  return (
    <>
      <input
        type="date"
        id={id}
        className="input input--date "
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} className="label label--date">
        {name}
      </label>
    </>
  );
};

export default InputDate;
