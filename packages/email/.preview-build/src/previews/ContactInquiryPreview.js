import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Hr, Text } from "@react-email/components";
import { EmailLayout } from "../EmailLayout.js";
import { PortableTextEmail } from "../PortableTextEmail.js";
import { getDefaultEmailTemplate } from "../render.js";
export default function ContactInquiryPreview() {
    const template = getDefaultEmailTemplate("contact-internal-inquiry");
    return (_jsxs(EmailLayout, { intro: template.intro, outro: template.outro, previewText: "New Booking inquiry from Avery Stone", title: template.title, children: [_jsx(PortableTextEmail, { value: template.body }), _jsx(Hr, {}), _jsxs(Text, { children: [_jsx("strong", { children: "Name:" }), " Avery Stone"] }), _jsxs(Text, { children: [_jsx("strong", { children: "Email:" }), " avery@example.com"] }), _jsxs(Text, { children: [_jsx("strong", { children: "Phone:" }), " +1 (503) 555-0123"] }), _jsxs(Text, { children: [_jsx("strong", { children: "Reason:" }), " Booking"] }), _jsx(Hr, {}), _jsx(Text, { children: "We are looking for two rooms for a September weekend and would love to know when reservations open." })] }));
}
