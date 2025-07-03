import { Close } from "@/icons/Close";
import { Button } from "../ui/buttons/Button";

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
                        <div className="bg-white p-4 rounded-lg w-96">
                            <div className="flex justify-end cursor-pointer">
                                <div onClick={onClose}>
                                    <Close />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center bg-purple-100 rounded-lg hover:bg-cyan-100 transition-all duration-500">
                                <h1 className="font-bold text-2xl">HERE THE TITLE</h1>
                            </div>

                            <div className="flex justify-center mt-6">
                                <Button
                                    colorVariant="yellow"
                                    text={"Submit"}
                                    sizeVariant="medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};