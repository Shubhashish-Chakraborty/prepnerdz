import AnimatedBackground from "../motion-animations/Three_jelly"
import { Navbar } from "../ui/Navbar"

export const HomeLanding = () => {
    return (
        <div>
            <AnimatedBackground>
                <Navbar/>
            </AnimatedBackground>
        </div>
    )
}