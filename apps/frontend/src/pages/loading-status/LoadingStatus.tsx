import { Skeleton } from "@/components/ui/skeleton"

export const LoadingDashboard = () => {
    return (
        <div className="container mx-auto p-4 space-y-6">
            <header className="flex justify-between items-center py-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-40" />
            </header>

            <Skeleton className="h-12 w-full mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-lg" />
                    ))}
            </div>
        </div>
    )
}

