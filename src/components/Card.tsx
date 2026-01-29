interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`bg-stone-800 rounded-xl shadow drop-shadow-stone-900 drop-shadow-md ${className}`}>
            {children}
        </div>
    )
}