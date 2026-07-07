import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { EventCard } from "@/components/event-card";
import { ContentSeparator } from "@/components/content-separator";
import { PageSections } from "@/components/page-sections";
import { RoomCard } from "@/components/room-card";
import { SanityImageView } from "@/components/sanity-image";
import { getHomePage } from "@/lib/content/loaders";
import type { SanityImage } from "@/lib/content/types";

export default async function HomePage() {
  const page = await getHomePage();
  const heroSection = page.sections?.find((section) => section._type === "heroBlock");
  const gallerySection = page.sections?.find((section) => section._type === "galleryBlock");
  const remainingSections = page.sections?.filter(
    (section) => section !== heroSection && section !== gallerySection,
  );
  const imageRail: SanityImage[] = gallerySection?.images?.length
    ? gallerySection.images
    : page.featuredRooms
        .map((room) => room.heroImage)
        .filter((image): image is SanityImage => Boolean(image))
        .slice(0, 6);
  const heroPrimaryCta = heroSection?.primaryCta || page.primaryCta;
  const heroSecondaryCta = heroSection?.secondaryCta || page.secondaryCta;

  return (
    <main className="home-shell">
      <section className="home-hero-frame">
        {heroSection?.media ? (
          <SanityImageView
            image={heroSection.media}
            alt={heroSection.title || page.title}
            width={1800}
            height={1200}
            sizes="100vw"
            className="home-hero-image"
          />
        ) : null}
        <div className="home-hero-caption">
          <span className="home-hero-name">{page.title}</span>
          <span className="home-hero-meta">
            {heroSection?.body || "Opening this season, where the city ends"}
          </span>
        </div>
      </section>

      <section className="home-intro">
        <div className="home-intro-copy">
          <p className="eyebrow">Hotel + Tavern</p>
          <h1>{heroSection?.title || page.title}</h1>
          <p className="home-intro-lede">{page.intro}</p>
          <div className="cta-row">
            <Link className="button-link" href={heroPrimaryCta.href}>
              {heroPrimaryCta.label}
              <ArrowRight size={16} />
            </Link>
            <Link className="button-link button-link-secondary" href={heroSecondaryCta.href}>
              {heroSecondaryCta.label}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {imageRail.length ? (
        <section className="home-rail-section" aria-label={gallerySection?.title || "Property views"}>
          <div className="home-rail-head">
            <span className="eyebrow">The Rooms</span>
            <span className="eyebrow">{gallerySection?.title || "A quiet sequence of views"}</span>
          </div>
          <div className="home-image-rail">
            {imageRail.map((image, index) => (
              <div
                key={`${image.asset?._ref || "image"}-${index}`}
                className={`home-image-rail__item ${index % 2 === 1 ? "is-portrait" : "is-landscape"}`}
              >
                <SanityImageView
                  image={image}
                  alt={image.alt || `${page.title} gallery image ${index + 1}`}
                  width={1200}
                  height={900}
                  sizes="(max-width: 900px) 80vw, 40vw"
                  className="home-image-rail__image"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <ContentSeparator />
      <section className="home-section home-section--feature">
        <div className="section-heading section-heading-split">
          <p className="eyebrow">Stay</p>
          <p className="section-note">One property, several moods.</p>
        </div>
        <div className="home-grid">
          {page.featuredRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </section>

      <ContentSeparator />
      <section className="home-section home-section--feature">
        <div className="section-heading section-heading-split">
          <p className="eyebrow">Upcoming Events</p>
          <p className="section-note">Programming across the tavern and beyond.</p>
        </div>
        <div className="home-grid">
          {page.upcomingEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>

      {remainingSections?.length ? (
        <>
          <ContentSeparator />
          <section className="home-section home-section--stacked">
            <PageSections sections={remainingSections} />
          </section>
        </>
      ) : null}
    </main>
  );
}
