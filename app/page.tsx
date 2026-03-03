import Image from "next/image";
import { faFacebookF, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LiveEventsCarousel, type LiveEvent } from "@/components/live-events-carousel";
import { ReviewLinksButton } from "@/components/review-links-button";
import { getDishes, getLiveEvents } from "@/lib/queries";

export const revalidate = 60;

const navigation = [
  { label: "Menu", href: "#menu" },
  { label: "Events", href: "#events" },
  { label: "Reviews", href: "#testimonials" },

  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/FalconCafeLounge/",
    icon: faFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/falcon.dine.lounge/",
    icon: faInstagram,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/falcondine",
    icon: faXTwitter,
  },
];

const fallbackDishes = [
  {
    name: "Lumpia with Sauce",
    description:
      "Hand-rolled spring bites with fresh herbs and a sweet chili house dip.",
    price: "$12",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Fish and Veggie",
    description:
      "Pan-seared fish served with seasonal vegetables and citrus butter glaze.",
    price: "$14",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Tofu Chili",
    description:
      "Spicy tofu tossed in roasted peppers, garlic, and black bean dressing.",
    price: "$11",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Egg and Cucumber",
    description:
      "A vibrant bowl with soft eggs, crisp cucumber, and toasted sesame.",
    price: "$10",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",
  },
];

const fallbackEvents: LiveEvent[] = [
  {
    id: "event-jazz",
    title: "Friday Jazz and Dinner Night",
    date: "Friday, 19 Apr",
    time: "7:00 PM - 10:30 PM",
    location: "Main Hall Stage",
    seats: "26 seats left",
    description:
      "Enjoy signature dishes with a live jazz trio and curated beverage pairing menu.",
    image:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "event-chef-table",
    title: "Chef Table Live Tasting",
    date: "Saturday, 20 Apr",
    time: "6:30 PM - 9:00 PM",
    location: "Open Kitchen Counter",
    seats: "12 seats left",
    description:
      "Watch the kitchen in action while tasting five courses built from local produce.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "event-acoustic",
    title: "Sunday Acoustic Brunch",
    date: "Sunday, 21 Apr",
    time: "11:00 AM - 2:30 PM",
    location: "Garden Terrace",
    seats: "40 seats left",
    description:
      "Slow brunch favorites, fresh pastries, and live acoustic sessions in our terrace garden.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
  },
];

const testimonials = [
  {
    name: "Ama Ampomah",
    role: "CEO & Founder Inc",
    quote:
      "Everything from the service to the live music felt thoughtful. It is now our go-to spot for team celebrations.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kweku Annan",
    role: "CEO & Founder Inc",
    quote:
      "The menu has personality, and every plate looked and tasted premium. Reservation and service were both effortless.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
];

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Falcon Restaurant",
  url: "https://restaurant-falcon.vercel.app",
  description:
    "A modern dining destination featuring signature dishes, table reservations, and weekly live events.",
  servesCuisine: ["International", "Fusion", "Vegan"],
  priceRange: "$$",
  telephone: "0172 258 4965",
  address: {
    "@type": "PostalAddress",
    streetAddress: "245 Flavor Street",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10001",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "21:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com",
    "https://www.facebook.com",
    "https://www.twitter.com",
  ],
};

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#ea6d27] px-7 py-3 font-semibold text-white transition hover:bg-[#d85e1e]";

const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-full border border-[#d9b493] px-7 py-3 font-semibold text-[#8d5f34] transition hover:bg-[#fff2e4]";

const currentYear = new Date().getFullYear();

export default async function Home() {
  const [sanityDishes, sanityEvents] = await Promise.all([
    getDishes(),
    getLiveEvents(),
  ]);


  const dishes = sanityDishes ?? fallbackDishes;
  const liveEvents = sanityEvents ?? fallbackEvents;

  return (
    <div className="bg-[#fffaf3] text-[#1c140d]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 border-b border-[#f1e2d3] bg-[#fffaf3]/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#home" className="flex items-center gap-3">
            <Image
              src="/logo/logo.png"
              alt="Falcon Cafe & Lounge logo"
              width={55}
              height={55}
              className="object-contain"
              priority
            />
            <span className="text-xl font-bold tracking-wide text-[#311f09]">
              Falcon Cafe & Lounge
            </span>
          </a>

          <nav aria-label="Primary" className="hidden gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#5f4b3a] transition hover:text-[#ea6d27]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="https://www.zomato.com/chandigarh/falcon-dine-lounge-sector-16-panchkula/book" target="_blank" rel="noopener noreferrer" className={primaryButtonClass}>
            Book a table
          </a>
        </div>
      </header>

      <main id="main-content">
        <section id="home" className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute -left-44 top-0 h-112 w-md rounded-full bg-[#fdf0e3]" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#fde8d4]" />

          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <p className="inline-flex rounded-full bg-[#fff0e0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#bc8a5f]">
                Fresh flavor daily
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-tight text-[#311f09] sm:text-6xl">
                The Perfect Landing for Good Times
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f4b3a]">
                Discover handcrafted meals made from seasonal ingredients and
                served in a warm atmosphere where every table feels special.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="https://www.zomato.com/chandigarh/falcon-dine-lounge-sector-16-panchkula/book" target="_blank" rel="noopener noreferrer" className={primaryButtonClass}>
                  Book a table
                </a>
                <a href="#menu" className={secondaryButtonClass}>
                  Our Signature Dishes
                </a>
              </div>
              <div className="mt-10 flex items-center gap-4 text-[#8d5f34]">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9b493] text-base transition hover:bg-[#fff2e4]"
                    aria-label={`Visit ${social.name}`}
                  >
                    <FontAwesomeIcon icon={social.icon} aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[440px] overflow-hidden rounded-[2.25rem] border border-[#edd7c2] bg-[#fbe7d1] shadow-[0_24px_80px_rgba(49,31,9,0.15)] sm:h-[560px]">
                <Image
                  src="/images/main_image.png"
                  alt="Chef serving a fresh plate in restaurant ambience"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 left-6 rounded-2xl border border-[#edd7c2] bg-white/95 p-4 shadow-lg sm:left-8">
                <p className="text-xs uppercase tracking-[0.12em] text-[#b57f50]">
                  Signature dish
                </p>
                <p className="mt-1 text-base font-semibold text-[#311f09]">
                  Crispy herb chicken bowl
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 sm:py-24">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="relative h-[380px] overflow-hidden rounded-4xl border border-[#edd9c6] shadow-[0_20px_60px_rgba(49,31,9,0.12)] sm:h-[460px]">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
                alt="Restaurant interior with plated dishes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="inline-flex rounded-full bg-[#fff0e0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#bc8a5f]">
                Since 2018
              </p>
              <h2 className="mt-5 text-4xl font-semibold text-[#311f09] sm:text-5xl">
                Welcome
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#5f4b3a]">
                We blend local ingredients with global culinary techniques to
                create unforgettable food moments. From intimate dinners to
                family celebrations, our team is here to make every visit feel
                like home.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="https://www.zomato.com/chandigarh/falcon-dine-lounge-sector-16-panchkula/book" target="_blank" rel="noopener noreferrer" className={primaryButtonClass}>
                  Book a table
                </a>
                <a href="#menu" className={secondaryButtonClass}>
                  Menu
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="bg-[#fef5eb] py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-semibold text-[#311f09] sm:text-5xl">
                Live Events at Falcon
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#5f4b3a]">
                Join us for unforgettable evenings of music, tastings, and
                curated dining experiences throughout the week.
              </p>
            </div>

            <div className="mt-12">
              <LiveEventsCarousel events={liveEvents} />
            </div>
          </div>
        </section>

        <section id="menu" className="bg-[#fef5eb] py-20 sm:py-24">
          <div id="gallery" className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-semibold text-[#311f09] sm:text-5xl">
                Our Special Dishes
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#5f4b3a]">
                From comforting classics to modern flavors, each dish is plated
                to delight your senses.
              </p>
            </div>

            <div className="mt-24 grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
              {dishes.map((dish) => (
                <article
                  key={dish.name}
                  className="relative rounded-3xl border border-[#edd9c6] bg-white p-6 pt-0 shadow-[0_20px_40px_rgba(49,31,9,0.06)]"
                >
                  <div className="relative mx-auto -mt-14 h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-lg">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 40vw, 15vw"
                    />
                  </div>
                  <div className="absolute right-5 top-4 rounded-full bg-[#311f09] px-3 py-1 text-sm font-semibold text-white">
                    {dish.price}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[#311f09]">
                    {dish.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#6d5641]">
                    {dish.description}
                  </p>
                </article>
              ))}
            </div>

            {/* View full menu banner — links to the complete Zomato menu */}
            <a
              href="http://zomato.com/chandigarh/falcon-dine-lounge-sector-16-panchkula/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-16 flex items-center justify-center gap-3 rounded-2xl border border-[#edd9c6] bg-white px-8 py-5 shadow-[0_10px_30px_rgba(49,31,9,0.06)] transition-all duration-300 hover:border-[#ea6d27] hover:shadow-[0_14px_40px_rgba(234,109,39,0.12)]"
            >
              <span className="text-lg font-semibold text-[#311f09] transition-colors group-hover:text-[#ea6d27]">
                View Full Menu
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ea6d27] text-white transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </section>

        


        

        
        <section id="testimonials" className="py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-semibold text-[#311f09] sm:text-5xl">
                Our Happy Customers
              </h2>
              <div
                className="mt-5 flex justify-center gap-2 text-xl text-[#ea6d27]"
                aria-label="Rated five stars by customers"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} aria-hidden />
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="rounded-3xl border border-[#edd9c6] bg-white p-8 shadow-[0_14px_40px_rgba(49,31,9,0.08)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#311f09]">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-[#8a6a4d]">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-base leading-7 text-[#5f4b3a]">
                    {testimonial.quote}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <ReviewLinksButton />
            </div>
          </div>
        </section>

        {/* <section id="reservation" className="bg-[#fef5eb] py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="overflow-hidden rounded-4xl border border-[#edd9c6] bg-[#fff4e8] p-8 text-center shadow-[0_16px_50px_rgba(49,31,9,0.1)] sm:p-12">
              <h2 className="mx-auto max-w-4xl text-3xl font-semibold leading-tight text-[#311f09] sm:text-5xl">
                Get our promo code by subscribing to our newsletter
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5f4b3a]">
                Receive first access to event tickets, seasonal menu launches,
                and members-only offers.
              </p>

              <form className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-[#e8d2bd] bg-white p-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-xl border border-[#f0dfcf] px-4 text-[#311f09] outline-none placeholder:text-[#9f856f] focus:border-[#ea6d27]"
                />
                <button type="submit" className={primaryButtonClass}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section> */}
      </main>

      <footer id="contact" className="border-t border-[#f0dfcf] py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <a href="#home" className="flex items-center gap-3">
              <Image
                src="/logo/logo.png"
                alt="Falcon Cafe & Lounge logo"
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="text-xl font-bold tracking-wide text-[#311f09]">
                Falcon Cafe & Lounge
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#5f4b3a]">
              We serve memorable food and warm hospitality. Learn more and
              reserve your seat for the next live event.
            </p>
            <h3 className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-[#8d5f34]">
              Opening hours
            </h3>
            <p className="mt-3 text-sm text-[#5f4b3a]">
              Monday - Sunday: 8:00 AM to 9:00 PM
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8d5f34]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#5f4b3a]">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-[#ea6d27]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8d5f34]">
              Dishes
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#5f4b3a]">
              {dishes.map((dish) => (
                <li key={dish.name}>{dish.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8d5f34]">
              Follow us
            </h3>
            <div className="mt-4 flex gap-3 text-[#8d5f34]">
              {socialLinks.map((social) => (
                <a
                  key={`footer-${social.name}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9b493] text-base transition hover:bg-[#fff2e4]"
                  aria-label={`${social.name} profile`}
                >
                  <FontAwesomeIcon icon={social.icon} aria-hidden />
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#5f4b3a]">
              hello@falconrestaurant.com
            </p>
            <p className="text-sm text-[#5f4b3a]">+0172 258 4965</p>
          </div>
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-[#f0dfcf] px-5 pt-6 text-sm text-[#7c624d] sm:px-8">
          <p>{currentYear} Falcon Restaurant. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <p>Terms of Service | Privacy Policy</p>
            <span className="text-[#d9b493]">·</span>
            <a
              href="/studio"
              className="transition hover:text-[#ea6d27]"
            >
              Manage Site
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
