"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/actions";

interface MewsDistributorApi {
  open: () => void;
  setCurrencyCode: (currencyCode: string) => void;
  setLanguageCode: (languageCode: string) => void;
}

interface MewsDistributorOptions {
  configurationIds: string[];
}

interface MewsDistributorRuntimeOptions {
  dataBaseUrl?: string;
}

interface WindowWithMews extends Window {
  Mews?: {
    Distributor: (
      options: MewsDistributorOptions,
      callback: (api: MewsDistributorApi) => void,
      runtimeOptions?: MewsDistributorRuntimeOptions,
    ) => void;
  };
}

function getDistributor() {
  return (window as WindowWithMews).Mews?.Distributor;
}

const configurationId = process.env.NEXT_PUBLIC_MEWS_CONFIGURATION_ID ?? "";
const apiUrl =
  process.env.NEXT_PUBLIC_MEWS_API_URL ?? "https://api.mews-demo.com";
const languageCode = process.env.NEXT_PUBLIC_MEWS_LANGUAGE_CODE ?? "en-US";
const currencyCode = process.env.NEXT_PUBLIC_MEWS_CURRENCY_CODE ?? "USD";

export function BookNowButtonClient({
  className,
  label = "Book Now",
}: {
  className?: string;
  label?: string;
}) {
  const [isReady, setIsReady] = useState(false);
  const apiRef = useRef<MewsDistributorApi | null>(null);

  useEffect(() => {
    if (!configurationId) {
      return;
    }

    let timeoutId: number | undefined;
    let attempts = 0;
    let isMounted = true;

    function initialize() {
      const distributor = getDistributor();

      if (!distributor) {
        attempts += 1;

        if (attempts < 80) {
          timeoutId = window.setTimeout(initialize, 100);
        }

        return;
      }

      distributor(
        { configurationIds: [configurationId] },
        (api: MewsDistributorApi) => {
          if (languageCode) {
            api.setLanguageCode(languageCode);
          }

          if (currencyCode) {
            api.setCurrencyCode(currencyCode);
          }

          apiRef.current = api;

          if (isMounted) {
            setIsReady(true);
          }
        },
        apiUrl.includes("mews-demo.com") ? { dataBaseUrl: apiUrl } : undefined,
      );
    }

    initialize();

    return () => {
      isMounted = false;

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const enabled = Boolean(configurationId) && isReady;
  const title = configurationId
    ? isReady
      ? "Open booking widget"
      : "Booking widget is still loading."
    : "Set NEXT_PUBLIC_MEWS_CONFIGURATION_ID to enable booking.";

  return (
    <Button
      className={`book-now-button${className ? ` ${className}` : ""}`}
      disabled={!enabled}
      onClick={() => apiRef.current?.open()}
      title={title}
      type="button"
      variant="plain"
    >
      {label}
    </Button>
  );
}
