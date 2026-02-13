export default function ResultSkeleton() {
    return (
        <div className="qalam-card flex flex-col gap-3 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="h-6 w-1/2 bg-gray-100 rounded"></div>
                <div className="h-5 w-20 bg-gray-50 rounded-full"></div>
            </div>
            <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
            <div className="flex gap-4 mt-auto pt-2 border-t border-gray-50">
                <div className="h-4 w-12 bg-gray-100 rounded"></div>
                <div className="h-4 w-8 bg-gray-100 rounded"></div>
                <div className="h-4 w-16 bg-gray-100 rounded mr-auto"></div>
            </div>
        </div>
    );
}
