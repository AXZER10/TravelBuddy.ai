export const SelectBudgetOptions = [
    {
        id: 1,
        icon: "💵",
        title: "Cheap",
        desc: "Economize and Save"
    },
    {
        id: 2,
        icon: "💰",
        title: "Moderate",
        desc: "Balance Cost and Comfort"
    },
    {
        id: 3,
        icon: "💎",
        title: "Luxury",
        desc: "Indulge without Limits"
    },
];

export const SelectNoOfPersons = [
    {
        id: 1,
        icon: "🚶",
        title: "Solo",
        desc: "Discovering on Your Own",
        no: "1 Person"
    },
    {
        id: 2,
        icon: "💑",
        title: "Couple",
        desc: "Exploring with a Loved One",
        no: "2 People"
    },
    {
        id: 3,
        icon: "🏡",
        title: "Family",
        desc: "Fun for All Ages",
        no: "3 to 5 People"
    },
    {
        id: 4,
        icon: "🏘️",
        title: "Large Family",
        desc: "Multiple Families or a Big Family",
        no: "10 to 15 People"
    },
    {
        id: 5,
        icon: "🤝",
        title: "Friends",
        desc: "Adventure with Your Crew",
        no: "5 to 10 People"
    },
];

export const PROMPT = `Create an optimal trip itinerary based on the specified location, duration, budget, and number of persons. Generate a travel plan for Location: {location}, Duration: {noOfDays} Days, with {People} people or group, and Budget: {Budget}. Provide a list of hotels with the following details: hotel name, description, address, rating, price, location on the map, coordinates, and an image URL. Additionally, create the itinerary for {noOfDays} days, suggesting places to visit with the following details: place name, description, pricing, timings, place image URLs, and location (coordinates or map). Ensure the entire trip is within the {Budget} level. Important: Return the result in JSON format. The output should be structured as follows:

{
    "hotelOptions": [
        {
            "hotelName": "Hotel Name",
            "description": "Brief description of the hotel and its amenities.",
            "address": "Full address of the hotel.",
            "rating": "Hotel rating on a scale of 1 to 5.",
            "price": "Price range per night.",
            "coordinates": {
                "latitude": "Latitude coordinate",
                "longitude": "Longitude coordinate"
            },
            "locationInMap": "Link to hotel location on Google Maps.",
            "imageURL": "Link to the hotel's image."
        },
        ...
    ],
    "tripDetails": {
        "location": "Destination name",
        "duration": "Duration of the trip in days",
        "travelers": "Group size",
        "budget": "Budget category"
    },
    "itinerary": {
        "dayX": {
            "theme": "Day theme or focus",
            "activities": [
                {
                    "placeName": "Place name",
                    "details": "Detailed description of the place.",
                    "pricing": "Pricing details for entry, activities, etc.",
                    "timings": "Opening hours or best time to visit.",
                    "location": {
                        "latitude": "Latitude coordinate",
                        "longitude": "Longitude coordinate"
                    },
                    "placeImageURL": "Link to the image of the place."
                },
                ...
            ]
        },
        ...
    }
}`;