import { CustomGallerySection } from "@/components/custom-gallery-section";
import { GridGallerySection } from "@/components/grid-gallery-section";
import { StickyScrollGallery } from "@/components/sticky-scroll-gallery";
import { VerticalGallerySection } from "@/components/vertical-gallery-section";
import type { PageSection } from "@/lib/content/types";

export function GalleryBlockSection({
  section,
}: {
  section: PageSection;
}) {
  if (!section.images?.length) {
    return null;
  }

  if (section.displayMode === "stickyScroll") {
    return (
      <StickyScrollGallery
        title={section.title}
        images={section.images}
        showGalleryProgress={section.showGalleryProgress}
      />
    );
  }

  if (section.displayMode === "vertical") {
    return <VerticalGallerySection title={section.title} images={section.images} />;
  }

  if (section.displayMode === "custom") {
    return <CustomGallerySection title={section.title} images={section.images} />;
  }

  return <GridGallerySection title={section.title} images={section.images} />;
}
