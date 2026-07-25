import {PortableText} from "@portabletext/react";
import {ContentSeparator} from "@/components/content-separator";
import {PageSections} from "@/components/page-sections";
import {SanityImageView} from "@/components/sanity-image";
import {SplashLayoutScaffold} from "@/components/splash/SplashLayoutScaffold";
import {BuiText} from "@/components/ui/typography";
import {getHomePage, getUpcomingEvents} from "@/lib/content/loaders";
import {createSanityDataAttribute} from "@/lib/sanity/preview";

export default async function HomePage() {
  const page = await getHomePage();
  const eventFeedLimit = Math.max(
    0,
    ...(page.sections
      ?.filter((section) => section._type === "eventFeedBlock")
      .map((section) => section.limit || 3) || [0]),
  );
  const introAttr = createSanityDataAttribute({
    id: page._id,
    type: page._type,
    path: ["pageIntro"],
  });
  const heroAttr = createSanityDataAttribute({
    id: page._id,
    type: page._type,
    path: ["hero"],
  });
  const upcomingEvents = eventFeedLimit > 0 ? await getUpcomingEvents(eventFeedLimit) : [];

  return (
    <SplashLayoutScaffold>
      <main className="home-shell">
        {page.hero?.media && (
          <section className="page-top-hero" data-sanity={heroAttr}>
            <SanityImageView
              image={page.hero.media}
              mobileImage={page.hero.mobileMedia}
              alt={page.hero.title || page.title}
              width={1800}
              height={1200}
              sizes="100vw"
              className="home-hero-image"
            />
            {page.hero.caption && (
              <div className="page-top-hero__caption">
                <BuiText as="span" className="home-hero-name">
                  {page.hero.caption}
                </BuiText>
              </div>
            )}
            {page.hero.enableContent && (
              <div className="page-top-hero__caption">
                <BuiText as="span" className="home-hero-name">
                  {page.hero.title}
                </BuiText>
                {page.hero.body ? (
                  <BuiText as="span" className="home-hero-meta">
                    {page.hero.body}
                  </BuiText>
                ) : null}
              </div>
            )}
          </section>
        )}
        {page.pageIntro?.length ? (
          <section className="home-intro">
            <div className="home-intro-copy" data-sanity={introAttr}>
              <div className="home-intro-lede">
                <PortableText value={page.pageIntro} />
              </div>
            </div>
          </section>
        ) : null}
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
    </SplashLayoutScaffold>
  );
}
