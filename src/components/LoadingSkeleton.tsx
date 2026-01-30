import Card from './Card'

export default function LoadingSkeleton() {
    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <Card className="p-8 bg-neutral-900 border-neutral-800 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <div className="w-40 h-40 bg-neutral-800 rounded-3xl" />
                        <div className="space-y-4 text-center md:text-left">
                            <div className="h-12 bg-neutral-800 rounded w-80" />
                            <div className="h-6 bg-neutral-800 rounded w-48" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <div className="h-12 bg-neutral-800 rounded w-32" />
                        <div className="w-48 h-48 bg-neutral-800 rounded-full" />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-8 bg-neutral-800 rounded w-40" />
                        <div className="w-32 h-32 bg-neutral-800 rounded-full" />
                    </div>
                </div>
            </Card>

            <Card className="bg-neutral-900 border-neutral-800 animate-pulse">
                <div className="p-6 space-y-4">
                    <div className="h-8 bg-neutral-800 rounded w-64" />
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="h-16 bg-neutral-800/50 rounded" />
                    ))}
                </div>
            </Card>

            <Card className="bg-neutral-900 border-neutral-800 animate-pulse">
                <div className="p-6 space-y-4">
                    <div className="h-8 bg-neutral-800 rounded w-72" />
                    <div className="h-96 bg-neutral-800/50 rounded" />
                </div>
            </Card>
        </div>
    );
}