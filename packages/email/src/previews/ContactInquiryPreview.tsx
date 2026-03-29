import React from "react";
import { Hr, Text } from "@react-email/components";

import { EmailLayout } from "../EmailLayout.js";
import { PortableTextEmail } from "../PortableTextEmail.js";
import { getDefaultEmailTemplate } from "../render.js";

export default function ContactInquiryPreview() {
  const template = getDefaultEmailTemplate("contact-internal-inquiry");

  return (
    <EmailLayout
      intro={template.intro}
      outro={template.outro}
      previewText="New Booking inquiry from Avery Stone"
      title={template.title}
    >
      <PortableTextEmail value={template.body} />
      <Hr />
      <Text>
        <strong>Name:</strong> Avery Stone
      </Text>
      <Text>
        <strong>Email:</strong> avery@example.com
      </Text>
      <Text>
        <strong>Phone:</strong> +1 (503) 555-0123
      </Text>
      <Text>
        <strong>Reason:</strong> Booking
      </Text>
      <Hr />
      <Text>
        We are looking for two rooms for a September weekend and would love to
        know when reservations open.
      </Text>
    </EmailLayout>
  );
}
