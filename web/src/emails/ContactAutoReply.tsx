import React from "react";
import { Text } from "@react-email/components";

import EmailLayout from "./components/EmailLayout";

type ContactAutoReplyProps = {
  firstName: string;
  contactReason: string;
};

export default function ContactAutoReply({
  firstName,
  contactReason,
}: ContactAutoReplyProps) {
  return (
    <EmailLayout
      intro="We received your note and will follow up as soon as we can."
      outro="If anything changes, just reply to this email and your message will stay threaded."
      previewText="We received your Hotel Reynard inquiry"
      title={`Thanks for reaching out, ${firstName}.`}
    >
      <Text>We have your inquiry about {contactReason.toLowerCase()}.</Text>
      <Text>
        Hotel Reynard is still taking shape, but the team is reviewing incoming
        requests and keeping in touch as plans evolve.
      </Text>
    </EmailLayout>
  );
}
