interface ErrorMessageProps {
    message: string,
    errorType: string,
    description: string
}

export default function ErrorMessage({ message, errorType, description }: ErrorMessageProps) {
    return (
        <div className="max-w-2xl mx-auto mt-20 p-8 bg-red-900/20 border border-red-500/50 rounded-2xl text-center">
            <p className="text-2xl font-bold text-red-400 mb-4">{errorType}</p>
            <p className="text-neutral-300">{message}</p>
            <p className="text-sm text-neutral-500 mt-4">{description}</p>
        </div>
    );
}