import { Github } from '@/icons/Github';
import { Instagram } from '@/icons/Instagram';
import { Linkedin } from '@/icons/Linkedin';
import { X } from '@/icons/X';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';

const ProfileSimple = ({
    name,
    image,
    mail,
    github,
    linkedin,
    instagram,
    x,
}: {
    name: string;
    image: string;
    mail: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
    x?: string;
}) => {
    return (
        <div className="bg-[#555] w-[20rem] sm:w-[22rem] md:w-[25rem] px-4 sm:px-5 py-5 sm:py-6 border-4 border-white shadow-md rounded-lg text-center text-white font-poppins transition-all duration-300 hover:-translate-y-2">
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 border-white rounded-full overflow-hidden mx-auto flex items-center justify-center">
                <Image src={image} alt="profile" width={200} height={200} />
            </div>

            <p className="mt-4 sm:mt-5 font-semibold text-base sm:text-lg">{name}</p>

            <div
                onClick={() => {
                    navigator.clipboard.writeText(mail);
                    toast.success('Email copied to clipboard!');
                }}
                className="text-amber-300 font-bold cursor-pointer hover:underline text-sm sm:text-base"
            >
                {mail}
            </div>

            <div className="w-full h-[2px] bg-white my-4 sm:my-5" />

            <div className="flex justify-center gap-6 sm:gap-10 md:gap-5">
                {linkedin && (
                    <Link target="_blank" href={linkedin} className="relative text-white group">
                        <Linkedin className="w-5 h-5" />
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full bg-[#262626] text-xs font-semibold px-2 py-1 rounded opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-2 z-10">
                            LinkedIn
                        </span>
                    </Link>
                )}
                {instagram && (
                    <Link target="_blank" href={instagram} className="relative text-white group">
                        <Instagram className="w-5 h-5" />
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full bg-[#262626] text-xs font-semibold px-2 py-1 rounded opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-2 z-10">
                            Instagram
                        </span>
                    </Link>
                )}
                {github && (
                    <Link target="_blank" href={github} className="relative text-white group">
                        <Github className="w-5 h-5" />
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full bg-[#262626] text-xs font-semibold px-2 py-1 rounded opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-2 z-10">
                            Github
                        </span>
                    </Link>
                )}
                {x && (
                    <Link target="_blank" href={x} className="relative text-white group">
                        <X className="w-5 h-5" />
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full bg-[#262626] text-xs font-semibold px-2 py-1 rounded opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-2 z-10">
                            Twitter
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProfileSimple;
