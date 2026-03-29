import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import {
  renderContactAutoReplyEmail,
  renderContactInquiryEmail,
} from "../src/render.js";

const outDir = resolve(process.cwd(), ".preview");

const sampleTokens = {
  firstName: "Avery",
  lastName: "Stone",
  email: "avery@example.com",
  phone: "+1 (503) 555-0123",
  contactReason: "Booking",
  message:
    "We are looking for two rooms for a September weekend and would love to know when reservations open.",
  hotelName: "Hotel Reynard",
};

await mkdir(outDir, { recursive: true });

const [autoReply, inquiry] = await Promise.all([
  renderContactAutoReplyEmail(null, sampleTokens),
  renderContactInquiryEmail(null, sampleTokens),
]);

await Promise.all([
  writeFile(resolve(outDir, "contact-auto-reply.html"), autoReply.html, "utf8"),
  writeFile(resolve(outDir, "contact-internal-inquiry.html"), inquiry.html, "utf8"),
]);

console.log("Wrote .preview/contact-auto-reply.html");
console.log("Wrote .preview/contact-internal-inquiry.html");
