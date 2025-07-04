export const Card = ({
    children,
    className = "",
    ...props
}: {
    children: React.ReactNode
    className?: string
    // [key: string]: any
}) => {
    return (
        <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`} {...props}>
            {children}
        </div>
    )
}

export const CardContent = ({
    children,
    className = "",
    ...props
}: {
    children: React.ReactNode
    className?: string
    // [key: string]: any
}) => {
    return (
        <div className={`p-6 ${className}`} {...props}>
            {children}
        </div>
    )
}