import React, { useState } from "react";

export default function SocialSecurityInput({ name, isRequired }) {
  const [inputValue, setInputValue] = useState("");
  const handleInput = (e) => {
    const formattedSocialSecurityNumber = formatSocialSecurityNumber(
      e.target.value
    );
    setInputValue(formattedSocialSecurityNumber);
  };
  return (
    <input
      className="form-control"
      onChange={(e) => handleInput(e)}
      value={inputValue}
      name={name}
      placeholder="SSN"
      required={isRequired}
    />
  );
}

function formatSocialSecurityNumber(value) {
  if (value != null) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{3})/, "$1-");
    value = value.replace(/-(\d{2})/, "-$1-");
    value = value.replace(/(\d)-(\d{4}).*/, "$1-$2");
  }
  return value;
}
