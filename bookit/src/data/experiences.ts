import { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Kayaking",
    location: "Udupi",
    price: 999,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.",
    category: "Water Sports"
  },
  {
    id: "2",
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    price: 899,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Adventure"
  },
  {
    id: "3",
    title: "Coffee Trail",
    location: "Coorg",
    price: 1299,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Nature"
  },
  {
    id: "4",
    title: "Kayaking",
    location: "Udupi, Karnataka",
    price: 999,
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Water Sports"
  },
  {
    id: "5",
    title: "Boat Cruise",
    location: "Sunderban",
    price: 999,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Water Sports"
  },
  {
    id: "6",
    title: "Bunjee Jumping",
    location: "Manali",
    price: 999,
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Adventure"
  },
  {
    id: "7",
    title: "Coffee Trail",
    location: "Coorg",
    price: 1299,
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Nature"
  },
  {
    id: "8",
    title: "Trekking Adventure",
    location: "Chikmagalur",
    price: 1499,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Experience the thrill of mountain trekking.",
    category: "Adventure"
  },
];

export const availableDates = [
  { date: "2025-10-22", times: ["09:00 am", "11:00 am", "02:00 pm", "04:00 pm"] },
  { date: "2025-10-23", times: ["09:00 am", "11:00 am", "02:00 pm", "04:00 pm"] },
  { date: "2025-10-24", times: ["09:00 am", "11:00 am", "02:00 pm"] },
  { date: "2025-10-25", times: ["09:00 am", "02:00 pm", "04:00 pm"] },
  { date: "2025-10-26", times: ["11:00 am", "02:00 pm", "04:00 pm"] },
];

export const promoCodes = {
  SAVE10: { discount: 10, type: "percentage" as const },
  FLAT100: { discount: 100, type: "fixed" as const },
};
