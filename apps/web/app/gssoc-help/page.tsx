'use client';
import { Redirecting } from '@/components/ui/ExternalRedirect';
import { useEffect } from 'react';

const FormRedirect = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href =
                'https://forms.gle/Ta1RL4d4AXuL4T38A';
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return <Redirecting />;
};

export default FormRedirect;