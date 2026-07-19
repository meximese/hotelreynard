"use client";

import { useEffect, useRef, useState } from "react";
import { SanityImageView } from "@/components/sanity-image";
import { BuiText } from "@/components/ui/typography";
import type { SanityImage } from "@/lib/content/types";

const SCROLL_SPEED_MULTIPLIER = 1.8;
const START_DELAY_FRACTION = 0.08;
const END_DELAY_FRACTION = 0.08;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(value: number) {
  const t = clamp(value);

  return t * t * (3 - 2 * t);
}

export function StickyScrollGallery({
  title,
  images,
  showGalleryProgress = true,
}: {
  showGalleryProgress?: boolean;
  title?: string;
  images: SanityImage[];
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
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
      const rawProgress = clamp(travel > 0 ? -rect.top / travel : 0);
      const activeRange = 1 - START_DELAY_FRACTION - END_DELAY_FRACTION;
      const nextProgress = smoothstep(
        activeRange > 0
          ? (rawProgress - START_DELAY_FRACTION) / activeRange
          : rawProgress,
      );

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
    <div
      ref={sectionRef}
      className={`sticky-gallery ${isStickyActive ? "is-sticky-active" : ""}`.trim()}
      aria-label={title || "Property views"}
      data-sticky-active={isStickyActive ? "true" : "false"}
      style={{ "--sticky-gallery-track-offset": "0" } as React.CSSProperties}
    >
      <div ref={stickyRef} className="sticky-gallery__sticky">
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
            <BuiText as="span" variant="eyebrow" className="eyebrow">
              {String(currentIndex).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </BuiText>
            <div className="sticky-gallery__bar">
              <div
                className="sticky-gallery__bar-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <BuiText as="span" variant="eyebrow" className="eyebrow">
              Scroll
            </BuiText>
          </div>
        ) : null}
      </div>
    </div>
  );
}
