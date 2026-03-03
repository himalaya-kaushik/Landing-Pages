import type {
    Announcement,
    FeaturedDish,
    Review,
} from "@/lib/supabase/types";

/**
 * @description Fallback data used when Supabase is not configured.
 * This mirrors the content visible in the Stitch design screens
 * so the UI is fully functional during development and demos.
 */

/** Placeholder image URLs from Unsplash for demo purposes. */
const PLACEHOLDER_IMAGES = {
    cocktail:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    dining:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    steak:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    pasta:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    sushi:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
    band:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    dessert:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
    lounge:
        "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80",
    hero:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80",
};

export const FALLBACK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: "1",
        title: "Live Jazz Tonight",
        description:
            "Enjoy smooth jazz with The Falcon House Band every Friday, 8 PM onwards.",
        image_url: PLACEHOLDER_IMAGES.band,
        badge: "LIVE MUSIC",
        is_active: true,
        sort_order: 0,
        grid_size: "wide",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "2",
        title: "New Year's Eve Gala",
        description:
            "Ring in 2025 at Panchkula's most exclusive celebration. Limited tickets.",
        image_url: PLACEHOLDER_IMAGES.cocktail,
        badge: "NEW",
        is_active: true,
        sort_order: 1,
        grid_size: "normal",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "3",
        title: "Chef's Tasting Menu",
        description:
            "A curated 7-course journey through global flavors. Available weekends only.",
        image_url: PLACEHOLDER_IMAGES.dining,
        badge: null,
        is_active: true,
        sort_order: 2,
        grid_size: "normal",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "4",
        title: "IPL Live Screening",
        description:
            "Watch every match on our 120-inch screen. Bucket deals all night.",
        image_url: PLACEHOLDER_IMAGES.lounge,
        badge: "LIVE MATCH",
        is_active: true,
        sort_order: 3,
        grid_size: "tall",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "5",
        title: "Private Dining Room",
        description:
            "Book our VIP lounge for up to 20 guests. Perfect for celebrations.",
        image_url: PLACEHOLDER_IMAGES.dessert,
        badge: null,
        is_active: true,
        sort_order: 4,
        grid_size: "normal",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export const FALLBACK_DISHES: FeaturedDish[] = [
    {
        id: "1",
        name: "Truffle Wagyu Steak",
        description:
            "A5-grade wagyu seared to perfection, finished with black truffle butter and a red wine demi-glace.",
        price: "₹2,450",
        image_url: PLACEHOLDER_IMAGES.steak,
        category: "Main Course",
        is_featured: true,
        sort_order: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "2",
        name: "Lobster Tagliatelle",
        description:
            "Hand-rolled pasta with butter-poached lobster, saffron cream, and crispy garlic breadcrumbs.",
        price: "₹1,850",
        image_url: PLACEHOLDER_IMAGES.pasta,
        category: "Main Course",
        is_featured: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "3",
        name: "Omakase Platter",
        description:
            "Chef's choice of 12 seasonal nigiri and sashimi pieces, served with house-pickled ginger.",
        price: "₹1,650",
        image_url: PLACEHOLDER_IMAGES.sushi,
        category: "Appetizer",
        is_featured: true,
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export const FALLBACK_REVIEWS: Review[] = [
    {
        id: "1",
        author_name: "Rajesh Sharma",
        rating: 5,
        text: "Absolutely incredible ambiance and food. The best lounge in Panchkula without a doubt. The truffle steak is to die for!",
        relative_time: "2 weeks ago",
        profile_photo_url: null,
        created_at: new Date().toISOString(),
    },
    {
        id: "2",
        author_name: "Priya Malhotra",
        rating: 5,
        text: "Perfect spot for date nights. The live jazz on Fridays is a wonderful touch. Service is impeccable.",
        relative_time: "1 month ago",
        profile_photo_url: null,
        created_at: new Date().toISOString(),
    },
    {
        id: "3",
        author_name: "Amit Kapoor",
        rating: 4,
        text: "Great cocktails and a stunning interior. The valet parking is a nice perk. Slightly pricey but worth every rupee.",
        relative_time: "3 weeks ago",
        profile_photo_url: null,
        created_at: new Date().toISOString(),
    },
    {
        id: "4",
        author_name: "Sneha Gupta",
        rating: 5,
        text: "The chef's tasting menu was a culinary masterpiece. Seven courses of pure bliss. Already planning my next visit!",
        relative_time: "1 week ago",
        profile_photo_url: null,
        created_at: new Date().toISOString(),
    },
    {
        id: "5",
        author_name: "Vikram Singh",
        rating: 5,
        text: "Watched the IPL final here — massive screen, great food, electric atmosphere. The Falcon is Panchkula's pride.",
        relative_time: "2 months ago",
        profile_photo_url: null,
        created_at: new Date().toISOString(),
    },
];
