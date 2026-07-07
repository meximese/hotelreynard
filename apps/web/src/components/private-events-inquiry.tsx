"use client";

import { Field } from "@base-ui/react/field";

export function PrivateEventsInquiry() {
  return (
    <section className="inquiry-panel" aria-labelledby="private-events-inquiry">
      <div>
        <p className="eyebrow">Inquiry Preview</p>
        <h2 id="private-events-inquiry">Tell us about your big day.</h2>
        <p className="lede">
          This is a front-end scaffold for the Sanity-managed inquiry content and eventual lead
          capture workflow.
        </p>
      </div>

      <form className="inquiry-grid">
        <Field.Root name="firstName" className="field-root">
          <Field.Label className="field-label">First Name</Field.Label>
          <Field.Control className="field-input" placeholder="First Name" />
        </Field.Root>

        <Field.Root name="lastName" className="field-root">
          <Field.Label className="field-label">Last Name</Field.Label>
          <Field.Control className="field-input" placeholder="Last Name" />
        </Field.Root>

        <Field.Root name="email" className="field-root">
          <Field.Label className="field-label">Email</Field.Label>
          <Field.Control className="field-input" type="email" placeholder="Email" />
        </Field.Root>

        <Field.Root name="phone" className="field-root">
          <Field.Label className="field-label">Phone</Field.Label>
          <Field.Control className="field-input" type="tel" placeholder="Phone" />
        </Field.Root>

        <Field.Root name="origin" className="field-root field-span">
          <Field.Label className="field-label">Where are you from?</Field.Label>
          <Field.Control className="field-input" placeholder="Portland, Oregon" />
        </Field.Root>

        <Field.Root name="vision" className="field-root field-span">
          <Field.Label className="field-label">Wedding Vision</Field.Label>
          <Field.Control
            render={<textarea rows={6} />}
            className="field-input field-textarea"
            placeholder="Wax poetic about your wedding dreams..."
          />
          <Field.Description className="field-description">
            Share the gathering size, season, setting, and any questions you already have.
          </Field.Description>
        </Field.Root>
      </form>
    </section>
  );
}
