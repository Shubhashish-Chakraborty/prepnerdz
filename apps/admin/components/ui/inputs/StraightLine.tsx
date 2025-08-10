import React from 'react';
import styled from 'styled-components';

interface InputStraightLineProps {
  type?: 'text' | 'email' | 'password' | 'tel';
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
}

const InputStraightLine: React.FC<InputStraightLineProps> = ({
  type = 'text',
  id,
  label,
  value,
  onChange,
  required = false,
  textarea = false,
  rows = 3,
}) => {
  return (
    <StyledWrapper>
      <div className="input-container">
        {textarea ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            className={value ? 'has-value' : ''}
          />
        ) : (
          <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            className={value ? 'has-value' : ''}
          />
        )}
        <label htmlFor={id} className="label">
          {label}
        </label>
        <div className="underline" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    position: relative;
    margin: 30px auto;
    width: 100%;
  }

  .input-container input[type="text"],
  .input-container input[type="email"],
  .input-container input[type="password"],
  .input-container input[type="tel"],
  .input-container textarea {
    font-size: 16px;
    width: 100%;
    border: none;
    border-bottom: 2px solid #ccc;
    padding: 5px 0;
    background-color: transparent;
    outline: none;
    resize: none;
    color: white; /* Added text color for better visibility */
  }

  .input-container textarea {
    min-height: 80px;
  }

  .input-container .label {
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    font-weight: bold;
    transition: all 0.3s ease;
    pointer-events: none;
    font-size: 16px;
  }

  .input-container input[type="text"]:focus ~ .label,
  .input-container input[type="text"].has-value ~ .label,
  .input-container input[type="email"]:focus ~ .label,
  .input-container input[type="email"].has-value ~ .label,
  .input-container input[type="password"]:focus ~ .label,
  .input-container input[type="password"].has-value ~ .label,
  .input-container input[type="tel"]:focus ~ .label,
  .input-container input[type="tel"].has-value ~ .label,
  .input-container textarea:focus ~ .label,
  .input-container textarea.has-value ~ .label {
    top: -20px;
    font-size: 14px;
    color: #333;
  }

  .input-container .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #333;
    transform: scaleX(0);
    transition: all 0.3s ease;
  }

  .input-container input[type="text"]:focus ~ .underline,
  .input-container input[type="text"].has-value ~ .underline,
  .input-container input[type="email"]:focus ~ .underline,
  .input-container input[type="email"].has-value ~ .underline,
  .input-container input[type="password"]:focus ~ .underline,
  .input-container input[type="password"].has-value ~ .underline,
  .input-container input[type="tel"]:focus ~ .underline,
  .input-container input[type="tel"].has-value ~ .underline,
  .input-container textarea:focus ~ .underline,
  .input-container textarea.has-value ~ .underline {
    transform: scaleX(1);
  }
`;

export default InputStraightLine;