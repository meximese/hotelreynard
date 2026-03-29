import { jsx as _jsx } from "react/jsx-runtime";
import { EmailLayout } from "../EmailLayout.js";
import { PortableTextEmail } from "../PortableTextEmail.js";
import { getDefaultEmailTemplate } from "../render.js";
export default function ContactAutoReplyPreview() {
    const template = getDefaultEmailTemplate("contact-auto-reply");
    return (_jsx(EmailLayout, { intro: template.intro, outro: template.outro, previewText: template.previewText, title: "Thanks for reaching out, Avery.", children: _jsx(PortableTextEmail, { value: [
                {
                    _type: "block",
                    children: [{ _type: "span", text: "We have your inquiry about booking." }],
                    markDefs: [],
                    style: "normal",
                },
                ...(template.body || []).slice(1),
            ] }) }));
}
