import NewsletterForm from "@/components/NewsletterForm";

const flowers = [
  "/site-svg/orange%20flower%20a.svg",
  "/site-svg/white%20flower%20b.svg",
  "/site-svg/red%20flower%20c.svg",
  "/site-svg/green%20leaf%20a.svg",
];

export default function Home() {
  return (
    <section className="poster-page" id="top">
      <section className="poster-hero">
        <div className="poster-hero__navline" aria-hidden="true">
          <span>Rooms</span>
          <span>Stays</span>
        </div>

        <div className="poster-hero__stack">
          <img
            src="/reynard-short.png"
            alt="Hotel Reynard"
            className="poster-hero__reynard"
          />
        </div>

        <div
          className="poster-hero__navline poster-hero__navline--bottom"
          aria-hidden="true"
        >
          <span>Menu</span>
          <span>Events</span>
        </div>

        <p className="poster-date">Hotel Reynard opens July 1st, 2026</p>

        <div className="poster-bouquet poster-bouquet--hero" aria-hidden="true">
          <img
            src="/site-svg/bouquet.svg"
            alt="a bouquet of flowers"
            className="flowers-bouquet"
          />
        </div>

        <div
          className="poster-placeholder poster-placeholder--hero"
          aria-hidden="true"
        ></div>

        <p className="poster-date poster-date--lower">
          Hotel Reynard opens July 1st, 2026
        </p>
      </section>

      <section className="poster-section poster-section--rooms" id="rooms">
        <div className="poster-copy">
          <h2>Rooms</h2>
          <p>
            Eight rooms sit above the tavern, each built for dropping bags,
            changing pace, and coming back late after a good dinner downstairs.
          </p>
        </div>
      </section>

      <section className="poster-section poster-section--stays" id="stays">
        <div className="poster-bouquet poster-bouquet--mid" aria-hidden="true">
          {flowers.map((src, index) => (
            <img
              key={`${src}-mid`}
              src={src}
              alt=""
              className={`flower-${index + 1}`}
            />
          ))}
        </div>

        <div className="poster-copy">
          <h2>Stays</h2>
          <p>
            A stay at Reynard should feel easy and a little theatrical. Come in,
            go out, return after midnight, and wake up above the room where the
            night happened.
          </p>
        </div>
      </section>

      <section className="poster-section poster-section--menu" id="menu">
        <div
          className="poster-placeholder poster-placeholder--secondary"
          aria-hidden="true"
        ></div>

        <div className="poster-copy">
          <h2>Menu</h2>
          <p>
            The tavern is the anchor: aperitifs, dinner, a little ceremony, and
            enough warmth to make the whole building feel switched on.
          </p>
        </div>
      </section>

      <section className="poster-section poster-section--events" id="events">
        <div className="poster-copy">
          <h2>Events</h2>
          <p>
            Small parties, private dinners, and the kind of gatherings that
            stretch a meal into the rest of the evening.
          </p>
        </div>
      </section>

      <section className="poster-mark">
        <div className="poster-hero__stack">
          <img
            src="/reynard-tall.png"
            alt="Hotel Reynard"
            className="poster-hero__reynard"
          />
        </div>
      </section>

      <section className="poster-footer">
        <p className="poster-date poster-date--footer">
          Hotel Reynard opens July 1st, 2026
          <br />
          302 Historic Columbia River Highway
        </p>

        <div className="poster-newsletter">
          <NewsletterForm />
        </div>
      </section>
    </section>
  );
}
