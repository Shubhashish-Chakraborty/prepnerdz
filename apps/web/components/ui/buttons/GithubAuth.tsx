import React from 'react';
import styled from 'styled-components';

const GithubAuthBtn = ({ text }: { text: string }) => {
    const handleGithubLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github`;
    };

    return (
        <StyledWrapper>
            <button onClick={handleGithubLogin} className="button signin">
                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <title>github</title> <rect fill="none" height={24} width={24} /> <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" /> </g></svg>
                {text}
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    background-color: #2f2f2f;
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

export default GithubAuthBtn;