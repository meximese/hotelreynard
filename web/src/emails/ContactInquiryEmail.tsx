import React from "react";
import { Hr, Text } from "@react-email/components";

import EmailLayout from "./components/EmailLayout";

type ContactInquiryEmailProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  contactReason: string;
  message: string;
};

export default function ContactInquiryEmail({
  firstName,
  lastName,
  email,
  phone,
  contactReason,
  message,
}: ContactInquiryEmailProps) {
  return (
    <EmailLayout
      intro="A new website inquiry was submitted from hotelreynard.com."
      previewText={`New ${contactReason.toLowerCase()} inquiry from ${firstName} ${lastName}`}
      title="New inquiry received"
    >
      <Text>
        <strong>Name:</strong> {firstName} {lastName}
      </Text>
      <Text>
        <strong>Email:</strong> {email}
      </Text>
      {phone ? (
        <Text>
          <strong>Phone:</strong> {phone}
        </Text>
      ) : null}
      <Text>
        <strong>Reason:</strong> {contactReason}
      </Text>
      <Hr />
      <Text>{message}</Text>
    </EmailLayout>
  );
}
