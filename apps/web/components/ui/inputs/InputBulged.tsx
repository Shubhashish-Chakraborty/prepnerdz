import React from 'react';
import styled from 'styled-components';
import { ReactElement } from "react";

const InputBulged = ({
    placeholder,
    type,
    icon,
    name,
    onChange,
    value
}: {
    placeholder: string;
    type: string;
    icon: ReactElement;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}) => {
    return (
        <StyledWrapper>
            <div className="input__container">
                <div className="shadow__input" />
                <button className="input__button__shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" width="20px" height="20px">
                        <path d="M0 0h24v24H0z" fill="none" />
                        {icon}
                    </svg>
                </button>
                <input
                    type={type}
                    name={name}
                    className="input__search"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .input__container {
    position: relative;
    background: #f0f0f0;
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    border: 4px solid #000;
    max-width: 500px;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    transform: rotateX(10deg) rotateY(-10deg);
    perspective: 1000px;
    box-shadow: 10px 10px 0 #000;
    cursor: pointer;
  }

  .input__container:hover {
    transform: rotateX(5deg) rotateY(1 deg) scale(1.05);
    box-shadow: 25px 25px 0 -5px #e9b50b, 25px 25px 0 0 #000;
    cursor: pointer;
  }

  .shadow__input {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    transform: translateZ(-50px);
    background: linear-gradient(
      45deg,
      rgba(255, 107, 107, 0.4) 0%,
      rgba(255, 107, 107, 0.1) 100%
    );
    filter: blur(20px);
    cursor: pointer;
  }

  .input__button__shadow {
    cursor: pointer;
    border: 3px solid #000;
    background: #e9b50b;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transform: translateZ(20px);
    position: relative;
    z-index: 3;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
  }

  .input__button__shadow:hover {
    background: #e9b50b;
    transform: translateZ(10px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
    cursor: pointer;
  }

  .input__button__shadow svg {
    fill: #000;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .input__search {
    width: 100%;
    outline: none;
    border: 3px solid #000;
    padding: 15px;
    font-size: 18px;
    background: #fff;
    color: #000;
    transform: translateZ(10px);
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    z-index: 3;
    font-family: "Roboto", Arial, sans-serif;
    letter-spacing: -0.5px;
  }

  .input__search::placeholder {
    color: #666;
    font-weight: bold;
    text-transform: uppercase;
  }

  .input__search:hover,
  .input__search:focus {
    background: #f0f0f0;
    transform: translateZ(20px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
  }

//   .input__container::before {
//     content: "USERNAME";
//     position: absolute;
//     top: -15px;
//     left: 20px;
//     background: #e9b50b;
//     color: #000;
//     font-weight: bold;
//     padding: 5px 10px;
//     font-size: 14px;
//     transform: translateZ(50px);
//     z-index: 4;
//     border: 2px solid #000;
//   }`;

export default InputBulged;
