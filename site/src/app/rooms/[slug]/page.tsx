import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import RichTextSection from "@/components/RichTextSection";
import { getRoom } from "@/lib/sanity/content";
import { urlFor } from "@/lib/sanity/image";
import { getVisualEditingEnabled } from "@/lib/sanity/preview";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RoomPage({ params }: PageProps) {
  const { slug } = await params;
  const draftModeState = await draftMode();
  const visualEditingEnabled =
    getVisualEditingEnabled() && draftModeState.isEnabled;
  const room = slug ? await getRoom(slug, { visualEditingEnabled }) : null;

  if (!room) {
    redirect("/");
  }

  return (
    <>
      <section className="detail-hero">
        <div>
          <p className="section-eyebrow">Room</p>
          <h1>{room.title}</h1>
          {room.description ? <p className="lede">{room.description}</p> : null}
          {room.amenities?.length ? (
            <ul className="detail-tags">
              {room.amenities.map((amenity) => (
                <li key={amenity._id}>{amenity.title}</li>
              ))}
            </ul>
          ) : null}
        </div>
        {room.heroImage ? (
          <img
            alt={room.heroImage.alt || room.title}
            className="detail-hero__image"
            src={urlFor(room.heroImage).width(1400).height(1000).url()}
          />
        ) : null}
      </section>

      {room.gallery?.length ? (
        <section className="gallery-grid">
          {room.gallery.map((image, index) => (
            <img
              key={`${room._id}-gallery-${index}`}
              alt={image.alt || room.title}
              className="gallery-grid__image"
              src={urlFor(image).width(1200).height(900).url()}
            />
          ))}
        </section>
      ) : null}

      <RichTextSection
        title="Plan your stay"
        value={[
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: room.mewsRoomCategoryId
                  ? `This room is connected to Mews category ${room.mewsRoomCategoryId}.`
                  : "Connect this room to a Mews category to align content with booking inventory.",
              },
            ],
          },
        ]}
      />
    </>
  );
}
