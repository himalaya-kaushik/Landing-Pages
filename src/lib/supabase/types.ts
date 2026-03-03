/**
 * @description TypeScript types for The Falcon Cafe database tables.
 * These mirror the Supabase schema defined in supabase/schema.sql.
 */

/** A single bento grid tile / announcement on the homepage. */
export interface Announcement {
    id: string;
    title: string;
    description: string | null;
    image_url: string | null;
    badge: string | null;
    is_active: boolean;
    sort_order: number;
    grid_size: "normal" | "wide" | "tall";
    created_at: string;
    updated_at: string;
}

/** A featured dish displayed in the Signature Three section. */
export interface FeaturedDish {
    id: string;
    name: string;
    description: string | null;
    price: string | null;
    image_url: string | null;
    category: string | null;
    is_featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

/** A Google review stored in the database. */
export interface Review {
    id: string;
    author_name: string;
    rating: number;
    text: string | null;
    relative_time: string | null;
    profile_photo_url: string | null;
    created_at: string;
}

/** A key-value site setting stored as JSONB. */
export interface SiteSetting {
    key: string;
    value: Record<string, unknown>;
    updated_at: string;
}

/** Shape of the 'live_match' site setting value. */
export interface LiveMatchSetting {
    enabled: boolean;
    label: string;
}

/** Shape of the 'operating_hours' site setting value. */
export interface OperatingHoursSetting {
    open: string;
    close: string;
    happy_hour_start: string;
    happy_hour_end: string;
}
