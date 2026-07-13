import { ContentSeparator } from "@/components/content-separator";
import { PageSections } from "@/components/page-sections";
import { SanityImageView } from "@/components/sanity-image";
import { LogoSolidMark } from "@/components/svg/logo-solid-mark";
import { getHomePage, getUpcomingEvents } from "@/lib/content/loaders";
import { createSanityDataAttribute } from "@/lib/sanity/preview";

export default async function HomePage() {
  const page = await getHomePage();
  const eventFeedLimit = Math.max(
    0,
    ...(page.sections
      ?.filter((section) => section._type === "eventFeedBlock")
      .map((section) => section.limit || 3) || [0]),
  );
  const titleAttr = createSanityDataAttribute({
    id: page._id,
    type: page._type,
    path: ["title"],
  });
  const introAttr = createSanityDataAttribute({
    id: page._id,
    type: page._type,
    path: ["intro"],
  });
  const heroAttr = createSanityDataAttribute({
    id: page._id,
    type: page._type,
    path: ["hero"],
  });
  const upcomingEvents =
    eventFeedLimit > 0 ? await getUpcomingEvents(eventFeedLimit) : [];

  return (
    <main className="home-shell">
      {page.hero?.media ||
      page.hero?.eyebrow ||
      page.hero?.title ||
      page.hero?.body ? (
        <section className="page-top-hero" data-sanity={heroAttr}>
          {page.hero.media ? (
            <SanityImageView
              image={page.hero.media}
              mobileImage={page.hero.mobileMedia}
              alt={page.hero.title || page.title}
              width={1800}
              height={1200}
              sizes="100vw"
              className="home-hero-image"
            />
          ) : null}
          {page.hero.eyebrow || page.hero.title || page.hero.body ? (
            <div className="page-top-hero__caption">
              <span className="home-hero-name">
                {page.hero.title || page.hero.eyebrow}
              </span>
              {page.hero.body ? (
                <span className="home-hero-meta">{page.hero.body}</span>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}
      <section className="home-intro">
        <div className="home-intro-copy">
          {/* <h1 data-sanity={titleAttr}>{page.title}</h1> */}
          <p className="home-intro" data-sanity={introAttr}>
            {page.intro}
          </p>
        </div>
      </section>
      {page.sections?.length ? (
        <>
          <ContentSeparator />
          <section className="home-section home-section--stacked">
            <PageSections
              sections={page.sections}
              documentId={page._id}
              documentType={page._type}
              upcomingEvents={upcomingEvents}
            />
          </section>
        </>
      ) : null}
    </main>
  );
}
