import React, { useState } from 'react';

export default function PhoneNumberInput( { name, isRequired } ) {
    const [inputValue, setInputValue] = useState('');
    const handleInput = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setInputValue(formattedPhoneNumber);
    };
    return <input className="form-control" onChange={e => handleInput(e)} value={inputValue} name={name} placeholder="cellphone" required={isRequired} />
}

function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if(phoneNumberLength < 4) return phoneNumber;
    if(phoneNumberLength < 7)  {
        return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3, 6,)}-${phoneNumber.slice(6,10)}`;
}