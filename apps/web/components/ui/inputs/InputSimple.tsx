export const Input = ({
    className = "",
    type = "text",
    placeholder,
    value,
    onChange,
    ...props
}: {
    className?: string
    type?: string
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    // [key: string]: any
}) => {
    return (
        <input
            type={type}
            className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
        />
    )
}