import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { EventCard } from "@/components/event-card";
import { ContentSeparator } from "@/components/content-separator";
import { PageSections } from "@/components/page-sections";
import { RoomCard } from "@/components/room-card";
import { getHomePage } from "@/lib/content/loaders";

export default async function HomePage() {
  const page = await getHomePage();

  return (
    <main className="home-shell">
      <ContentSeparator />
      <section className="home-hero">
        <div>
          <p className="eyebrow">Hotel + Restaurant</p>
          <h1>{page.title}</h1>
        </div>
        <div>
          <p>{page.intro}</p>
          <div className="cta-row">
            <Link className="button-link" href={page.primaryCta.href}>
              {page.primaryCta.label}
              <ArrowRight size={16} />
            </Link>
            <Link className="button-link" href={page.secondaryCta.href}>
              {page.secondaryCta.label}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <ContentSeparator />

      <section className="home-section">
        <div className="section-heading">
          <p className="eyebrow">Rooms</p>
        </div>
        <div className="home-grid">
          {page.featuredRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </section>

      <ContentSeparator />
      <section className="home-section">
        <div className="section-heading">
          <p className="eyebrow">Upcoming Events</p>
        </div>
        <div className="home-grid">
          {page.upcomingEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>

      {page.sections?.length ? (
        <>
          <ContentSeparator />
          <section className="home-section">
            <PageSections sections={page.sections} />
          </section>
        </>
      ) : null}
    </main>
  );
}
