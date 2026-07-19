"use client";

import type { Room } from "@/lib/content/types";
import { ContentSeparator } from "@/components/content-separator";
import { SanityImageView } from "@/components/sanity-image";
import { BuiLink } from "@/components/ui/actions";
import { BuiHeadline, BuiText } from "@/components/ui/typography";
import { createSanityDataAttribute } from "@/lib/sanity/preview";

export function RoomCard({ room }: { room: Room }) {
  const href = room.slug.current ? `/rooms/${room.slug.current}` : "/stay";
  const cardAttr =
    room._id && room._type
      ? createSanityDataAttribute({ id: room._id, type: room._type, path: ["title"] })
      : undefined;

  return (
    <article className="card" data-sanity={cardAttr}>
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
          <BuiText variant="eyebrow" className="eyebrow">
            Room
          </BuiText>
          <BuiHeadline as="h3">{room.title}</BuiHeadline>
          {room.shortDescription ? <BuiText>{room.shortDescription}</BuiText> : null}
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
          <BuiLink href={href} className="text-link">
            View room details
          </BuiLink>
        </div>
      </div>
    </article>
  );
}
