import React from "react";

const InputGroup = ({ label, error, children }) => (
  <div className="input-group">
    <label>{label}</label>
    {children}
    {error && <div className="error-message">{error}</div>}
  </div>
);

export default React.memo(InputGroup)