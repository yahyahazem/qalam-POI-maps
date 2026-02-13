import { Star, MapPin, ExternalLink, Clock } from "lucide-react";

interface Place {
    id: string;
    displayName: { text: string };
    formattedAddress: string;
    rating?: number;
    userRatingCount?: number;
    priceLevel?: string;
    currentOpeningHours?: { openNow: boolean };
}

export default function ResultCard({ place }: { place: Place }) {
    const priceIcons = (level?: string) => {
        const icons = {
            PRICE_LEVEL_INEXPENSIVE: "💰",
            PRICE_LEVEL_MODERATE: "💰💰",
            PRICE_LEVEL_EXPENSIVE: "💰💰💰",
            PRICE_LEVEL_VERY_EXPENSIVE: "💰💰💰💰",
        };
        return icons[level as keyof typeof icons] || "";
    };

    return (
        <div className="qalam-card flex flex-col gap-3 group hover:border-qalam-teal/30 transition-all">
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-lg text-qalam-text group-hover:text-qalam-teal transition-colors">
                    {place.displayName.text}
                </h3>
                {place.currentOpeningHours && (
                    <span className={`text-xs px-2 py-1 rounded-full ${place.currentOpeningHours.openNow ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {place.currentOpeningHours.openNow ? "مفتوح الآن ✅" : "مغلق حالياً ❌"}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} className="shrink-0" />
                <span className="truncate">{place.formattedAddress}</span>
            </div>

            <div className="flex items-center gap-4 mt-auto pt-2 border-t border-gray-50">
                {place.rating && (
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span>{place.rating}</span>
                        <span className="text-gray-400 text-xs">({place.userRatingCount})</span>
                    </div>
                )}

                {place.priceLevel && (
                    <div className="text-xs text-gray-500">
                        {priceIcons(place.priceLevel)}
                    </div>
                )}

                <a
                    href={`https://www.google.com/maps/place/?q=place_id:${place.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-auto text-qalam-teal hover:underline flex items-center gap-1 text-sm font-medium"
                >
                    <span>عرض</span>
                    <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
}
