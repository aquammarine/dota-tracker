interface CardProps {
    children: React.ReactNode;
    classname?: string;
}

export default function Card({ children, classname = "" }: CardProps) {
    return (
        <div className={classname}>
            {children}
        </div>
    )
}