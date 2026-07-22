"use client";

import { Dialog } from "@base-ui/react/dialog";
import { NewsletterForm } from "@/components/newsletter-form";

export function NewsletterDialog() {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="dialog-backdrop" />
      <Dialog.Popup className="dialog-popup">
        <div className="dialog-panel">
          <div className="dialog-panel__head">
            <Dialog.Title className="type-heading-card dialog-title">
              Keep in Touch
            </Dialog.Title>
            <Dialog.Description className="type-body dialog-description">
              Sign up for updates from Hotel Reynard.
            </Dialog.Description>
          </div>
          <NewsletterForm showLabel={false} />
          <Dialog.Close className="ui-action ui-action--button ui-action--hover-full dialog-close">
            Close
          </Dialog.Close>
        </div>
      </Dialog.Popup>
    </Dialog.Portal>
  );
}
