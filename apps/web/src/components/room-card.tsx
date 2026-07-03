import Link from "next/link";
import type { Room } from "@/lib/content/types";

export function RoomCard({ room }: { room: Room }) {
  const href = room.slug.current ? `/rooms/${room.slug.current}` : "/stay";

  return (
    <article className="card">
      <p className="eyebrow">Room</p>
      <h3>{room.title}</h3>
      {room.shortDescription ? <p>{room.shortDescription}</p> : null}
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
    </article>
  );
}
