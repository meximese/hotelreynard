import NewsletterForm from "@/components/NewsletterForm";
import ReynardWordmarkMorph, {
  ReynardWordmarkMorphDemo,
} from "@/components/ReynardWordmarkMorph";

const flowers = [
  "/site-svg/orange%20flower%20a.svg",
  "/site-svg/white%20flower%20b.svg",
  "/site-svg/red%20flower%20c.svg",
  "/site-svg/green%20leaf%20a.svg",
];

export default function Home() {
  return (
    <section className="poster-page" id="top">
      <section className="poster-mark">
        <ReynardWordmarkMorphDemo />
      </section>

      <section className="poster-footer">
        <p className="poster-date poster-date--footer">
          Hotel Reynard opens Summer 2026
          <br />
          302 Historic Columbia River Highway
        </p>

        <div className="poster-newsletter">
          <NewsletterForm />
        </div>
      </section>
      <section className="morph-scroll-track">
        <div className="morph-scroll-sticky">
          <ReynardWordmarkMorph
            className="poster-hero__morph"
            mode="scroll"
            direction="reverse"
          />
        </div>
      </section>
    </section>
  );
}
