import React from "react";

const InputGroup = ({ label, error, children }) => (
  <div className="sp-input-group">
    <label>{label}</label>
    {children}
    {error && <div className="sp-error-message">{error}</div>}
  </div>
);

export default React.memo(InputGroup);
