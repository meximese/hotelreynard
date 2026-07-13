"use client";

import { useEffect, useRef, useState } from "react";
import { SanityImageView } from "@/components/sanity-image";
import type { SanityImage } from "@/lib/content/types";

const SCROLL_SPEED_MULTIPLIER = 1.8;
const START_DELAY_FRACTION = 0.12;

export function StickyScrollGallery({
  eyebrow,
  title,
  images,
  showGalleryHeader = false,
  showGalleryProgress = true,
}: {
  showGalleryHeader?: boolean;
  showGalleryProgress?: boolean;
  eyebrow?: string;
  title?: string;
  images: SanityImage[];
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isStickyActive, setIsStickyActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;

    if (!section || !sticky || !track || images.length === 0) {
      return;
    }

    let scrollDistance = 0;
    let ticking = false;
    let listening = false;

    function measure() {
      const currentTrack = trackRef.current;
      const currentSticky = stickyRef.current;
      const currentSection = sectionRef.current;

      if (!currentTrack || !currentSticky || !currentSection) {
        return;
      }

      const trackWidth = currentTrack.scrollWidth;
      const viewportWidth = currentSticky.clientWidth;
      scrollDistance = Math.max(trackWidth - viewportWidth, 0);
      currentSection.style.height = `${window.innerHeight + scrollDistance * SCROLL_SPEED_MULTIPLIER}px`;
    }

    function update() {
      const currentTrack = trackRef.current;
      const currentSticky = stickyRef.current;
      const currentSection = sectionRef.current;

      if (!currentTrack || !currentSticky || !currentSection) {
        ticking = false;
        return;
      }

      const rect = currentSection.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const stickyTop = Number.parseFloat(getComputedStyle(currentSticky).top) || 0;
      const stickyActive =
        scrollDistance > 0 &&
        rect.top <= stickyTop &&
        rect.bottom >= window.innerHeight;
      let rawProgress = travel > 0 ? -rect.top / travel : 0;
      rawProgress = Math.min(Math.max(rawProgress, 0), 1);

      let nextProgress = 0;
      if (rawProgress > START_DELAY_FRACTION) {
        nextProgress =
          (rawProgress - START_DELAY_FRACTION) / (1 - START_DELAY_FRACTION);
      }
      nextProgress = Math.min(Math.max(nextProgress, 0), 1);

      currentTrack.style.transform = `translateX(${-nextProgress * scrollDistance}px)`;
      setProgress(nextProgress);
      setCurrentIndex(
        Math.min(
          images.length,
          Math.max(1, Math.round(nextProgress * (images.length - 1)) + 1),
        ),
      );
      setIsStickyActive(stickyActive);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    function startListening() {
      if (!listening) {
        window.addEventListener("scroll", onScroll, { passive: true });
        listening = true;
      }
    }

    function stopListening() {
      if (listening) {
        window.removeEventListener("scroll", onScroll);
        listening = false;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startListening();
            update();
          } else {
            stopListening();
          }
        });
      },
      { threshold: 0 },
    );

    const handleResize = () => {
      measure();
      update();
    };

    measure();
    update();
    observer.observe(section);
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      stopListening();
      window.removeEventListener("resize", handleResize);
    };
  }, [images.length]);

  return (
    <section
      ref={sectionRef}
      className={`sticky-gallery ${isStickyActive ? "is-sticky-active" : ""}`.trim()}
      aria-label={title || "Property views"}
      data-sticky-active={isStickyActive ? "true" : "false"}
      style={
        {
          "--sticky-gallery-item-height": showGalleryHeader
            ? "62vh"
            : "calc(80vh - var(--sticky-header-offset, 5rem))",
          "--sticky-gallery-track-offset": showGalleryHeader
            ? "0"
            : "calc(-1 * var(--sticky-header-offset, 5rem) / 2)",
        } as React.CSSProperties
      }
    >
      <div ref={stickyRef} className="sticky-gallery__sticky">
        {showGalleryHeader && (
          <div className="sticky-gallery__head">
            <span className="eyebrow">{eyebrow || "Gallery"}</span>
            <span className="eyebrow">{title || "Property views"}</span>
          </div>
        )}

        <div ref={trackRef} className="sticky-gallery__track">
          {images.map((image, index) => (
            <div
              key={`${image.asset?._ref || "image"}-${index}`}
              className={`sticky-gallery__item ${index % 2 === 1 ? "is-portrait" : "is-landscape"}`}
            >
              <SanityImageView
                image={image}
                alt={image.alt || `${title || "Gallery"} image ${index + 1}`}
                width={1400}
                height={1100}
                sizes="(max-width: 900px) 80vw, 40vw"
                className="sticky-gallery__image"
              />
            </div>
          ))}
        </div>

        {showGalleryProgress ? (
          <div
            className="sticky-gallery__progress"
            aria-hidden={isStickyActive ? undefined : true}
          >
            <span className="eyebrow">
              {String(currentIndex).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
            <div className="sticky-gallery__bar">
              <div
                className="sticky-gallery__bar-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="eyebrow">Scroll</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
