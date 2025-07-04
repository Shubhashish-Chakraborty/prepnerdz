import { Google } from '@/icons/GoogleColor';
import React from 'react';
import styled from 'styled-components';

const GoogleAuthBtn = ({ text }: { text: string }) => {
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
    };

    return (
        <StyledWrapper>
            <button onClick={handleGoogleLogin} className="signin">
                <Google />
                {text}
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .signin {
    max-width: 400px;
    display: flex;
    padding: 1rem 2rem;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 700;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.25);
    gap: 0.75rem;
    color: #c4d2dc;
    background-color: #19242b;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0, 0.87, 0.12, 1);
  }

  .signin:hover {
    transform: scale(1.025);
  }

  .signin:active {
    transform: scale(0.975);
  }

  button svg {
    height: 28px;
    width: auto;
  }`;

export default GoogleAuthBtn;