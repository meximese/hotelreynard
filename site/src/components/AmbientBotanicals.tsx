const ambientBotanicals = [
  { id: "ambient-1", src: "/site-svg/white%20flower%20a.svg", alt: "White flower", size: 88, left: 3, duration: 20, delay: -12, drift: 38, rotate: -18, opacity: 0.52, scale: 0.86 },
  { id: "ambient-2", src: "/site-svg/green%20leaf%20a.svg", alt: "Green leaf", size: 108, left: 10, duration: 23, delay: -4, drift: 26, rotate: 22, opacity: 0.38, scale: 0.92 },
  { id: "ambient-3", src: "/site-svg/orange%20flower%20b.svg", alt: "Orange flower", size: 94, left: 17, duration: 18, delay: -15, drift: 34, rotate: -14, opacity: 0.48, scale: 0.82 },
  { id: "ambient-4", src: "/site-svg/orange%20leaf%20a.svg", alt: "Orange leaf", size: 72, left: 24, duration: 16, delay: -6, drift: 42, rotate: 28, opacity: 0.44, scale: 0.88 },
  { id: "ambient-5", src: "/site-svg/red%20flower%20a.svg", alt: "Red flower", size: 82, left: 31, duration: 21, delay: -18, drift: 24, rotate: -24, opacity: 0.42, scale: 0.8 },
  { id: "ambient-6", src: "/site-svg/green%20leaf%20c.svg", alt: "Green leaf", size: 102, left: 39, duration: 24, delay: -9, drift: 30, rotate: 18, opacity: 0.34, scale: 0.9 },
  { id: "ambient-7", src: "/site-svg/orange%20flower%20d.svg", alt: "Orange flower", size: 90, left: 47, duration: 19, delay: -2, drift: 36, rotate: -16, opacity: 0.45, scale: 0.84 },
  { id: "ambient-8", src: "/site-svg/red%20leaf%20a.svg", alt: "Red leaf", size: 92, left: 55, duration: 22, delay: -11, drift: 28, rotate: 20, opacity: 0.31, scale: 0.86 },
  { id: "ambient-9", src: "/site-svg/white%20flower%20c.svg", alt: "White flower", size: 86, left: 63, duration: 17, delay: -14, drift: 40, rotate: -22, opacity: 0.49, scale: 0.78 },
  { id: "ambient-10", src: "/site-svg/orange%20flower%20a.svg", alt: "Orange flower", size: 80, left: 71, duration: 20, delay: -8, drift: 26, rotate: 24, opacity: 0.46, scale: 0.8 },
  { id: "ambient-11", src: "/site-svg/green%20leaf%20b.svg", alt: "Green leaf", size: 96, left: 78, duration: 25, delay: -19, drift: 32, rotate: -18, opacity: 0.33, scale: 0.88 },
  { id: "ambient-12", src: "/site-svg/red%20flower%20c.svg", alt: "Red flower", size: 84, left: 85, duration: 18, delay: -5, drift: 38, rotate: 16, opacity: 0.41, scale: 0.8 },
  { id: "ambient-13", src: "/site-svg/orange%20flower%20c.svg", alt: "Orange flower", size: 92, left: 92, duration: 21, delay: -16, drift: 34, rotate: -20, opacity: 0.44, scale: 0.82 },
  { id: "ambient-14", src: "/site-svg/white%20flower%20b.svg", alt: "White flower", size: 86, left: 97, duration: 19, delay: -7, drift: 27, rotate: 18, opacity: 0.47, scale: 0.79 },
];

export default function AmbientBotanicals() {
  return (
    <div className="ambient-botanicals" aria-hidden="true">
      {ambientBotanicals.map((item) => (
        <figure
          key={item.id}
          className="ambient-botanicals__item"
          style={
            {
              "--ambient-left": `${item.left}vw`,
              "--ambient-size": `${item.size}px`,
              "--ambient-duration": `${item.duration}s`,
              "--ambient-delay": `${item.delay}s`,
              "--ambient-drift": `${item.drift}px`,
              "--ambient-rotate": `${item.rotate}deg`,
              "--ambient-opacity": item.opacity,
              "--ambient-scale": item.scale,
            } as React.CSSProperties
          }
        >
          <img src={item.src} alt={item.alt} loading="eager" />
        </figure>
      ))}
    </div>
  );
}
