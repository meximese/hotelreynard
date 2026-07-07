"use client";

import Link from "next/link";
import type { Room } from "@/lib/content/types";
import { ContentSeparator } from "@/components/content-separator";
import { SanityImageView } from "@/components/sanity-image";

export function RoomCard({ room }: { room: Room }) {
  const href = room.slug.current ? `/rooms/${room.slug.current}` : "/stay";

  return (
    <article className="card">
      <SanityImageView
        image={room.heroImage}
        alt={room.title}
        width={800}
        height={560}
        sizes="(max-width: 900px) 100vw, 33vw"
        className="card-image"
      />
      <div className="card-stack">
        <div>
          <p className="eyebrow">Room</p>
          <h3>{room.title}</h3>
          {room.shortDescription ? <p>{room.shortDescription}</p> : null}
        </div>
        <ContentSeparator />
        <div className="card-meta">
          {room.highlights?.length ? (
            <ul className="tag-list">
              {room.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}
          <Link href={href} className="text-link">
            View room details
          </Link>
        </div>
      </div>
    </article>
  );
}
