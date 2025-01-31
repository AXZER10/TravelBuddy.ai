# ✈️ TravelBuddy.ai  

## 🏝️ Plan Smarter, Travel Better  

TravelBuddy.ai is your personal AI-powered travel assistant that curates **customized itineraries** and **tailored hotel recommendations** based on your preferences. Built with **React, Vite, TailwindCSS, Gemini AI, Google Places API, Google Maps API, and Firebase**, this application provides a **stunning user experience** with a seamless and intuitive interface.  

![TravelBuddy.ai](./assets/preview.png)  

---

## 🌍 Try It Live!  

🔗 **[Explore TravelBuddy.ai](https://travelbuddyai.netlify.app)**  

---

## 🚀 Features  

### ✨ Intelligent Travel Planning  
✅ **AI-Powered Itineraries** – Get smart trip plans based on your interests, budget, and location.  
✅ **Personalized Hotel Recommendations** – AI suggests the best accommodations tailored to your preferences.  
✅ **Google Places Autofill** – Quick and accurate location search powered by Google Places API.  

### 🎨 Beautiful & Responsive UI  
✅ **Modern, Elegant Design** – Smooth and intuitive interface for effortless planning.  
✅ **Mobile-Friendly & Responsive** – Optimized for all devices, from desktops to smartphones.  

### 🗺️ Advanced Map & Location Features  
✅ **Google Maps Integration** – View trip locations, hotels, and destinations directly on an interactive map.  
✅ **Street View & Directions** – Seamlessly get directions and real-time navigation support.  
✅ **Place Images & Reviews** – Fetch high-quality images and reviews from Google Places API.  

### 🔒 Secure & Efficient  
✅ **Google Authentication** – Quick and secure login with OAuth.  
✅ **Fast & Lightweight** – Built with **Vite** for lightning-fast performance.  
✅ **Firebase Backend** – Seamless data storage and user authentication.  

---

## 🛠️ Tech Stack  

| **Technology** | **Purpose** |
|--------------|------------|
| **React + Vite** | Frontend Development |
| **TailwindCSS** | Styling & Responsiveness |
| **Gemini AI** | AI-Powered Itinerary & Recommendations |
| **Google Places API** | Location Search, Autofill & Reviews |
| **Google Maps API** | Interactive Maps, Directions & Navigation |
| **Firebase** | Backend & Authentication |
| **Google OAuth** | Secure User Authentication |

---

## 📸 Screenshots  

| **Home Page** |
|--------------|
| ![Home](https://github.com/user-attachments/assets/a8b05837-162a-4b22-95f4-6fb26164a2e2) |

| **Custom Trip Planning** |
|--------------|
| ![Create_Trip](https://github.com/user-attachments/assets/b89521dc-f363-44b6-b367-e0f985314266) |

| **Google Authentication** |
|--------------|
| ![Google Auth](https://github.com/user-attachments/assets/601c12c1-75c6-4808-812e-e98e65f876cd) |

| **My Trips Dashboard** |
|--------------|
| ![My_Trips](https://github.com/user-attachments/assets/30b7f65b-bae9-49a1-a282-751af1da723a) |

| **Itinerary & Hotel Recommendations** |
|--------------|
| ![Itinerary_and_Hotel_Reccomendations](https://github.com/user-attachments/assets/820e9717-7233-4ff8-ab0d-e6c974a7f6f3) |

| **Google Maps Integration** |
|--------------|
| ![Google Maps](https://github.com/user-attachments/assets/56cb02bc-d523-4296-9cda-17b8a570b93f) |

---

## 🔧 Installation  

To set up and run the project locally:  

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-travel-planner.git

# Navigate into the project folder
cd ai-travel-planner

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 🔑 API Setup  

To use **Google Places API** and **Google Maps API**, follow these steps:  

### 1️⃣ Get API Key  
Visit the **[Google Cloud Console](https://console.cloud.google.com/)** and enable the following APIs:  
- **Google Places API**  
- **Google Maps JavaScript API**  
- **Google Maps Directions API**  

### 2️⃣ Set Up Environment Variables  
Create a `.env` file in your project root and add the following:  

```plaintext
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

**Note** : Replace your_google_maps_api_key and your_google_places_api_key with your actual API keys from Google Cloud Console.

### 3️⃣ Restart Your Development Server  
After saving the `.env` file, restart your server to apply the changes:  
```bash
npm run dev
```

---

## 📜 License  

This project is licensed under the MIT License.  
