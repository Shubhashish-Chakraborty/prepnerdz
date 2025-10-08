import Link from 'next/link';
import React from 'react';

const ComingSoonFeatures = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 text-center py-3 lg:px-4 w-full">
            <Link href="/leaderboard" passHref>
                <div
                    className="p-2 bg-gray-800/50 animate-bounce items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex cursor-pointer group"
                    role="alert"
                >
                    <span className="flex rounded-full bg-black uppercase px-2 py-1 text-xs font-bold mr-3 group-hover:bg-purple-400 transition-colors">
                        Coming Soon
                    </span>
                    <span className="font-bold mr-2 text-center md:text-left flex-auto group-hover:text-white transition-colors">
                        {/* GSSoC '25 is here! Track your contributions on the official PrepNerdz Leaderboard. */}
                        🚀 Big things are coming! Get ready for NerdConnect and many more!
                    </span>
                    {/* <svg
                        className="fill-current opacity-75 h-4 w-4 group-hover:opacity-100 transition-opacity"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                    </svg> */}
                </div>
            </Link>
        </div>
    );
};

export default ComingSoonFeatures;
