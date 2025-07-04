import { Button } from "../ui/buttons/Button";
import { CloseCircle } from "@/icons/CloseCircle";
import TypingText from "../ui/TypingTest";
import InputBulged from "../ui/inputs/InputBulged";
import { Email } from "@/icons/Email";
import { Key } from "@/icons/Key";
import { EnterDoor } from "@/icons/EnterDoor";
import GoogleAuthBtn from "../ui/buttons/GoogleAuth";
import GithubAuthBtn from "../ui/buttons/GithubAuth";
import Link from "next/link";

interface LoginProps {
    open: boolean;
    onClose: () => void;
}

export const LoginModal = ({ open, onClose }: LoginProps) => {
    return (
        <>
            {open && (
                <div className="flex justify-center items-center h-screen w-screen bg-black/50 fixed top-0 left-0 z-50">
                    <div className="flex flex-col justify-center">
                        <div className="bg-white p-4 rounded-2xl w-[800px] h-[850px]">
                            <div className="flex justify-end cursor-pointer">
                                <div onClick={onClose}>
                                    <CloseCircle className="md:size-10 size-6 hover:text-red-500 transition-all duration-300" />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <span className="bg-gradient-to-r text-2xl md:text-4xl text-center font-extrabold from-blue-600 via-black-500 to-cyan-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                                    <TypingText text="Login to your PrepNerdz Account!" />
                                </span>
                            </div>

                            <div className="flex flex-col items-center space-y-8 justify-center mt-6">
                                <div>
                                    <InputBulged type="email" placeholder="Enter Email:" icon={<Email className="size-5" />} />
                                </div>

                                <div>
                                    <InputBulged type="password" placeholder="Enter Password:" icon={<Key className="size-5" />} />
                                </div>
                            </div>
                            <div className="flex justify-center mt-8">
                                <Button colorVariant="black_green" endIcon={<EnterDoor className="size-6" />} sizeVariant="medium" text="Login" />
                            </div>

                            <div className="flex justify-center mt-10 items-center">
                                <div className="flex justify-center items-center w-full cursor-default max-w-sm">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                                    <span className="px-4 text-sm font-medium text-black">OR CONTINUE WITH</span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-row space-x-10 mt-3">
                                <div>
                                    <GoogleAuthBtn text="Google" />
                                </div>

                                <div>
                                    <GithubAuthBtn text="Github" />
                                </div>
                            </div>

                            <p className="text-black font-bold text-center mt-6">
                                Don&apos;t have an account?
                                {" "}
                                <Link href={"/signup"}>
                                    <span
                                        className="text-blue-600 font-extrabold cursor-pointer hover:underline"
                                    >
                                        SignUp
                                    </span>
                                </Link>
                            </p>
                            <div className="flex justify-center transition-all duration-500 hover:text-blue-600 font-bold">
                                <Link href={"/forgot-password"}>
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};