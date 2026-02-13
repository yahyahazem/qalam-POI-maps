export async function searchPlaces(parsedData: any) {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    if (!GOOGLE_MAPS_API_KEY) {
        throw new Error("GOOGLE_MAPS_API_KEY is not defined");
    }

    const { location, category, sub_type, features } = parsedData;
    const searchQuery = `${sub_type || category} in ${location} ${features?.join(" ")}`.trim();

    try {
        const response = await fetch(
            "https://places.googleapis.com/v1/places:searchText",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
                    "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.priceLevel,places.currentOpeningHours.openNow,places.id,places.location",
                },
                body: JSON.stringify({
                    textQuery: searchQuery,
                    languageCode: "ar",
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Google Places API Error:", errorText);
            throw new Error(`Google Places Error (${response.status}): ${errorText || response.statusText}`);
        }

        const result = await response.json();
        return result.places || [];
    } catch (error) {
        console.error("Error searching places:", error);
        throw error;
    }
}
