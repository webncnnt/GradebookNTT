import React from "react";

type inputRatioProps = {
  role: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputRatio = ({ role, onChange }: inputRatioProps) => {
  return (
    <div>
      <div className="input-ratio__group">
        <input
          type="radio"
          id="invite-teacher"
          name="inviteMember"
          value="1"
          checked={"1" === role}
          onChange={onChange}
        />
        <label htmlFor="invite-teacher" className="input-ratio__label">
          Giảng viên
        </label>
      </div>

      <div className="input-ratio__group">
        <input
          type="radio"
          id="invite-student"
          name="inviteMember"
          value="0"
          checked={"0" === role}
          onChange={onChange}
        />
        <label htmlFor="invite-student" className="input-ratio__label">
          Sinh viên
        </label>
      </div>
    </div>
  );
};

export default InputRatio;
