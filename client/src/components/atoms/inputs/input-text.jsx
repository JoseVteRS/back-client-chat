import { forwardRef } from "react";

const InputText = ({ label, ...props }, ref) => {
  return (
    <label className="input-wrapper">
      <span className="input-label">{label}</span>
      <input className="input-input" {...props} ref={ref} type="text" />
    </label>
  );
};

export default forwardRef(InputText);
