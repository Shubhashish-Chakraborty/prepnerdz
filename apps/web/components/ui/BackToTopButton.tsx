'use client';

import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        letterSpacing: '1px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 0 15px rgba(124, 58, 237, 0.6), 0 0 30px rgba(79, 70, 229, 0.3)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'floatUpDown 2s ease-in-out infinite',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
      }}
      aria-label="Back to top"
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      ↑
    </button>
  );
};

export default BackToTopButton;
