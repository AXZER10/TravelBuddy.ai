// const {
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for a Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions, and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "Okay, here's a travel plan for a couple on a budget in Las Vegas for 3 days, along with hotel options and a detailed itinerary, all in JSON format:\n\n```json\n{\n  \"tripDetails\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 Days\",\n    \"budget\": \"Cheap\",\n    \"travelers\": \"Couple\"\n  },\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40-80 per night\",\n       \"hotelImageURL\": \"https://media.hrs.com/media/image/8c/b1/60/Circus_Circus_Hotel_Casino-Las_Vegas-Hotel_outdoor_2-17701.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1379,\n        \"longitude\": -115.1646\n      },\n      \"rating\": 3.5,\n      \"description\": \"A classic Las Vegas experience with affordable rooms, a midway, and free circus acts. Great for those on a budget.\"\n    },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$50-90 per night\",\n       \"hotelImageURL\": \"https://www.usatoday.com/gcdn/-mm-/9a1289d656b1a09c71f8348b0a3a85724a613881/c=0-188-3000-1888/local/-/media/2017/05/12/USATODAY/USATODAY/636301508416640286-Excalibur.jpg\",\n       \"geoCoordinates\": {\n        \"latitude\": 36.0987,\n        \"longitude\": -115.1725\n      },\n      \"rating\": 3.8,\n      \"description\": \"A medieval-themed hotel with affordable rooms and several entertainment options. Good location on the Strip.\"\n    },\n     {\n      \"hotelName\": \"OYO Hotel and Casino Las Vegas\",\n      \"hotelAddress\": \"115 E Tropicana Ave, Las Vegas, NV 89109\",\n      \"price\": \"$45-85 per night\",\n      \"hotelImageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/82/4e/8f/oyo-hotel-casino-las-vegas.jpg?w=1200&h=-1&s=1\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0978,\n        \"longitude\": -115.1661\n      },\n      \"rating\": 3.6,\n      \"description\": \"Formerly the Hooters Hotel, now a budget-friendly option near the Strip with basic amenities and a casino.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"theme\": \"Exploring the Strip (North & Central)\",\n      \"bestTimeToVisit\": \"Late Afternoon to Evening\",\n        \"activities\": [\n           {\n            \"placeName\": \"Fremont Street Experience\",\n            \"placeDetails\": \"A pedestrian mall with a light show canopy, free live music, and street performers. A unique Las Vegas experience outside the Strip.\",\n            \"placeImageURL\": \"https://media.timeout.com/images/105278256/750/422/image.jpg\",\n             \"geoCoordinates\": {\n                \"latitude\": 36.1714,\n                \"longitude\": -115.1428\n              },\n            \"ticketPricing\": \"Free (some attractions/activities may cost)\",\n            \"rating\": 4.4,\n            \"travelTime\": \"30 minutes (from central strip by bus)\",\n             \"timeToSpend\": \"2-3 hours\"\n          },\n          {\n            \"placeName\": \"Bellagio Conservatory & Botanical Gardens\",\n            \"placeDetails\": \"A beautiful indoor garden display that changes with the seasons. A great free attraction inside the Bellagio hotel.\",\n            \"placeImageURL\": \"https://media.cntraveler.com/photos/55a2a515f736ca3e43cb73d0/16:9/w_2560%2Cc_limit/bellagio-conservatory-las-vegas-1.jpg\",\n             \"geoCoordinates\": {\n                \"latitude\": 36.1127,\n                \"longitude\": -115.1737\n              },\n             \"ticketPricing\": \"Free\",\n             \"rating\": 4.7,\n             \"travelTime\": \"10-15 minutes walk (from Excalibur)\",\n            \"timeToSpend\": \"1-2 hours\"\n          },\n          {\n            \"placeName\": \"Bellagio Fountains\",\n            \"placeDetails\": \"A spectacular free water show set to music, located in front of the Bellagio Hotel.\",\n            \"placeImageURL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/5f/02/7e/bellagio-fountains.jpg?w=1200&h=-1&s=1\",\n              \"geoCoordinates\": {\n                \"latitude\": 36.1126,\n                \"longitude\": -115.1735\n             },\n            \"ticketPricing\": \"Free\",\n            \"rating\": 4.8,\n             \"travelTime\": \"Adjacent to the Conservatory\",\n             \"timeToSpend\": \"1 hour\"\n\n          },\n          {\n             \"placeName\": \"The LINQ Promenade\",\n             \"placeDetails\": \"An outdoor shopping, dining, and entertainment district with the High Roller observation wheel.\",\n             \"placeImageURL\": \"https://media.cntraveler.com/photos/5a70996590a880150a650c11/master/w_2560%2Cc_limit/LINQ-promenade-20180227-m-02-e1517770343138.jpg\",\n             \"geoCoordinates\": {\n                \"latitude\": 36.1173,\n                \"longitude\": -115.1693\n             },\n            \"ticketPricing\": \"Free to walk around; High Roller tickets are extra\",\n             \"rating\": 4.3,\n            \"travelTime\": \"10-15 minutes walk (from Bellagio)\",\n             \"timeToSpend\": \"2-3 hours\"\n           }\n        ]\n    },\n    \"day2\": {\n       \"theme\": \"South Strip & Off-Strip Fun\",\n      \"bestTimeToVisit\": \"Morning to Afternoon\",\n      \"activities\": [\n          {\n              \"placeName\": \"Welcome to Fabulous Las Vegas Sign\",\n              \"placeDetails\": \"A famous iconic sign that should not be missed for taking photos.\",\n              \"placeImageURL\":\"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Welcome_to_Fabulous_Las_Vegas_sign_2014.jpg/1200px-Welcome_to_Fabulous_Las_Vegas_sign_2014.jpg\",\n               \"geoCoordinates\": {\n                \"latitude\": 36.0828,\n                \"longitude\": -115.1724\n              },\n              \"ticketPricing\": \"Free\",\n               \"rating\": 4.6,\n             \"travelTime\": \"10 minutes from Excalibur\",\n               \"timeToSpend\": \"30 minutes to 1 hour\"\n          },\n        {\n          \"placeName\": \"M&M's World\",\n          \"placeDetails\": \"A colorful and interactive store with M&M's merchandise, personalized M&Ms and a 3D movie.\",\n           \"placeImageURL\":\"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/55/01/8f/m-m-s-world.jpg?w=1200&h=-1&s=1\",\n            \"geoCoordinates\": {\n                \"latitude\": 36.1089,\n                \"longitude\": -115.1729\n             },\n           \"ticketPricing\": \"Free to enter (items are for purchase)\",\n            \"rating\": 4.2,\n             \"travelTime\": \"10 minutes walk from Welcome Sign\",\n           \"timeToSpend\": \"1-2 hours\"\n\n        },\n        {\n            \"placeName\": \"The Shops at Crystals\",\n            \"placeDetails\":\"An upscale shopping mall with modern architecture\",\n            \"placeImageURL\": \"https://cdn.tatlerasia.com/tatler/i/th/2023/10/25104551-crystals-mall_cover_1600x1067.jpg\",\n              \"geoCoordinates\": {\n                 \"latitude\": 36.1082,\n                \"longitude\": -115.1701\n             },\n            \"ticketPricing\": \"Free to enter\",\n            \"rating\": 4.1,\n           \"travelTime\":\"5-10 minutes walk from M&M World\",\n            \"timeToSpend\": \"1-2 hours\"\n        },\n        {\n           \"placeName\": \"Red Rock Canyon National Conservation Area\",\n           \"placeDetails\": \"A scenic desert landscape with hiking trails and rock formations. A good break from the busy Strip (requires a car or ride-share).\",\n           \"placeImageURL\":\"https://www.nps.gov/common/uploads/structured_data/3C7B12A6-1DD8-B71B-0B9073623FF9CF06.jpg\",\n            \"geoCoordinates\": {\n                \"latitude\": 36.1318,\n                \"longitude\": -115.4135\n             },\n           \"ticketPricing\": \"$15 per vehicle entry fee\",\n            \"rating\": 4.7,\n            \"travelTime\": \"30 minutes drive from Crystals Mall\",\n          \"timeToSpend\": \"3-4 hours\"\n          }\n      ]\n    },\n    \"day3\": {\n      \"theme\": \"Relaxation and Departure\",\n      \"bestTimeToVisit\":\"Morning\",\n      \"activities\": [\n          {\n            \"placeName\":\"Pool Time/Hotel Amenities\",\n            \"placeDetails\":\"Spend the morning relaxing by your hotel's pool or enjoying other amenities. A good way to unwind before heading home.\",\n            \"placeImageURL\":\"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/34/8a/35/circa-resort-casino.jpg?w=1200&h=-1&s=1\",\n            \"geoCoordinates\":{\n                \"latitude\": 36.1714,\n                \"longitude\": -115.1428\n            },\n            \"ticketPricing\":\"Free (hotel guest only)\",\n            \"rating\":4.0,\n            \"travelTime\": \"N/A\",\n              \"timeToSpend\":\"2-3 hours\"\n          },\n        {\n          \"placeName\": \"Explore Local Eateries\",\n            \"placeDetails\": \"Try out some local, budget-friendly restaurants or cafes for a final meal.\",\n           \"placeImageURL\": \"https://media-cdn.tripadvisor.com/media/photo-s/16/17/d7/25/food-and-drink.jpg\",\n            \"geoCoordinates\": {\n                \"latitude\": \"various\",\n                \"longitude\": \"various\"\n             },\n           \"ticketPricing\": \"Varies (budget-friendly options available)\",\n             \"rating\": 4.0,\n             \"travelTime\": \"Varies depending on location\",\n            \"timeToSpend\": \"1-2 hours\"\n        },\n        {\n             \"placeName\": \"Departure\",\n             \"placeDetails\":\"Head to the airport for your departure flight\",\n            \"placeImageURL\":\"https://assets.bouldercounty.gov/wp-content/uploads/2017/03/airport-1000x667.jpg\",\n              \"geoCoordinates\":{\n                 \"latitude\":\"various\",\n                 \"longitude\":\"various\"\n               },\n             \"ticketPricing\":\"N/A\",\n             \"rating\":\"N/A\",\n              \"travelTime\": \"Varies depending on Hotel and Airport Location\",\n               \"timeToSpend\":\"Varies depending on flight time\"\n\n        }\n\n      ]\n    }\n  }\n}\n```\n**Notes:**\n\n*   **Prices:** Hotel prices are estimates and can fluctuate depending on the season and demand. Always check current prices before booking.\n*   **Transportation:** The itinerary uses walking and public buses where possible to keep costs down. For Red Rock, a car or ride-share will be needed.\n*   **Flexibility:** This itinerary can be adjusted to your interests and pace.\n*   **Food:** Look for food specials, happy hours, and casual eateries to save money.\n* **Geo Coordinates** : Geo Coordinates is just to give a brief idea of Location, please note that it is not the exact point to point coordinates.\n*   **Best Time to Visit:** While the itinerary gives a specific best time, you can make adjustments to suit your travel time. For example, the Fremont Experience can be done earlier in the day as well.\n*   **Image URLs:** These are sample URLs and might vary or become unavailable. Always confirm image authenticity when booking.\n\nI hope this helps you plan a fantastic and affordable trip to Las Vegas! Let me know if you have any other questions.\n" },
            ],
        },
    ],
});
