import { sanityClient, urlFor, isSanityConfigured } from "./sanity";

export type SanityDish = {
  name: string;
  description: string;
  price: string;
  image: string;
};

export type SanityLiveEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  seats: string;
  description: string;
  image: string;
};

export async function getDishes(): Promise<SanityDish[] | null> {
  if (!isSanityConfigured()) return null;

  try {
    const raw = await sanityClient.fetch(
      `*[_type == "dish"] | order(order asc) {
        name,
        description,
        price,
        image
      }`
    );

    if (!raw || raw.length === 0) return null;

    return raw.map(
      (d: { name: string; description: string; price: string; image: SanityImageRef }) => ({
        name: d.name,
        description: d.description,
        price: d.price,
        image: urlFor(d.image).width(900).quality(80).auto("format").url(),
      })
    );
  } catch {
    return null;
  }
}

export async function getLiveEvents(): Promise<SanityLiveEvent[] | null> {
  if (!isSanityConfigured()) return null;

  try {
    const raw = await sanityClient.fetch(
      `*[_type == "liveEvent"] | order(order asc) {
        _id,
        title,
        date,
        time,
        location,
        seats,
        description,
        image
      }`
    );

    if (!raw || raw.length === 0) return null;

    return raw.map(
      (e: {
        _id: string;
        title: string;
        date: string;
        time: string;
        location: string;
        seats: string;
        description: string;
        image: SanityImageRef;
      }) => ({
        id: e._id,
        title: e.title,
        date: e.date,
        time: e.time,
        location: e.location,
        seats: e.seats,
        description: e.description,
        image: urlFor(e.image).width(1200).quality(80).auto("format").url(),
      })
    );
  } catch {
    return null;
  }
}

type SanityImageRef = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};
