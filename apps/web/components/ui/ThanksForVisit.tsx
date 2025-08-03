export const ThanksForVisit = () => {
    return (
        <div className="flex justify-center">
            <svg
                className="w-28 h-28 animate-slow-spin transform rotate-[85deg]"
                viewBox="0 0 100 100"
                overflow="visible"
            >
                <path
                    id="curve-text"
                    d="M 0 50 A 1 1 0 0 1 100 50 A 1 1 0 0 1 0 50"
                    fill="transparent"
                ></path>
                <text className="fill-black text-lg">
                    <textPath href="#curve-text" startOffset="0" dominantBaseline="hanging">
                        💟 Thanks for Visiting 💟
                    </textPath>
                </text>
            </svg>
        </div>
    )
}