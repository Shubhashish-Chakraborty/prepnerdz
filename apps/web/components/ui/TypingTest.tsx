import { Typewriter } from 'react-simple-typewriter';

const TypingText = ( {text , loop, typeSpeed}: {
    text: string;
    loop?: number | 1;
    typeSpeed?: number | 50;
} ) => {
    return (
        <span>
            <Typewriter
                words={[text]}
                loop={loop} // 1 for Type once
                cursor
                cursorStyle=""
                typeSpeed={typeSpeed}
                deleteSpeed={0}
                delaySpeed={1000}
            />
        </span>
    );
};

export default TypingText;