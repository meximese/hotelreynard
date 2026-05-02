import HomeScrollScene from "@/components/HomeScrollScene";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <>
      <HomeScrollScene />

      <section className="home-newsletter">
        <div className="home-newsletter__panel">
          <p className="home-newsletter__eyebrow">Stay In The Loop</p>
          <h2>Keep up with rooms, tavern nights, and openings at Reynard.</h2>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
