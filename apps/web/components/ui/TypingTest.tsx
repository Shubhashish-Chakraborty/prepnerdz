import { Typewriter } from 'react-simple-typewriter';

const TypingText = ( {text , loop}: {
    text: string;
    loop?: number | 1;
} ) => {
    return (
        <span>
            <Typewriter
                words={[text]}
                loop={loop} // 1 for Type once
                cursor
                cursorStyle=""
                typeSpeed={50}
                deleteSpeed={0}
                delaySpeed={1000}
            />
        </span>
    );
};

export default TypingText;