import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
    return (
        <div>
            {/* left */}
            <div>
                {/* logo */}
                <div>
                    <Link href={"/"}>
                        <Image
                            src={"/prepnerdz-logo-with-code.png"}
                            alt="logo"
                            width={200}
                            height={200}
                            className="hover:scale-105 transition-all duration-500"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}