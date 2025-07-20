import { X } from '@/icons/X';
import React from 'react';
import styled from 'styled-components';

const TwitterAuthBtn = ({ text }: { text: string }) => {
    const handleTwitterLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/twitter`;
    };

    return (
        <StyledWrapper>
            <button onClick={handleTwitterLogin} className="button signin">
                <X className='size-6'/>
                {text}
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    background-color: black;
    color: #f0f6fc;
    padding: 1rem 2rem;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 700;
    text-align: center;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    gap: 0.75rem;
    border: 1px solid #444c56;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.25s cubic-bezier(0, 0.87, 0.12, 1);
    // transition: .6s ease;
  }

  .signin:hover {
    transform: scale(1.025);
  }

  .signin:active {
    transform: scale(0.975);
  }

  .button svg {
    height: 30px;
  }

  .button:hover {
    box-shadow: none;
  }`;

export default TwitterAuthBtn;