import NewsletterForm from "@/components/NewsletterForm";
import ReynardWordmarkMorph, {
  ReynardWordmarkMorphDemo,
} from "@/components/ReynardWordmarkMorph";
import ReynardWordmarkMorphScrollScene from "@/components/ReynardWordmarkMorphScrollScene";

const flowers = [
  "/site-svg/orange%20flower%20a.svg",
  "/site-svg/white%20flower%20b.svg",
  "/site-svg/red%20flower%20c.svg",
  "/site-svg/green%20leaf%20a.svg",
];

export default function Home() {
  return (
    <section className="poster-page" id="top">
      <section className="poster-section poster-section--rooms" id="rooms">
        <div className="poster-copy">
          <h3>Great food and drinks after a long day out</h3>
          <p>
            Hotel Reynard sits at the gateway to the Columbia River Gorge, in
            Troutdale, Oregon. Eight rooms sit above the tavern, each built for
            dropping bags, changing pace, and coming back late after a good
            dinner downstairs.
          </p>
          <h3>A base for your next adventure.</h3>
          <p>
            The tavern is the anchor: aperitifs, dinner, a little ceremony, and
            enough warmth to make the whole building feel switched on. Small
            parties, private dinners, and the kind of gatherings that stretch a
            meal into the rest of the evening.
          </p>
        </div>
      </section>

      <div className="poster-bouquet poster-bouquet--mid" aria-hidden="true">
        {flowers.map((src, index) => (
          <img key={src} src={src} alt="" className={`flower-${index + 1}`} />
        ))}
      </div>
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
