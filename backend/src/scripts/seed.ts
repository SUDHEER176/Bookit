import dotenv from 'dotenv';
import supabase from '../config/db';

dotenv.config();

const experiences = [
  {
    title: "Kayaking",
    location: "Udupi",
    price: 999,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.",
    category: "Water Sports"
  },
  {
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    price: 899,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Adventure"
  },
  {
    title: "Coffee Trail",
    location: "Coorg",
    price: 1299,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Nature"
  },
  {
    title: "Kayaking",
    location: "Udupi, Karnataka",
    price: 999,
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Water Sports"
  },
  {
    title: "Boat Cruise",
    location: "Sunderban",
    price: 999,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Water Sports"
  },
  {
    title: "Bunjee Jumping",
    location: "Manali",
    price: 999,
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Adventure"
  },
  {
    title: "Coffee Trail",
    location: "Coorg",
    price: 1299,
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    category: "Nature"
  },
  {
    title: "Trekking Adventure",
    location: "Chikmagalur",
    price: 1499,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Experience the thrill of mountain trekking.",
    category: "Adventure"
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing experiences (optional)
    const { error: delErr } = await supabase.from('experiences').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (delErr) throw delErr;

    // Insert experiences
    const { data, error } = await supabase
      .from('experiences')
      .insert(experiences)
      .select('id');
    if (error) throw error;

    console.log(`✅ Successfully seeded ${data?.length || 0} experiences`);
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();

