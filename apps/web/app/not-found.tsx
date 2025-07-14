import { Button } from "@/components/ui/buttons/Button";
import Navbar from "@/components/ui/navbars/Navbar";
import { Home } from "@/icons/Home";
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className="mt-30 flex flex-col justify-center items-center">

                <div className="flex flex-col justify-center">
                    <span className="text-3xl md:text-6xl font-bold"> Page Not Found! </span>
                </div>

                <div className="mt-10">
                    <Link href={"/"}>
                        <Button
                            colorVariant="blue"
                            sizeVariant="medium"
                            text="Go to Home"
                            endIcon={<Home className="size-6"/>}
                        />
                    </Link>
                </div>



            </div>
        </>
    )
}