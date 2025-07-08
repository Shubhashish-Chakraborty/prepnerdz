import { Github } from '@/icons/Github';
import { Instagram } from '@/icons/Instagram';
import { Linkedin } from '@/icons/Linkedin';
import { X } from '@/icons/X';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';

const ProfileSimple = ({ name, image, mail, github, linkedin, instagram, x }: {
    name: string;
    image: string;
    mail: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
    x?: string;
}) => {
    return (
        <StyledWrapper>
            <div className="card-client">
                <div className="user-picture">
                    <Image src={image} alt="profile" width={200} height={200} />

                </div>
                <p className="name-client"> {name}
                </p>
                <div onClick={() => {
                    navigator.clipboard.writeText(mail);
                    toast.success('Email copied to clipboard!');
                }} className='text-amber-300 font-bold cursor-pointer hover:underline'>
                    {mail}
                </div>
                <div className="social-media">
                    <div className='flex justify-center'>
                        {linkedin && (
                            <Link target='_blank' href={linkedin}>
                                <Linkedin className="size-5" />
                                <span className="tooltip-social">LinkedIn</span>
                            </Link>
                        )}
                        {instagram && (
                            <Link target='_blank' href={instagram}>
                                <Instagram className="size-5" />
                                <span className="tooltip-social">Instagram</span>
                            </Link>
                        )}
                        {github && (
                            <Link target='_blank' href={github}>
                                <Github className="size-5" />
                                <span className="tooltip-social">Github</span>
                            </Link>
                        )}
                        {x && (
                            <Link target='_blank' href={x}>
                                <X className="size-5" />
                                <span className="tooltip-social">Twitter</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card-client {
    background: #555;
    width: 25rem;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 20px;
    padding-right: 20px;
    border: 4px solid #fff;
    box-shadow: 0 6px 10px #212121;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    font-family: "Poppins", sans-serif;
    transition: all 0.3s ease;
  }

  .card-client:hover {
    transform: translateY(-10px);
  }

  .user-picture {
    overflow: hidden;
    object-fit: cover;
    width: 10rem;
    height: 10rem;
    border: 4px solid #fff;
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .user-picture svg {
    width: 2.5rem;
    fill: currentColor;
  }

  .name-client {
    margin: 0;
    margin-top: 20px;
    font-weight: 600;
    font-size: 18px;
  }

  .name-client span {
    display: block;
    font-weight: 200;
    font-size: 16px;
  }

    
  .social-media:before {
    content: " ";
    display: block;
    width: 100%;
    height: 2px;
    margin: 20px 0;
    background: #fff;
  }

  .social-media a {
    position: relative;
    margin-right: 15px;
    text-decoration: none;
    color: inherit;
  }

  .social-media a:last-child {
    margin-right: 0;
  }

  .social-media a svg {
    width: 1.1rem;
    fill: currentColor;
  }

  /*-- Tooltip Social Media --*/
  .tooltip-social {
    background: #262626;
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    padding: 0.5rem 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 600;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, -90%);
    transition: all 0.2s ease;
    z-index: 1;
  }

  .tooltip-social:after {
    content: " ";
    position: absolute;
    bottom: 1px;
    left: 50%;
    border: solid;
    border-width: 10px 10px 0 10px;
    border-color: transparent;
    transform: translate(-50%, 100%);
  }

  .social-media a .tooltip-social:after {
    border-top-color: #262626;
  }

  .social-media a:hover .tooltip-social {
    opacity: 1;
    transform: translate(-50%, -130%);
  }`;

export default ProfileSimple;
