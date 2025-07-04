export const Shield = ({ className }: { className: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} stroke="currentColor" fill="currentColor" viewBox="0 0 512 512">
            <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" />
        </svg>
    )
}

export const ShieldColored = ({ className }: { className: string }) => {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623C21 7.51 20.402 5.228 18.402 6a11.96 11.96 0 0 1-6.804 0Z"
            />
        </svg>
    )
}