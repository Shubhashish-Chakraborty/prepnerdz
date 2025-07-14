export const WinkLoader = () => {
    return (
        <div className="relative w-[112px] h-[112px]">
            <div className="absolute w-[112px] h-[48px] mt-[64px] ml-0 border-[16px] border-black box-border" />
            <div className="absolute w-[48px] h-[48px] mt-0 ml-0 border-[16px] border-black box-border" />
            <div className="absolute w-[48px] h-[48px] mt-0 ml-[64px] border-[16px] border-black box-border animate-wink" />
        </div>
    );
};