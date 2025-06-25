import Image from "next/image"

export const Navbar = () => {
    return (
        <div>
            <div>
                <Image src={"/testLogo.png"} alt="logo" width={100} height={100}/>
            </div>
        </div>
    )
}